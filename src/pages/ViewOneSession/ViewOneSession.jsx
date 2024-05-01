import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"
import * as tableService from "../../services/tableService"

import TeamPlayers from "../../components/TeamPlayers/TeamPlayers"
import SingleMatch from "../../components/SingleMatch/SingleMatch"

const ViewOneSession = (props) => {
  const [currentMatch, setCurrentMatch] = useState()
  const location = useLocation()
  const queryString = location.search
  const params = new URLSearchParams(queryString)
  const tableId = params.get("tableId")
  const [match1, setMatch1] = useState(null)
  const [match2, setMatch2] = useState(null)
  const [match3, setMatch3] = useState(null)
  const [player1, setPlayer1] = useState(null)
  const [player2, setPlayer2] = useState(null)

  useEffect(() => {
    const getSession = async () => {
      const data = await tableService.findOne(tableId)
      setCurrentMatch(data)
    }
    getSession()
  }, [tableId])

  useEffect(() => {}, [match1, match2, match3]);

  const handleCancel = (mth) => {
    if (mth === "1") setMatch1(null)
    if (mth === "2") setMatch2(null)
    if (mth === "3") setMatch3(null)
  }

  const handleChoosePlayer = (player, title) => {
    if (title === "Home") {
      setPlayer1(player)
    }
    if (title === "Away") {
      setPlayer2(player)
    }
  }
  const handleSetPlayers = async () => {
    if (player1 !== null && player2 !== null) {
      if (match1 === null) {
        await setMatch1([player1, player2])
      }
      if (match2 === null && match1 !== null) {
        await setMatch2([player1, player2])
      }
      if (match3 === null && match1 !== null && match2 !== null) {
        await setMatch3([player1, player2])
      }
      await setPlayer1(null)
      await setPlayer2(null)
    }
  }
  console.log(player1, player2);
  return (
    <>
      <div className="row center space-around">
        <div className="bracket">
          <h2>{currentMatch?.homeTeam.teamName}</h2>
          <div className="w325">
            <TeamPlayers
              team={currentMatch?.homeTeam}
              matchPlayer={player1}
              title="Home"
              handleChoosePlayer={handleChoosePlayer}
            />
          </div>
        </div>

        <button onClick={() => handleSetPlayers()}>Set Match</button>
        <div className="bracket">
          <h2>{currentMatch?.awayTeam.teamName}</h2>
          <div className="w325">
            <TeamPlayers
              team={currentMatch?.awayTeam}
              matchPlayer={player2}
              title="Away"
              handleChoosePlayer={handleChoosePlayer}
            />
          </div>
        </div>
      </div>

      {match3 !== null &&
      <>
        Match 3
        <SingleMatch profile={props.profile} handleCancel={handleCancel} match={match3} mth='3'/>
      </>
      }
      {match2 !== null &&
      <>
        Match 2
        <SingleMatch profile={props.profile} handleCancel={handleCancel} match={match2} mth='2'/>
      </>
      }
      {match1 !== null &&
      <>
        Match 1
        <SingleMatch profile={props.profile} handleCancel={handleCancel} match={match1} mth='1'/>
      </>
      }
    </>
  )
}

export default ViewOneSession

// useEffect(() => {}, [match])
// useEffect(() => {}, [seeCheckboxes])

// useEffect(() => {
//   const getGameRace = async () => {
//     try {
//       if (order !== undefined) {
//         const data = await gameService.getGameRace(match[0], match[1])
//         setGamesNeeded(data)
//       }
//     } catch (error) {
//       console.error("Error fetching game race:", error)
//     }
//   }
//   getGameRace()
// }, [match, order])

// useEffect(() => {
//   const addGamesNeeded = async () => {
//     try {
//       if (match && gamesNeeded && gamesNeeded.length >= 2) {
//         setUpdatedPlayerStateWithMatchCount((prevPlayerInfo) => {
//           if (
//             prevPlayerInfo &&
//             prevPlayerInfo.length &&
//             prevPlayerInfo[0].games !== gamesNeeded[0] &&
//             prevPlayerInfo[1].games !== gamesNeeded[1]
//           ) {
//             return [
//               { ...prevPlayerInfo[0], games: gamesNeeded[0] },
//               { ...prevPlayerInfo[1], games: gamesNeeded[1] },
//             ]
//           }
//         })
//       }
//     } catch (error) {
//       console.error("Error updating player state:", error)
//     }
//   }
//   addGamesNeeded()
// }, [match, gamesNeeded])

// const handleWonGame = (player, number) => {
//   setPlayer1((prevPlayer1) => {
//     if (player._id === prevPlayer1.player._id) {
//       return { ...prevPlayer1, gamesWon: number }
//     }
//     return prevPlayer1
//   })

//   setPlayer2((prevPlayer2) => {
//     if (player._id === prevPlayer2.player._id) {
//       return { ...prevPlayer2, gamesWon: number }
//     }
//     return prevPlayer2
//   })
// }

// const findWinningTeamByPlayerId = async (data, playerId) => {
//   let team
//   for (const match of data.matches) {
//     if (match.homeTeam.teamPlayers.includes(playerId)) {
//       team = match.homeTeam
//       await setWinningTeam(team)
//       return team
//     }
//     if (match.visitor.teamPlayers.includes(playerId)) {
//       team = match.visitor
//       await setWinningTeam(team)
//       return team
//     }
//   }
// }

// const handleWinner = async (winner) => {
//   await setGameWinner(winner)
//   await findLoser(winner)
//   findWinningTeamByPlayerId(props.matchId, winner._id)
//   disableCheckboxes()
// }

// const findLosingTeamByPlayerId = async (data, playerId) => {
//   let team
//   for (const match of data.matches) {
//     if (match.homeTeam.teamPlayers.includes(playerId)) {
//       team = match.homeTeam
//       await setLosingTeam(team)
//     }
//     if (match.visitor.teamPlayers.includes(playerId)) {
//       team = match.visitor
//       await setLosingTeam(team)
//     }
//   }
// }

// const findLoser = (winner) => {
//   let loser
//   if (player1.player._id === winner._id) loser = player2
//   else loser = player1
//   setGameLoser(loser.player)
//   findLosingTeamByPlayerId(props.matchId, loser.player._id)
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
//       matchDate: props.matchId.name,
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
//     props.setShowButton(!props.showButton)

//     console.log("Match saved successfully!")
//   } catch (error) {
//     console.error("Error saving match:", error)
//   }
// }

// return (
//   <>
//     <div className={`${styles.greenFelt} ${styles.bracket}`}>
//       {updatedPlayerStateWithMatchCount?.map((player, idx) => (
//         <SingleMatchPlayerLine
//           loserGames={loserGames}
//           winnerGames={winnerGames}
//           isSubmitted={isSubmitted}
//           handleSaveMatch={handleSaveMatch}
//           handleWonGame={handleWonGame}
//           gameWinner={gameWinner}
//           profile={props.profile}
//           seeCheckboxes={seeCheckboxes}
//           handleWinner={handleWinner}
//           player={player}
//           key={idx}
//         />
//       ))}
//       <button onClick={() => props.handleCancel(props.mth)}>
//         Cancel this match
//       </button>
//     </div>
//   </>
// )
// }
