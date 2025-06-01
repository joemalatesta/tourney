import { useState, useEffect } from "react"
import * as gameService from "../../services/gameService"
import * as matchService from "../../services/matchService"
import * as checks from "../../services/checkMatch"
import * as playerStatsService from "../../services/playerStatsService"
import * as tableService from "../../services/tableService"

import * as styles from "./SingleMatch.module.css"

const SingleMatch = ({
  mth,
  tableId,
  currentMatch,
  currentMatchData,
  currentProfile,
  player1,
  player2,
}) => {
  const [matchInfo, setMatchInfo] = useState(null)
  const [gamesNeeded, setGamesNeeded] = useState([])
  const [checkedPlayer1Checkboxes, setCheckedPlayer1Checkboxes] = useState([])
  const [checkedPlayer2Checkboxes, setCheckedPlayer2Checkboxes] = useState([])
  const [isPlayer1Winner, setIsPlayer1Winner] = useState(false)
  const [isPlayer2Winner, setIsPlayer2Winner] = useState(false)
  const [gameEnded, setGameEnded] = useState(currentMatch?.completed || false)
  const [matchEquality, setMatchEquality] = useState(false)
  const [message, setMessage] = useState("")

  // Set matchInfo based on mth
  useEffect(() => {
    if (!tableId) return
    const matchKey = `match${mth}`
    setMatchInfo(tableId[matchKey])
  }, [mth, tableId])

  // Fetch gamesNeeded based on currentMatch players
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

  // Initialize checkboxes if gamesNeeded loaded and no previous wins & game not ended
  useEffect(() => {
    if (
      gamesNeeded?.length >= 2 &&
      matchInfo &&
      (!matchInfo.player1Wins?.length || !matchInfo.player2Wins?.length) &&
      !gameEnded
    ) {
      setCheckedPlayer1Checkboxes(Array(parseInt(gamesNeeded[0])).fill(false))
      setCheckedPlayer2Checkboxes(Array(parseInt(gamesNeeded[1])).fill(false))
    }
  }, [gamesNeeded, matchInfo, gameEnded])

  // Sync checkboxes from currentMatch on change
  useEffect(() => {
    if (!currentMatch) return

    const { player1Wins = [], player2Wins = [] } = currentMatch
    setCheckedPlayer1Checkboxes(player1Wins)
    setCheckedPlayer2Checkboxes(player2Wins)
    checkForWin(player1Wins, player2Wins)
  }, [currentMatch])

  // Update DB if both checkboxes length >= 2
  useEffect(() => {
    if (
      checkedPlayer1Checkboxes.length >= 2 &&
      checkedPlayer2Checkboxes.length >= 2
    ) {
      updateDB(checkedPlayer1Checkboxes, checkedPlayer2Checkboxes)
    }
  }, [checkedPlayer1Checkboxes, checkedPlayer2Checkboxes])

  const checkForWin = (player1Checks, player2Checks) => {
    const p1Won = player1Checks.every(Boolean)
    const p2Won = player2Checks.every(Boolean)
    setIsPlayer1Winner(p1Won)
    setIsPlayer2Winner(p2Won)
  }

  const updateDB = async (player1Checkboxes, player2Checkboxes) => {
    try {
      await matchService.update({
        ...currentMatch,
        player1Wins: player1Checkboxes,
        player2Wins: player2Checkboxes,
      })
    } catch (error) {
      console.error("Error updating match information:", error)
    }
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

  const updateMatchCompletion = async (winPlayer, losePlayer) => {
    if (!tableId) return

    try {
      const updatedMatchData = {
        ...currentMatch,
        winningPlayer: winPlayer,
        losingPlayer: losePlayer,
      }

      const updateTableField = `match${mth}Completed`
      await tableService.update({
        ...tableId,
        [updateTableField]: true,
      })

      // Determine which match data to update on table
      const matchFieldAway = `awayMatch${mth}`
      const matchFieldHome = `homeMatch${mth}`
      const tableMatchData =
        tableId[matchFieldAway] ?? tableId[matchFieldHome] ?? {}

      await matchService.update({
        ...tableMatchData,
        winningPlayer: winPlayer,
        losingPlayer: losePlayer,
      })

      await playerStatsService.adjustPlayerStats(updatedMatchData)
      setGameEnded(true)
    } catch (error) {
      console.error("Error completing match:", error)
    }
  }

  const checkForEquality = async () => {
    try {
      const check = await checks.checkMatch(mth, currentMatchData)
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

  return (
    <div className={styles.bracket}>
      <div className="flex column" style={{ alignItems: "center" }}>
        {/* Player 1 */}
        <div
          className="flex start bracket match-width2 match-height2 green-felt start"
          style={{ width: "90%" }}
        >
          <h1>
            {currentMatch?.player1?.nameFirst} {currentMatch?.player1?.nameLast} (
            {currentMatch?.player1?.rank})
          </h1>
          {!gameEnded && (
            <div className="end" style={{ width: "95%" }}>
              {checkedPlayer1Checkboxes.map((checked, idx) => (
                <div
                  key={`checkbox-player1-${idx}`}
                  onClick={() => toggleCheckbox(1, idx)}
                >
                  <div
                    className="poolballs"
                    style={{
                      backgroundColor: checked ? "black" : "",
                      backgroundImage: checked ? "url(/9ball.png)" : "",
                    }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Conditional buttons */}
        {(isPlayer1Winner || isPlayer2Winner) && !matchEquality && (
          <button onClick={checkForEquality}>Check for match equality</button>
        )}
        {message}
        {isPlayer1Winner && message === true && currentProfile === "HOME" && (
          <button onClick={() => updateMatchCompletion(player1, player2)}>
            Submit
          </button>
        )}
        {isPlayer2Winner && message === true && currentProfile === "HOME" && (
          <button onClick={() => updateMatchCompletion(player2, player1)}>
            Submit
          </button>
        )}

        {/* Player 2 */}
        <div
          className="flex start bracket match-width2 match-height2 green-felt start"
          style={{ width: "90%" }}
        >
          <h1>
            {currentMatch?.player2?.nameFirst} {currentMatch?.player2?.nameLast} (
            {currentMatch?.player2?.rank})
          </h1>
          {!gameEnded && (
            <div className="end" style={{ width: "95%" }}>
              {checkedPlayer2Checkboxes.map((checked, idx) => (
                <div
                  key={`checkbox-player2-${idx}`}
                  onClick={() => toggleCheckbox(2, idx)}
                >
                  <div
                    className="poolballs"
                    style={{
                      backgroundColor: checked ? "black" : "",
                      backgroundImage: checked ? "url(/9ball.png)" : "",
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
