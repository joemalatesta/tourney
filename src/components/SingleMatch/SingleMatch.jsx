import { useState, useEffect } from "react"
import Checkboxes from "../checkboxes/Checkboxes"

import * as gameService from "../../services/gameService"
import * as styles from "./SingleMatch.module.css"
// import * as matchService from '../../services/matchService'

const SingleMatch = (props) => {
  // const [isSubmitted, setIsSubmitted] = useState(false)
  const [match, setMatch] = useState(props.match)
  const [gamesNeeded, setGamesNeeded] = useState()
  const [
    updatedPlayerStateWithMatchCount,
    setUpdatedPlayerStateWithMatchCount,
  ] = useState(match)
  // const [gameWinner, setGameWinner] = useState(null)
  // const [gameLoser, setGameLoser] = useState(null)
  // const [winningTeam, setWinningTeam] = useState(null)
  // const [losingTeam, setLosingTeam] = useState(null)
  const [player1, setPlayer1] = useState(null)
  const [player2, setPlayer2] = useState(null)
  // const [loserGames, setLoserGames] = useState()
  // const [winnerGames, setWinnerGames] = useState()

  useEffect(() => {
    const getPlayerInfo = async () => {
      await setPlayer1(props.currentMatch?.player1)
      await setPlayer2(props.currentMatch?.player2)
    }
    getPlayerInfo()
  }, [props.currentMatch])

  useEffect(() => {
    const getGameRace = async () => {
      try {
        if (match !== undefined) {
          const data = await gameService.getGameRace(
            props.currentMatch.player1,
            props.currentMatch.player2
          )
          setGamesNeeded(data)
        }
      } catch (error) {
        console.error("Error fetching game race:", error)
      }
    }
    getGameRace()
  }, [match])

  console.log(gamesNeeded)

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
    console.log(player, number)
  }

  // const findWinningTeamByPlayerId = async (playerId) => {
  //   console.log(playerId)
  //   // let team
  //   // for (const match of props.currentMatch.awayTeam.teamPlayers) {
  //   //   if (match.includes(playerId)) {
  //   //     team = props.currentMatch.awayTeam
  //   //     await setWinningTeam(team)
  //   //     return team
  //   //   }
  //   // }
  //   // for (const match of props.currentMatch.homeTeam.teamPlayers) {
  //   //   if (match.includes(playerId)) {
  //   //     team = props.currentMatch.homeTeam
  //   //     await setWinningTeam(team)
  //   //     return team
  //   //   }
  //   // }
  // }

  const handleWinner = async (winner) => {
    console.log(winner)
    // await setGameWinner(winner)
    // await findLoser(winner)
    // findWinningTeamByPlayerId(winner._id)
    // disableCheckboxes()
  }

  // const findLosingTeamByPlayerId = async (playerId) => {
  //   console.log(playerId)
  //   // let team
  //   // for (const match of props.currentMatch.awayTeam.teamPlayers) {
  //   //   if (match.includes(playerId)) {
  //   //     team = props.currentMatch.awayTeam
  //   //     await setLosingTeam(team)
  //   //     return team
  //   //   }
  //   // }
  //   // for (const match of props.currentMatch.homeTeam.teamPlayers) {
  //   //   if (match.includes(playerId)) {
  //   //     team = props.currentMatch.homeTeam
  //   //     await setLosingTeam(team)
  //   //     return team
  //   //   }
  //   // }
  // }

  // const findLoser = (winner) => {
  //   console.log(winner)
  //   // let loser
  //   // if (player1.player._id === winner._id) loser = player2
  //   // else loser = player1
  //   // setGameLoser(loser.player)
  //   // findLosingTeamByPlayerId(loser.player._id)
  // }

  // const disableCheckboxes = () => {
  //   setSeeCheckboxes(!seeCheckboxes)
  // }

  // let gameCompleted = gameWinner !== null ? true : false

  // const extractGamesInfo = () => {
  //   const winner = gameWinner !== null ? gameWinner : null
  //   const loser = gameLoser !== null ? gameLoser : null

  //   const winnerGamesWon = winner
  //     ? winner._id === player1.player._id
  //       ? player1.gamesWon
  //       : player2.gamesWon
  //     : null
  //   const loserGamesWon = loser
  //     ? loser._id === player1.player._id
  //       ? player1.gamesWon
  //       : player2.gamesWon
  //     : null
  //   setWinnerGames(winnerGamesWon)
  //   setLoserGames(loserGamesWon)

  //   return { winnerGamesWon, loserGamesWon }
  // }

  // const handleSaveMatch = async () => {
  //   setIsSubmitted(!isSubmitted)
  //   try {
  //     const { winnerGamesWon, loserGamesWon } = extractGamesInfo()
  //     const gameData = {
  //       completed: gameCompleted,
  //       confirmed: false,
  //       winningTeam: winningTeam,
  //       losingTeam: losingTeam,
  //       winningPlayer: gameWinner,
  //       losingPlayer: gameLoser,
  //       winnerGamesPlayed: winnerGamesWon,
  //       loserGamesPlayed: loserGamesWon,
  //     }

  //     if (props.number === 1) {
  //       props.setCompleteMatch((prevCompleteMatch) => ({
  //         ...prevCompleteMatch,
  //         match1: gameData,
  //       }))
  //     }
  //     if (props.number === 2) {
  //       props.setCompleteMatch((prevCompleteMatch) => ({
  //         ...prevCompleteMatch,
  //         match2: gameData,
  //       }))
  //     }
  //     if (props.number === 3) {
  //       props.setCompleteMatch((prevCompleteMatch) => ({
  //         ...prevCompleteMatch,
  //         match3: gameData,
  //       }))
  //     }
  //     if (
  //       props.match1 !== null &&
  //       props.match2 !== null &&
  //       props.match3 !== null
  //     )
  //       console.log("Match saved successfully!")
  //   } catch (error) {
  //     console.error("Error saving match:", error)
  //   }
  // }

  return (
    <>
      <div className={`${styles.greenFelt} ${styles.bracket}`}>
        <div className="flex column" style={{ alignItems: "center" }}>
          <div
            className="flex bracket match-width2 match-height2 green-felt center space-between"
            style={{ width: "90%" }}
          >
            <div className="start">
                <h1>
              {player1?.name} ({player1?.rank})
            </h1>
            </div>
          
            <div className=" end ">
              <Checkboxes
                //  handleSaveMatch={handleSaveMatch}
                handleWonGame={handleWonGame}
                player={updatedPlayerStateWithMatchCount[0]}
                profile={props.profile}
                playerWins={props.currentMatch?.player1Wins}
                match={props.currentMatch}
                playerInfo="player1"
                handleUpdateMatch={props.handleUpdateMatch}
                //  handleWinner={handleWinner}
              />
            </div>
          </div>
          <div
            className="flex bracket match-width2 match-height2 green-felt center space-between"
            style={{ width: "90%" }}
          >
            <div className="start">
                <h1>
              {player2?.name} ({player2?.rank})
            </h1>
            </div>
            <div className=" end ">
              <Checkboxes
                //  handleSaveMatch={handleSaveMatch}
                handleWonGame={handleWonGame}
                player={updatedPlayerStateWithMatchCount[1]}
                profile={props.profile}
                playerWins={props.currentMatch?.player2Wins}
                match={props.currentMatch}
                playerInfo="player2"
                handleUpdateMatch={props.handleUpdateMatch}
                //  handleWinner={handleWinner}
              />
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
