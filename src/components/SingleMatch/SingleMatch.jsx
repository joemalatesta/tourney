import { useState, useEffect } from "react"
import Checkboxes from "../checkboxes/Checkboxes"

import * as gameService from "../../services/gameService"
import * as styles from "./SingleMatch.module.css"

const SingleMatch = (props) => {
  // const [isSubmitted, setIsSubmitted] = useState(false)
  const [match] = useState(props.match)
  const [seeCheckboxes, setSeeCheckboxes] = useState(true)
  const [gamesNeeded, setGamesNeeded] = useState()
  const [
    updatedPlayerStateWithMatchCount,
    setUpdatedPlayerStateWithMatchCount,
  ] = useState(match)
  const [gameWinner, setGameWinner] = useState(null)
  const [gameLoser, setGameLoser] = useState(null)
  const [winningTeam, setWinningTeam] = useState(null)
  const [losingTeam, setLosingTeam] = useState(null)
  const [player1, setPlayer1] = useState(props?.currentMatch?.player1)
  const [player2, setPlayer2] = useState(props?.currentMatch?.player2)
  const [loserGames, setLoserGames] = useState()
  const [winnerGames, setWinnerGames] = useState()

  let order = gameService.getFirstPlayer(match)

  useEffect(() => {
    const getGameRace = async () => {
      try {
        if (order !== undefined) {
          const data = await gameService.getGameRace(match[0], match[1])
          setGamesNeeded(data)
        }
      } catch (error) {
        console.error("Error fetching game race:", error)
      }
    }
    getGameRace()
  }, [match, order])

  useEffect(() => {
    const addGamesNeeded = async () => {
      try {
        if (match && gamesNeeded && gamesNeeded.length >= 2) {
          setUpdatedPlayerStateWithMatchCount((prevPlayerInfo) => {
            if (
              prevPlayerInfo &&
              prevPlayerInfo.length &&
              prevPlayerInfo[0].games !== gamesNeeded[0] &&
              prevPlayerInfo[1].games !== gamesNeeded[1]
            ) {
              return [
                { ...prevPlayerInfo[0], games: gamesNeeded[0] },
                { ...prevPlayerInfo[1], games: gamesNeeded[1] },
              ]
            }
          })
        }
      } catch (error) {
        console.error("Error updating player state:", error)
      }
    }
    addGamesNeeded()
  }, [match, gamesNeeded])

  const handleWonGame = (player, number) => { 
    console.log(player, number);
  }

  const findWinningTeamByPlayerId = async (playerId) => {
    console.log(playerId);
    // let team
    // for (const match of props.currentMatch.awayTeam.teamPlayers) {
    //   if (match.includes(playerId)) {
    //     team = props.currentMatch.awayTeam
    //     await setWinningTeam(team)
    //     return team
    //   }
    // }
    // for (const match of props.currentMatch.homeTeam.teamPlayers) {
    //   if (match.includes(playerId)) {
    //     team = props.currentMatch.homeTeam
    //     await setWinningTeam(team)
    //     return team
    //   }
    // }
  }

  const handleWinner = async (winner) => {
    console.log(winner);
    // await setGameWinner(winner)
    // await findLoser(winner)
    // findWinningTeamByPlayerId(winner._id)
    // disableCheckboxes()
  }

  const findLosingTeamByPlayerId = async (playerId) => {
  console.log(playerId);
    // let team
    // for (const match of props.currentMatch.awayTeam.teamPlayers) {
    //   if (match.includes(playerId)) {
    //     team = props.currentMatch.awayTeam
    //     await setLosingTeam(team)
    //     return team
    //   }
    // }
    // for (const match of props.currentMatch.homeTeam.teamPlayers) {
    //   if (match.includes(playerId)) {
    //     team = props.currentMatch.homeTeam
    //     await setLosingTeam(team)
    //     return team
    //   }
    // }
  }

  const findLoser = (winner) => {
    console.log(winner);
    // let loser
    // if (player1.player._id === winner._id) loser = player2
    // else loser = player1
    // setGameLoser(loser.player)
    // findLosingTeamByPlayerId(loser.player._id)
  }

  // const disableCheckboxes = () => {
  //   setSeeCheckboxes(!seeCheckboxes)
  // }

  let gameCompleted = gameWinner !== null ? true : false

  const extractGamesInfo = () => {
    const winner = gameWinner !== null ? gameWinner : null
    const loser = gameLoser !== null ? gameLoser : null

    const winnerGamesWon = winner
      ? winner._id === player1.player._id
        ? player1.gamesWon
        : player2.gamesWon
      : null
    const loserGamesWon = loser
      ? loser._id === player1.player._id
        ? player1.gamesWon
        : player2.gamesWon
      : null
    setWinnerGames(winnerGamesWon)
    setLoserGames(loserGamesWon)

    return { winnerGamesWon, loserGamesWon }
  }

  const handleSaveMatch = async () => {
    setIsSubmitted(!isSubmitted)
    try {
      const { winnerGamesWon, loserGamesWon } = extractGamesInfo()
      const gameData = {
        completed: gameCompleted,
        confirmed: false,
        winningTeam: winningTeam,
        losingTeam: losingTeam,
        winningPlayer: gameWinner,
        losingPlayer: gameLoser,
        winnerGamesPlayed: winnerGamesWon,
        loserGamesPlayed: loserGamesWon,
      }

      if (props.number === 1) {
        props.setCompleteMatch((prevCompleteMatch) => ({
          ...prevCompleteMatch,
          match1: gameData,
        }))
      }
      if (props.number === 2) {
        props.setCompleteMatch((prevCompleteMatch) => ({
          ...prevCompleteMatch,
          match2: gameData,
        }))
      }
      if (props.number === 3) {
        props.setCompleteMatch((prevCompleteMatch) => ({
          ...prevCompleteMatch,
          match3: gameData,
        }))
      }
      if (
        props.match1 !== null &&
        props.match2 !== null &&
        props.match3 !== null
      )
        console.log("Match saved successfully!")
    } catch (error) {
      console.error("Error saving match:", error)
    }
  }
  console.log(props?.currentMatch?.player1Wins,props?.currentMatch?.player2Wins);

  return (
    <>
      <div className={`${styles.greenFelt} ${styles.bracket}`}>
        <div className="flex column" style={{ alignItems: "center" }}>
          <div
            className="flex start bracket match-width2 match-height2 green-felt"
            style={{ width: "90%" }} //, WebkitTextStroke: '1px white', color:'black'
          >
            <div className="flex" style={{ width: "95%" }}>
              <div className="start flex 1" style={{ width: "95%" }}>
                <div className="flex 1" style={{ width: "95%" }}>
                  <div className="flex" style={{ width: "95%" }}>
                    <h1>
                      {player1?.name} ({player1?.rank})
                    </h1>
                    <Checkboxes 
                          //  handleSaveMatch={handleSaveMatch}
                           handleWonGame={handleWonGame}
                           player={updatedPlayerStateWithMatchCount[0]}
                           profile={props.profile}
                           playerWins={props.currentMatch?.player1Wins}
                          //  handleWinner={handleWinner}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="flex start bracket match-width2 match-height2 green-felt"
            style={{ width: "90%" }} //, WebkitTextStroke: '1px white', color:'black'
          >
            <div className="flex" style={{ width: "95%" }}>
              <div className="start flex 1" style={{ width: "95%" }}>
                <div className="flex 1" style={{ width: "95%" }}>
                  <div className="flex" style={{ width: "95%" }}>
                    <h1>
                      {player2?.name} ({player2?.rank})
                    </h1>
                    <Checkboxes 
                          //  handleSaveMatch={handleSaveMatch}
                           handleWonGame={handleWonGame}
                           player={updatedPlayerStateWithMatchCount[1]}
                           playerWins={props.currentMatch?.player2Wins}
                           profile={props.profile}
                          //  handleWinner={handleWinner}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button onClick={() => props.handleCancel(props.mth)}>
          Cancel this match
        </button>
      </div>
    </>
  )
}

export default SingleMatch
