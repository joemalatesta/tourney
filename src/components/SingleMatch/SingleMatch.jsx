import { useState, useEffect } from "react"
import { confetti } from "../../services/confetti"

import SingleMatchPlayerLine from "./SingleMatchPlayerLine"

import * as gameService from "../../services/gameService"
import * as playedMatchService from "../../services/playedMatchService"

import * as styles from "./SingleMatch.module.css"

const SingleMatch = (props) => {
  console.log('This is the props to send to each match ',props);
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
  const [player1, setPlayer1] = useState({ player: match[0], gamesWon: 0 })
  const [player2, setPlayer2] = useState({ player: match[1], gamesWon: 0 })
  let order = gameService.getFirstPlayer(match)

  useEffect(() => {}, [match])
  useEffect(() => {}, [seeCheckboxes])

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
    setPlayer1((prevPlayer1) => {
      if (player._id === prevPlayer1.player._id) {
        return { ...prevPlayer1, gamesWon: number }
      }
      return prevPlayer1
    })

    setPlayer2((prevPlayer2) => {
      if (player._id === prevPlayer2.player._id) {
        return { ...prevPlayer2, gamesWon: number }
      }
      return prevPlayer2
    })
  }

  const findWinningTeamByPlayerId = async (data, playerId) => {
    let team
    for (const match of data.matches) {
      if (match.homeTeam.teamPlayers.includes(playerId)) {
        team = match.homeTeam
        await setWinningTeam(team)
        return team
      }
      if (match.visitor.teamPlayers.includes(playerId)) {
        team = match.visitor
        await setWinningTeam(team)
        return team
      }
    }
  }

  const handleWinner = async (winner) => {
    await setGameWinner(winner)
    await findLoser(winner)
    findWinningTeamByPlayerId(props.matchId, winner._id)
    disableCheckboxes()
    confetti.start(1000)
  }

  const findLosingTeamByPlayerId = async (data, playerId) => {
    let team
    for (const match of data.matches) {
      if (match.homeTeam.teamPlayers.includes(playerId)) {
        team = match.homeTeam
        await setLosingTeam(team)
      }
      if (match.visitor.teamPlayers.includes(playerId)) {
        team = match.visitor
        await setLosingTeam(team)
      }
    }
  }

  const findLoser = (winner) => {
    let loser
    if (player1.player._id === winner._id) loser = player2
    else loser = player1
    setGameLoser(loser.player)
    findLosingTeamByPlayerId(props.matchId, loser.player._id)
  }

  const disableCheckboxes = () => {
    setSeeCheckboxes(!seeCheckboxes)
  }

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

    return { winnerGamesWon, loserGamesWon }
  }

  const handleSaveMatch = async () => {
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
        matchDate: props.matchId.name,
      }
      await playedMatchService.create({ gameData })

      console.log("Match saved successfully!")
    } catch (error) {
      console.error("Error saving match:", error)
    }
  }

  return (
    <>
      <div className={`${styles.greenFelt} ${styles.bracket}`}>
        {updatedPlayerStateWithMatchCount?.map((player, idx) => (
          <SingleMatchPlayerLine
            handleSaveMatch={handleSaveMatch}
            handleWonGame={handleWonGame}
            gameWinner={gameWinner}
            profile={props.profile}
            seeCheckboxes={seeCheckboxes}
            handleWinner={handleWinner}
            player={player}
            key={idx}
          />
        ))}
      </div>
    </>
  )
}

export default SingleMatch
