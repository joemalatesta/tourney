import { useState, useEffect } from "react"
import * as gameService from "../../services/gameService"
import * as matchService from "../../services/matchService"
import * as checks from "../../services/checkMatch"
import * as playerStatsService from "../../services/playerStatsService"
import * as tableService from "../../services/tableService"
import * as playerService from "../../services/playerService"
import * as styles from "./SingleMatch.module.css"

const SingleMatch = ({ mth, tableId, currentMatch, currentProfile, profile }) => {
  const [matchInfo, setMatchInfo] = useState(null)
  const [gamesNeeded, setGamesNeeded] = useState([])
  const [checkedPlayer1Checkboxes, setCheckedPlayer1Checkboxes] = useState([])
  const [checkedPlayer2Checkboxes, setCheckedPlayer2Checkboxes] = useState([])
  const [isPlayer1Winner, setIsPlayer1Winner] = useState(false)
  const [isPlayer2Winner, setIsPlayer2Winner] = useState(false)
  const [gameEnded, setGameEnded] = useState(currentMatch?.completed || false)
  const [matchEquality, setMatchEquality] = useState(false)
  const [message, setMessage] = useState("")
  const [player1Info, setPlayer1Info] = useState(null)
  const [player2Info, setPlayer2Info] = useState(null)

  // Load match info
  useEffect(() => {
    if (!tableId) return
    const matchKey = `match${mth}`
    setMatchInfo(tableId[matchKey])
  }, [mth, tableId])

  // Fetch player details
  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        if (currentMatch?.player1?._id) {
          const p1 = await playerService.findOne(currentMatch.player1._id)
          setPlayer1Info(p1)
        }
        if (currentMatch?.player2?._id) {
          const p2 = await playerService.findOne(currentMatch.player2._id)
          setPlayer2Info(p2)
        }
      } catch (err) {
        console.error("Error loading player info:", err)
      }
    }
    fetchPlayers()
  }, [currentMatch])

  // Fetch game race (number of wins needed)
  useEffect(() => {
    const fetchGameRace = async () => {
      if (currentMatch?.player1 && currentMatch?.player2) {
        try {
          const data = await gameService.getGameRace(
            currentMatch.player1,
            currentMatch.player2
          )
          setGamesNeeded(data)
        } catch (error) {
          console.error("Error fetching game race:", error)
        }
      }
    }
    fetchGameRace()
  }, [currentMatch])

  // Initialize checkbox arrays
  useEffect(() => {
    if (!gamesNeeded?.length || !matchInfo || gameEnded) return
    const p1Wins =
      currentProfile === "HOME"
        ? matchInfo.player1WinsHome
        : matchInfo.player1WinsAway
    const p2Wins =
      currentProfile === "HOME"
        ? matchInfo.player2WinsHome
        : matchInfo.player2WinsAway

    setCheckedPlayer1Checkboxes(p1Wins?.length ? p1Wins : Array(parseInt(gamesNeeded[0])).fill(false))
    setCheckedPlayer2Checkboxes(p2Wins?.length ? p2Wins : Array(parseInt(gamesNeeded[1])).fill(false))
  }, [gamesNeeded, matchInfo, currentProfile, gameEnded])

  const checkForWin = (p1, p2) => {
    setIsPlayer1Winner(p1.every(Boolean))
    setIsPlayer2Winner(p2.every(Boolean))
  }

  const toggleCheckbox = (player, index) => {
    if (gameEnded) return

    if (player === 1) {
      setCheckedPlayer1Checkboxes((prev) => {
        const updated = [...prev]
        updated[index] = !updated[index]
        checkForWin(updated, checkedPlayer2Checkboxes)
        return updated
      })
    } else {
      setCheckedPlayer2Checkboxes((prev) => {
        const updated = [...prev]
        updated[index] = !updated[index]
        checkForWin(checkedPlayer1Checkboxes, updated)
        return updated
      })
    }
  }

  const checkForEquality = async () => {
    try {
      const check = await checks.checkMatch(currentMatch._id)
      if (check === true) {
        setMessage(true)
        setMatchEquality(true)
      } else {
        setMessage("Check with the other team, Games do not match")
      }
    } catch (error) {
      console.error("Error checking match equality:", error)
    }
  }

  const updateMatchCompletion = async (winPlayer, losePlayer) => {
    try {
      const updatedMatchData = {
        ...currentMatch,
        winningPlayer: winPlayer,
        losingPlayer: losePlayer,
        completed: true,
        submitted: true,
      }

      const updateTableField = `match${mth}Completed`
      await tableService.update({
        ...tableId,
        [updateTableField]: true,
      })

      await matchService.update(updatedMatchData)
      await playerStatsService.adjustPlayerStats(updatedMatchData)
      setGameEnded(true)
    } catch (error) {
      console.error("Error completing match:", error)
    }
  }

  // If player info not yet loaded, show loader
  if (!player1Info || !player2Info) {
    return <div>Loading players...</div>
  }

  return (
    <div className={styles.bracket}>
      <div className="flex column" style={{ alignItems: "center" }}>
        {/* Player 1 */}
        <div className="flex start bracket match-width2 match-height2 green-felt start" style={{ width: "90%" }}>
          <h1>
            {`${player1Info.nameFirst} ${player1Info.nameLast} (${player1Info.rank})`}
          </h1>
          {!gameEnded && profile?.accessLevel >= 20 && (
            <div className="end" style={{ width: "95%" }}>
              {checkedPlayer1Checkboxes.map((checked, idx) => (
                <div key={`checkbox-p1-${idx}`} onClick={() => toggleCheckbox(1, idx)}>
                  <div
                    className="poolballs"
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      border: "1px solid white",
                      backgroundColor: checked ? "black" : "",
                      backgroundImage: checked ? `url(/9Ball.png)` : "",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Equality Check Button */}
        {(isPlayer1Winner || isPlayer2Winner) &&
          !matchEquality &&
          (checkedPlayer1Checkboxes.some(Boolean) ||
            checkedPlayer2Checkboxes.some(Boolean)) && (
            <button onClick={checkForEquality}>Check for match equality</button>
          )}
        {message && typeof message === "string" && <p>{message}</p>}

        {/* Submit Buttons */}
        {isPlayer1Winner && message === true && currentProfile === "HOME" && (
          <button onClick={() => updateMatchCompletion(player1Info._id, player2Info._id)}>
            Submit Player 1 Win
          </button>
        )}
        {isPlayer2Winner && message === true && currentProfile === "HOME" && (
          <button onClick={() => updateMatchCompletion(player2Info._id, player1Info._id)}>
            Submit Player 2 Win
          </button>
        )}

        {/* Player 2 */}
        <div className="flex start bracket match-width2 match-height2 green-felt start" style={{ width: "90%" }}>
          <h1>
            {`${player2Info.nameFirst} ${player2Info.nameLast} (${player2Info.rank})`}
          </h1>
          {!gameEnded && profile?.accessLevel >= 20 && (
            <div className="end" style={{ width: "95%" }}>
              {checkedPlayer2Checkboxes.map((checked, idx) => (
                <div key={`checkbox-p2-${idx}`} onClick={() => toggleCheckbox(2, idx)}>
                  <div
                    className="poolballs"
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      border: "1px solid white",
                      backgroundColor: checked ? "black" : "",
                      backgroundImage: checked ? `url(/9Ball.png)` : "",
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
