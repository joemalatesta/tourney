import { useState, useEffect } from "react"
import * as gameService from "../../services/gameService"
import * as matchService from "../../services/matchService"
import * as checks from "../../services/checkMatch"
import * as playerStatsService from "../../services/playerStatsService"
import * as teamStatsService from "../../services/teamStatsService"

import * as styles from "./SingleMatch.module.css"

const SingleMatch = (props) => {
  const [gamesNeeded, setGamesNeeded] = useState([])
  const [checkedPlayer1Checkboxes, setCheckedPlayer1Checkboxes] = useState([])
  const [checkedPlayer2Checkboxes, setCheckedPlayer2Checkboxes] = useState([])
  const [isPlayer1Winner, setIsPlayer1Winner] = useState(false)
  const [isPlayer2Winner, setIsPlayer2Winner] = useState(false)
  const [gameEnded, setGameEnded] = useState(props.currentMatch?.completed)
  const [winningPlayer, setWinningPlayer] = useState(
    props?.currentMatch?.winningPlayer
  )
  const [updatedMatchData] = useState()
  const [matchEquality, setMatchEquality] = useState(false)
  const [message, setMessage] = useState("")
  console.log(winningPlayer);
  
  console.log(props)
  console.log(updatedMatchData)

  useEffect(() => {
    if (
      checkedPlayer1Checkboxes.length >= 2 &&
      checkedPlayer2Checkboxes.length >= 2
    ) {
      updateDB(checkedPlayer1Checkboxes, checkedPlayer2Checkboxes)
    }
  }, [checkedPlayer1Checkboxes, checkedPlayer2Checkboxes])

  useEffect(() => {
    if (
      props.currentMatch?.player1Wins.length > 0 &&
      props.currentMatch?.player2Wins.length > 0
    ) {
      const initialPlayer1Wins = props.currentMatch.player1Wins
      const initialPlayer2Wins = props.currentMatch.player2Wins
      setCheckedPlayer1Checkboxes(initialPlayer1Wins)
      setCheckedPlayer2Checkboxes(initialPlayer2Wins)
      checkForWin(initialPlayer1Wins, initialPlayer2Wins)
    }
  }, [props.currentMatch])

  useEffect(() => {
    const fetchGameRace = async () => {
      if (props.currentMatch?.player1 && props.currentMatch?.player2) {
        try {
          const data = await gameService.getGameRace(
            props.currentMatch.player1,
            props.currentMatch.player2
          )
          setGamesNeeded(data)
        } catch (error) {
          console.error("Error fetching game race:", error)
        }
      }
    }
    fetchGameRace()
  }, [props.currentMatch])

  useEffect(() => {
    if (
      gamesNeeded?.length >= 2 &&
      props.currentMatch.player1Wins.length < 1 &&
      props.currentMatch.player2Wins.length < 1 &&
      !gameEnded
    ) {
      setCheckedPlayer1Checkboxes(Array(parseInt(gamesNeeded[0])).fill(false))
      setCheckedPlayer2Checkboxes(Array(parseInt(gamesNeeded[1])).fill(false))
    }
  }, [gamesNeeded])

  const checkForWin = (checkedPlayer1, checkedPlayer2) => {
    const P1Wins = checkedPlayer1.every((el) => el)
    const P2Wins = checkedPlayer2.every((el) => el)

    setIsPlayer1Winner(P1Wins)
    setIsPlayer2Winner(P2Wins)
  }

  const updateDB = async (player1Checkboxes, player2Checkboxes) => {
    const data = {
      ...props.currentMatch,
      player1Wins: player1Checkboxes,
      player2Wins: player2Checkboxes,
    }
    try {
      await matchService.update(data)
    } catch (error) {
      console.error("Error updating match information:", error)
    }
  }

  const handleCheckboxChangePlayer1 = async (index) => {
    setCheckedPlayer1Checkboxes((prev) => {
      const updated = [...prev]
      updated[index] = !updated[index]
      checkForWin(updated, checkedPlayer2Checkboxes)
      return updated
    })
  }

  const handleCheckboxChangePlayer2 = async (index) => {
    setCheckedPlayer2Checkboxes((prev) => {
      const updated = [...prev]
      updated[index] = !updated[index]
      checkForWin(checkedPlayer1Checkboxes, updated)
      return updated
    })
  }

  const handleWinner = async (player) => {
    let data
    if (player === 1) {
      setWinningPlayer(props.currentMatch.player1)
      data = await {
        ...props.currentMatch,
        winningPlayer: props.currentMatch.player1,
        losingPlayer: props.currentMatch.player2,
        completed: true,
      }
      await playerStatsService.adjustPlayerStats(data)
      await teamStatsService.adjustTeamStats(updatedMatchData)
    }
    if (player === 2) {
      setWinningPlayer(props.currentMatch.player2)
      data = {
        ...props.currentMatch,
        winningPlayer: props.currentMatch.player2,
        losingPlayer: props.currentMatch.player1,
        completed: true,
        player1Wins: [
          checkedPlayer1Checkboxes.filter((el) => el === true).length,
        ],
        player2Wins: [
          checkedPlayer2Checkboxes.filter((el) => el === true).length,
        ],
      }
      await playerStatsService.adjustPlayerStats(data)
      await teamStatsService.adjustTeamStats(
        data,
        props.homeTeam,
        props.awayTeam
      )
    }
    await matchService.update(data)
    setGameEnded(true)
  }


  const checkForEquality = async () => {
    let check = await checks.checkMatch(props.mth, props.currentMatchData)
    console.log(check);
    if(check == true ) {
      setMessage(true)
      setMatchEquality(true)
    }
    if(check == false) setMessage("Check the other teams, Games do not match")
    
    
  }

  return (
    <div className={styles.bracket}>
      <div className="flex column" style={{ alignItems: "center" }}>
        <div
          className="flex start bracket match-width2 match-height2 green-felt start"
          style={{ width: "90%" }}
        >
          <h1>
            {props.currentMatch?.player1?.name} (
            {props.currentMatch?.player1?.rank})
          </h1>
          {!gameEnded && (
            <div className="end" style={{ width: "95%" }}>
              {checkedPlayer1Checkboxes.map(
                (isChecked, index) =>
                  !gameEnded && (
                    <div
                      key={`checkbox-player1-${index}`}
                      onClick={() => handleCheckboxChangePlayer1(index)}
                    >
                      <div
                        className="poolballs"
                        style={{
                          backgroundColor: isChecked ? "black" : "",
                          backgroundImage: isChecked ? "url(/9ball.png)" : "",
                        }}
                      />
                    </div>
                  )
              )}

         
            </div>
          )}
          {gameEnded && (
            <h2 className="end" style={{ width: "95%" }}>
              Games Won:{" "}
              {checkedPlayer1Checkboxes.filter((el) => el === true).length ||
                props.currentMatch.player1Wins}
            </h2>
          )}
        </div>
  
        {(isPlayer1Winner || isPlayer2Winner ) && matchEquality === !true && (
            <button onClick={() => checkForEquality(props.mth)}>
              check for match equality
            </button>
          )}
          
          {isPlayer1Winner && message == true && props.currentProfile == "HOME" &&
            <button onClick={()=>handleWinner(props.player1)}>Submit</button>
          }
          {isPlayer2Winner && message == true && props.currentProfile == "HOME" &&
            <button onClick={()=>handleWinner(props.player2)}>Submit</button>
          }
        <div
          className="flex start bracket match-width2 match-height2 green-felt start"
          style={{ width: "90%" }}
        >
          <h1>
            {props.currentMatch?.player2?.name} (
            {props.currentMatch?.player2?.rank})
          </h1>
          <div className="end" style={{ width: "95%" }}>
            {checkedPlayer2Checkboxes.map(
              (isChecked, index) =>
                !gameEnded && (
                  <div
                    key={`checkbox-player2-${index}`}
                    onClick={() => handleCheckboxChangePlayer2(index)}
                  >
                    <div
                      className="poolballs"
                      style={{
                        backgroundColor: isChecked ? "black" : "",
                        backgroundImage: isChecked ? "url(/9ball.png)" : "",
                      }}
                    />
                  </div>
                )
            )}

            {gameEnded && (
              <h2 className="end" style={{ width: "95%" }}>
                Games Won:{" "}
                {checkedPlayer2Checkboxes.filter((el) => el === true).length ||
                  props.currentMatch.player2Wins}
              </h2>
            )}
          </div>
        </div>
      </div>
      {/* {props.profile.accessLevel > 40 && (
        <>
          <button onClick={() => props.handleCancel(props.mth)}>
            Cancel this match
          </button>

        </>
      )} */}
    </div>
  )
}

export default SingleMatch
