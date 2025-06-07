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
  currentMatchData,
  currentProfile,
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
  const [player1Info, setPlayer1Info] = useState(null)
  const [player2Info, setPlayer2Info] = useState(null)

  useEffect(() => {
    if (!tableId) return
    const matchKey = `match${mth}`
    setMatchInfo(tableId[matchKey])
  }, [mth, tableId])

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        if (currentMatch?.player1) {
          const p1 = await playerService.findOne(currentMatch.player1._id)
          setPlayer1Info(p1)
        }
        if (currentMatch?.player2) {
          const p2 = await playerService.findOne(currentMatch.player2._id)
          setPlayer2Info(p2)
        }
      } catch (err) {
        console.error("Error loading player info:", err)
      }
    }
    fetchPlayers()
  }, [currentMatch])

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

  useEffect(() => {
    if (!currentMatch) return

    const p1Wins =
      currentProfile === "HOME"
        ? currentMatch.player1WinsHome
        : currentMatch.player1WinsAway

    const p2Wins =
      currentProfile === "HOME"
        ? currentMatch.player2WinsHome
        : currentMatch.player2WinsAway

    setCheckedPlayer1Checkboxes(p1Wins || [])
    setCheckedPlayer2Checkboxes(p2Wins || [])

    checkForWin(p1Wins || [], p2Wins || [])
  }, [currentMatch, currentProfile])

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
      const updatedMatch = {
        ...currentMatch,
      }

      if (currentProfile === "HOME") {
        updatedMatch.player1WinsHome = player1Checkboxes
        updatedMatch.player2WinsHome = player2Checkboxes
      } else if (currentProfile === "AWAY") {
        updatedMatch.player1WinsAway = player1Checkboxes
        updatedMatch.player2WinsAway = player2Checkboxes
      }

      await matchService.update(updatedMatch)
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
        <div
          className="flex start bracket match-width2 match-height2 green-felt start"
          style={{ width: "90%" }}
        >
          <h1>
            {player1Info
              ? `${player1Info.nameFirst} ${player1Info.nameLast} (${player1Info.rank})`
              : "Loading Player 1..."}
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

        {(isPlayer1Winner || isPlayer2Winner) && !matchEquality && (
          <button onClick={checkForEquality}>Check for match equality</button>
        )}
        {message && typeof message === "string" && <p>{message}</p>}
        {isPlayer1Winner && message === true && currentProfile === "HOME" && (
          <button onClick={() => updateMatchCompletion(player1Info._id, player2Info._id)}>
            Submit
          </button>
        )}
        {isPlayer2Winner && message === true && currentProfile === "HOME" && (
          <button onClick={() => updateMatchCompletion(player2Info._id, player1Info._id)}>
            Submit
          </button>
        )}

        <div
          className="flex start bracket match-width2 match-height2 green-felt start"
          style={{ width: "90%" }}
        >
          <h1>
            {player2Info
              ? `${player2Info.nameFirst} ${player2Info.nameLast} (${player2Info.rank})`
              : "Loading Player 2..."}
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
