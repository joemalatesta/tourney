import { useState, useEffect } from "react"
import { confetti } from "../../services/confetti"

import SingleMatchPlayerLine from "./SingleMatchPlayerLine"

import * as gameService from "../../services/gameService"
import * as scheduleService from "../../services/scheduleService"

import * as styles from "./SingleMatch.module.css"

const SingleMatch = (props) => {
  const [match] = useState(props.match)
  const [seeCheckboxes, setSeeCheckboxes] = useState(true)
  const [gamesNeeded, setGamesNeeded] = useState()
  const [
    updatedPlayerStateWithMatchCount,
    setUpdatedPlayerStateWithMatchCount,
  ] = useState(match)
  const [gameWinner, setGameWinner] = useState(null)
  const [player1, setPlayer1] = useState({
    player: match[0],
    gamesWon: 0,
  })
  const [player2, setPlayer2] = useState({
    player: match[1],
    gamesWon: 0,
  })

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

  useEffect(() => {}, [match])
  useEffect(() => {}, [seeCheckboxes])

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
  }, [match])

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

  let home
  let visitor

  const handleWinner = async (winner) => {
    await findTeam(player1)
    await findTeam(player2)
    await setGameWinner(winner)
    disableCheckboxes()
    confetti.start(5000)
  }

  const disableCheckboxes = () => {
    setSeeCheckboxes(!seeCheckboxes)
  }

  const findTeamByPlayerId = async (data, playerId) => {
    console.log(data)
    for (const match of data.matches) {
      if (match.homeTeam.teamPlayers.includes(playerId)) {
        home = match.homeTeam.teamName
        console.log(home, "HOME")
        return home
      }
      if (match.visitor.teamPlayers.includes(playerId)) {
        visitor = match.visitor.teamName
        console.log(visitor, "VISITOR")
        return visitor
      }
    }
  }

  const findTeam = async (player) => {
    const team = await findTeamByPlayerId(props.matchId, player.player._id)
    return team
  }

  // const handleSaveMatch = async () => {
  //   const homeTeam = await findTeam(player1)
  //   const visitorTeam = await findTeam(player2)
  //   const match = {
  //     homeTeam: homeTeam,
  //     visitors: visitorTeam,
  //     player1: player1,
  //     player2: player2,
  //     gamesPlayed: player1.gamesWon + player2.gamesWon,
  //     completed: gameWinner !== null ? "Yes" : "NO",
  //     winningPlayer: gameWinner,
  //     date: props.matchId.name,
  //   }
  //   await scheduleService.update({...props.matchId, matchesforApproval: [ match ] })
  //   console.log(props.matchId)
  // }

  const handleSaveMatch = async () => {
    try {
      const homeTeam = await findTeam(player1);
      const visitorTeam = await findTeam(player2);
  
      const newMatch = {
        homeTeam: homeTeam,
        visitors: visitorTeam,
        player1: player1,
        player2: player2,
        gamesPlayed: player1.gamesWon + player2.gamesWon,
        completed: gameWinner !== null ? "Yes" : "NO",
        winningPlayer: gameWinner,
        date: props.matchId.name,
      };
  
      // Retrieve the existing matchesforApproval array
      const existingMatches = props.matchId.matchesforApproval || [];
  
      // Create a new array with the existing matches and the new match
      const updatedMatches = [...existingMatches, newMatch];
  
      // Update the matchesforApproval array in the scheduleService
      await scheduleService.update({
        ...props.matchId,
        matchesforApproval: updatedMatches,
      });
  
      console.log("Match saved successfully!");
    } catch (error) {
      console.error("Error saving match:", error);
    }
  };

  return (
    <>
      <div className={`${styles.greenFelt} ${styles.bracket}`}>
        {updatedPlayerStateWithMatchCount?.map((player, idx) => (
          <SingleMatchPlayerLine
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
      <button onClick={handleSaveMatch}>Validate Match</button>
    </>
  )
}

export default SingleMatch
