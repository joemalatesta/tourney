
import { useState, useEffect } from "react"
import * as gameService from "../../services/gameService"
import * as matchService from "../../services/matchService"
import * as checks from "../../services/checkMatch"
import * as playerStatsService from "../../services/playerStatsService"
import * as tableService from "../../services/tableService"
import * as playerService from "../../services/playerService"
import * as styles from "./SingleMatch.module.css"

const SingleMatch = ({
  mth,
  tableId,
  currentMatch,
  currentProfile,
  profile,
  handleUpdateMatch,
}) => {
  const [matchInfo, setMatchInfo] = useState(currentMatch || null)
  const [gamesNeeded, setGamesNeeded] = useState([])
  const [checkedPlayer1Checkboxes, setCheckedPlayer1Checkboxes] = useState([])
  const [checkedPlayer2Checkboxes, setCheckedPlayer2Checkboxes] = useState([])
  const [isPlayer1Winner, setIsPlayer1Winner] = useState(false)
  const [isPlayer2Winner, setIsPlayer2Winner] = useState(false)
  const [gameEnded, setGameEnded] = useState(
    currentMatch?.completed || false
  )
  const [matchEquality, setMatchEquality] = useState(false)
  const [message, setMessage] = useState("")
  const [player1Info, setPlayer1Info] = useState(null)
  const [player2Info, setPlayer2Info] = useState(null)
  const [savingResults, setSavingResults] = useState(false)

  // Keep local match data synchronized with the table.
  useEffect(() => {
    setMatchInfo(currentMatch || null)
    setGameEnded(currentMatch?.completed || false)
    setMatchEquality(false)
    setMessage("")
  }, [currentMatch?._id, currentMatch?.completed])

  // Load the player records.
  useEffect(() => {
    let cancelled = false

    const fetchPlayers = async () => {
      if (!currentMatch) return

      try {
        const p1Id =
          currentMatch.player1?._id ?? currentMatch.player1
        const p2Id =
          currentMatch.player2?._id ?? currentMatch.player2

        if (!p1Id || !p2Id) return

        const [p1, p2] = await Promise.all([
          playerService.findOne(p1Id),
          playerService.findOne(p2Id),
        ])

        if (!cancelled) {
          setPlayer1Info(p1)
          setPlayer2Info(p2)
        }
      } catch (error) {
        console.error("Error loading player info:", error)
      }
    }

    setPlayer1Info(null)
    setPlayer2Info(null)
    fetchPlayers()

    return () => {
      cancelled = true
    }
  }, [currentMatch?._id])

  // Fetch the number of games needed to win.
  useEffect(() => {
    let cancelled = false

    const fetchGameRace = async () => {
      if (!currentMatch?.player1 || !currentMatch?.player2) return

      try {
        const data = await gameService.getGameRace(
          currentMatch.player1,
          currentMatch.player2
        )

        if (!cancelled) {
          setGamesNeeded(data)
        }
      } catch (error) {
        console.error("Error fetching game race:", error)
      }
    }

    fetchGameRace()

    return () => {
      cancelled = true
    }
  }, [currentMatch?._id])

  // Load this team's saved results.
  useEffect(() => {
    if (!matchInfo || !gamesNeeded?.length) return

    const isHome = currentProfile === "HOME"
    const isAway = currentProfile === "AWAY"

    if (!isHome && !isAway) return

    const p1Saved = isHome
      ? matchInfo.player1WinsHome
      : matchInfo.player1WinsAway

    const p2Saved = isHome
      ? matchInfo.player2WinsHome
      : matchInfo.player2WinsAway

    const p1 = Array.isArray(p1Saved) && p1Saved.length
      ? p1Saved
      : Array(Number(gamesNeeded[0])).fill(false)

    const p2 = Array.isArray(p2Saved) && p2Saved.length
      ? p2Saved
      : Array(Number(gamesNeeded[1])).fill(false)

    setCheckedPlayer1Checkboxes(p1)
    setCheckedPlayer2Checkboxes(p2)

    setIsPlayer1Winner(p1.length > 0 && p1.every(Boolean))
    setIsPlayer2Winner(p2.length > 0 && p2.every(Boolean))
  }, [matchInfo, gamesNeeded, currentProfile])

  // Save both result arrays for the team making the change.

const saveTeamResults = async (p1Results, p2Results) => {
  if (!matchInfo?._id) {
    throw new Error("No saved match was found.")
  }

  let resultFields

  if (currentProfile === "HOME") {
    resultFields = {
      player1WinsHome: p1Results,
      player2WinsHome: p2Results,
    }
  } else if (currentProfile === "AWAY") {
    resultFields = {
      player1WinsAway: p1Results,
      player2WinsAway: p2Results,
    }
  } else {
    throw new Error("You must belong to a team to enter results.")
  }

  // Send ONLY this team's result arrays.
  // Do not spread matchInfo here, because it may contain stale arrays.
  const savedMatch = await matchService.update({
    _id: matchInfo._id,
    ...resultFields,
  })

  if (!savedMatch?._id) {
    throw new Error(
      savedMatch?.error ||
        savedMatch?.err ||
        "Could not save the match results."
    )
  }

  setMatchInfo(savedMatch)
  return savedMatch
}


  const toggleCheckbox = async (playerNumber, index) => {
    if (
      gameEnded ||
      savingResults ||
      (currentProfile !== "HOME" && currentProfile !== "AWAY")
    ) {
      return
    }

    const p1 = [...checkedPlayer1Checkboxes]
    const p2 = [...checkedPlayer2Checkboxes]

    if (playerNumber === 1) {
      p1[index] = !p1[index]
    } else {
      p2[index] = !p2[index]
    }

    setCheckedPlayer1Checkboxes(p1)
    setCheckedPlayer2Checkboxes(p2)
    setIsPlayer1Winner(p1.length > 0 && p1.every(Boolean))
    setIsPlayer2Winner(p2.length > 0 && p2.every(Boolean))
    setMessage("")
    setMatchEquality(false)
    setSavingResults(true)

    try {
      await saveTeamResults(p1, p2)
    } catch (error) {
      console.error("Error saving team results:", error)
      setMessage(error.message || "Could not save results.")
    } finally {
      setSavingResults(false)
    }
  }

  const checkForEquality = async () => {
    try {
      const equal = await checks.checkMatch(matchInfo?._id)

      if (equal) {
        setMessage(true)
        setMatchEquality(true)
      } else {
        setMessage(
          "The results do not match yet. Check with the other team."
        )
      }
    } catch (error) {
      console.error("Error checking match equality:", error)
      setMessage("Could not check the results.")
    }
  }

  const updateMatchCompletion = async (winPlayer, losePlayer) => {
    if (!matchInfo?._id || !tableId?._id) return

    try {
      const updatedMatchData = {
        ...matchInfo,
        winningPlayer: winPlayer,
        losingPlayer: losePlayer,
        completed: true,
        submitted: true,
      }

      const savedMatch = await matchService.update(updatedMatchData)

      if (!savedMatch?._id) {
        throw new Error("Could not save match completion.")
      }

      await playerStatsService.adjustPlayerStats(savedMatch)

      const completionField = `match${mth}Completed`

      await tableService.update({
        ...tableId,
        [completionField]: true,
      })

      setMatchInfo(savedMatch)
      setGameEnded(true)

      if (handleUpdateMatch) {
        await handleUpdateMatch()
      }
    } catch (error) {
      console.error("Error completing match:", error)
      setMessage(error.message || "Could not complete the match.")
    }
  }

  if (!matchInfo) {
    return <div>Loading match...</div>
  }

  if (!player1Info || !player2Info) {
    return <div>Loading players...</div>
  }

  const canEnterResults =
    !gameEnded &&
    !savingResults &&
    (currentProfile === "HOME" || currentProfile === "AWAY") &&
    Number(profile?.accessLevel) >= 20

  return (
    <div className={styles.bracket}>
      <div className="flex column" style={{ alignItems: "center" }}>
        {/* Player 1 */}
        <div
          className="flex start bracket match-width2 match-height2 green-felt start"
          style={{ width: "90%" }}
        >
          <h1>
            {player1Info.nameFirst} {player1Info.nameLast} (
            {player1Info.rank})
          </h1>

          {canEnterResults && (
            <div className="end" style={{ width: "95%" }}>
              {checkedPlayer1Checkboxes.map((checked, idx) => (
                <div
                  key={`checkbox-p1-${idx}`}
                  onClick={() => toggleCheckbox(1, idx)}
                >
                  <div
                    className="poolballs"
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      border: "1px solid white",
                      backgroundColor: checked ? "black" : "",
                      backgroundImage: checked ? "url(/9Ball.png)" : "",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {(isPlayer1Winner || isPlayer2Winner) &&
          !matchEquality &&
          (checkedPlayer1Checkboxes.some(Boolean) ||
            checkedPlayer2Checkboxes.some(Boolean)) && (
            <button
              onClick={checkForEquality}
              disabled={savingResults}
            >
              Check for match equality
            </button>
          )}

        {message && typeof message === "string" && <p>{message}</p>}

        {isPlayer1Winner &&
          message === true &&
          currentProfile === "HOME" && (
            <button
              onClick={() =>
                updateMatchCompletion(player1Info._id, player2Info._id)
              }
            >
              Submit Player 1 Win
            </button>
          )}

        {isPlayer2Winner &&
          message === true &&
          currentProfile === "HOME" && (
            <button
              onClick={() =>
                updateMatchCompletion(player2Info._id, player1Info._id)
              }
            >
              Submit Player 2 Win
            </button>
          )}

        {/* Player 2 */}
        <div
          className="flex start bracket match-width2 match-height2 green-felt start"
          style={{ width: "90%" }}
        >
          <h1>
            {player2Info.nameFirst} {player2Info.nameLast} (
            {player2Info.rank})
          </h1>

          {canEnterResults && (
            <div className="end" style={{ width: "95%" }}>
              {checkedPlayer2Checkboxes.map((checked, idx) => (
                <div
                  key={`checkbox-p2-${idx}`}
                  onClick={() => toggleCheckbox(2, idx)}
                >
                  <div
                    className="poolballs"
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      border: "1px solid white",
                      backgroundColor: checked ? "black" : "",
                      backgroundImage: checked ? "url(/9Ball.png)" : "",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default SingleMatch
