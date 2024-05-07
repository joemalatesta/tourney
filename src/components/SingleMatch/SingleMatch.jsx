import { useState, useEffect } from "react";
import * as gameService from "../../services/gameService";
import * as matchService from "../../services/matchService";
import * as styles from "./SingleMatch.module.css";

const SingleMatch = (props) => {
  const [match, setMatch] = useState(props.match);
  const [gamesNeeded, setGamesNeeded] = useState([]);
  const [player1, setPlayer1] = useState(null);
  const [player2, setPlayer2] = useState(null);
  const [player1Checkboxes, setPlayer1Checkboxes] = useState([]);
  const [player2Checkboxes, setPlayer2Checkboxes] = useState([]);
  const [checkedPlayer1Checkboxes, setCheckedPlayer1Checkboxes] = useState([]);
  const [checkedPlayer2Checkboxes, setCheckedPlayer2Checkboxes] = useState([]);
  const [isDisabled, setIsDisabled] = useState(true);

  // Fetch game race and update games needed
  useEffect(() => {
    const getGameRace = async () => {
      try {
        if (
          props.currentMatch?.player1 &&
          props.currentMatch?.player2
        ) {
          const data = await gameService.getGameRace(
            props.currentMatch.player1,
            props.currentMatch.player2
          );
          setGamesNeeded(data);
        }
      } catch (error) {
        console.error("Error fetching game race:", error);
      }
    };

    getGameRace();
  }, [props.currentMatch]);

  // Initialize checkbox states based on games needed
  useEffect(() => {
    if (gamesNeeded.length >= 2) {
      setCheckedPlayer1Checkboxes(Array(parseInt(gamesNeeded[0])).fill(false));
      setCheckedPlayer2Checkboxes(Array(parseInt(gamesNeeded[1])).fill(false));
    }
  }, [gamesNeeded]);

  // Update checkboxes based on changes in state
  useEffect(() => {
    const createCheckboxes = (checkedCheckboxes, handleChange) => {
      return checkedCheckboxes.map((isChecked, index) => (
        <div key={`checkbox-${index}`} onClick={() => handleChange(index)}>
          <div
            className="poolballs"
            style={{
              backgroundColor: isChecked ? "black" : "",
              backgroundImage: isChecked ? "url(/9ball.png)" : "",
            }}
          />
        </div>
      ));
    };

    setPlayer1Checkboxes(createCheckboxes(checkedPlayer1Checkboxes, handleCheckboxChangePlayer1));
    setPlayer2Checkboxes(createCheckboxes(checkedPlayer2Checkboxes, handleCheckboxChangePlayer2));
  }, [checkedPlayer1Checkboxes, checkedPlayer2Checkboxes]);

  // Handle checkbox changes
  const handleCheckboxChangePlayer1 = (index) => {
    setCheckedPlayer1Checkboxes((prev) => {
      const updated = [...prev];
      updated[index] = !updated[index];
      return updated;
    });

    checkForWin();
    // updateDB();
  };

  const handleCheckboxChangePlayer2 = (index) => {
    setCheckedPlayer2Checkboxes((prev) => {
      const updated = [...prev];
      updated[index] = !updated[index];
      return updated;
    });

    checkForWin();
    // updateDB();
  };

  const checkForWin = () => {
    const allCheckedPlayer1 = checkedPlayer1Checkboxes.every((isChecked) => isChecked);
    const allCheckedPlayer2 = checkedPlayer2Checkboxes.every((isChecked) => isChecked);
    setIsDisabled(!(allCheckedPlayer1 || allCheckedPlayer2)); // Winner if all checkboxes checked
  };

  const updateDB = () => {
    matchService.update({
      ...match,
      player1Wins: checkedPlayer1Checkboxes,
      player2Wins: checkedPlayer2Checkboxes,
    });
  };

  return (
    <div className={styles.bracket}>
      <div className="flex column" style={{ alignItems: "center" }}>
        <div
          className="flex start bracket match-width2 match-height2 green-felt start"
          style={{ width: "90%" }}
        >
          <h1>{props.currentMatch?.player1?.name} ({props.currentMatch?.player1?.rank})</h1>
          <div className="end" style={{ width: "95%" }}>
            {player1Checkboxes}
            {props.profile.accessLevel >= 40 && !isDisabled && (
              <button onClick={() => props.handleWinner(player1)}>Winner</button>
            )}
          </div>
        </div>
        
        <div
          className="flex start bracket match-width2 match-height2 green-felt space-around start"
          style={{ width: "90%" }}
        >
          <h1>{props.currentMatch?.player2?.name} ({props.currentMatch?.player2?.rank})</h1>
          <div className="end" style={{ width: "95%" }}>
            {player2Checkboxes}
            {props.profile.accessLevel >= 40 && !isDisabled && (
              <button onClick={() => props.handleWinner(player2)}>Winner</button>
            )}
          </div>
        </div>
      </div>
      
      <button onClick={() => props.handleCancel(props.mth)}>Cancel this match</button>
    </div>
  );
};

export default SingleMatch;












// import { useState, useEffect } from "react"

// import * as gameService from "../../services/gameService"
// import * as matchService from '../../services/matchService'

// import * as styles from "./SingleMatch.module.css"

// const SingleMatch = (props) => {
//   // const [isSubmitted, setIsSubmitted] = useState(false)
//   const [match] = useState(props.match)
//   const [gamesNeeded, setGamesNeeded] = useState()
//   const [
//     updatedPlayerStateWithMatchCount,
//     setUpdatedPlayerStateWithMatchCount,
//   ] = useState(match)
//   const [player1, setPlayer1] = useState(null)
//   const [player2, setPlayer2] = useState(null)
//   // const [loserGames, setLoserGames] = useState()
//   // const [winnerGames, setWinnerGames] = useState()
//   const [player1Checkboxes, setPlayer1Checkboxes] = useState([])
//   const [player2Checkboxes, setPlayer2Checkboxes] = useState([])
//   const [checkedPlayer1Checkboxes, setCheckedPlayer1Checkboxes] = useState([])
//   const [checkedPlayer2Checkboxes, setCheckedPlayer2Checkboxes] = useState([])
//   const [isDisabled, setIsDisabled] = useState(true)

//   useEffect(() => {
//     updateDB()
//   }, [checkedPlayer1Checkboxes, checkedPlayer2Checkboxes])

//   useEffect(() => {
//     let arr1 = []
//     let arr2 = []
//     for (let i = 0; i < player1?.games; i++) {
//       arr1.push(false)
//     }
//     for (let i = 0; i < player2?.games; i++) {
//       arr2.push(false)
//     }
//     setCheckedPlayer1Checkboxes(arr1)
//     setCheckedPlayer2Checkboxes(arr2)
//   }, [props.currentMatch?.player1Wins, player1?.games, player2?.games, props.currentMatch?.player2Wins])


//   const checkForWin = () => {
//     if (checkedPlayer1Checkboxes.every((value) => value === true)) {
//       setIsDisabled(true)
//     } else {
//       setIsDisabled(false)
//     }
//     if (checkedPlayer2Checkboxes.every((value) => value === true)) {
//       setIsDisabled(true)
//     } else {
//       setIsDisabled(false)
//     }
//   }

//   const handleCheckboxChange = async (index) => {
//     setCheckedPlayer1Checkboxes((prev) => {
//       const newChecked = [...prev]
//       newChecked[index] = !newChecked[index]
//       return newChecked
//     })
//     await updateDB()
//   }

//   useEffect(() => {
//     const getCheckboxes = async () => {
//       const checkboxesArray = []
//       for (let i = 0; i < props.currentMatch?.player1?.games ; i++) {
//         const isChecked = await checkedPlayer1Checkboxes[i]
//         await checkboxesArray.push(
//           <div
//             key={`${player1._id}-checkbox-${i}`}
//             onClick={() => handleCheckboxChange(i)}
//           >
//             <div
//               id={`${player1._id}-checkbox-${i}`}
//               className="poolballs"
//               style={{
//                 backgroundColor: isChecked ? "black" : "",
//                 backgroundImage: isChecked ? "url(/9ball.png)" : "",
//               }}
//             ></div>
//           </div>
//         )
//       }
//       await setPlayer1Checkboxes(checkboxesArray)
//     }

//     getCheckboxes()
//     checkForWin()
//   }, [player1, player2, checkedPlayer1Checkboxes, checkedPlayer2Checkboxes])

//   const updateDB = async () => {
//       let data1 = await {
//         ...match,
//         player1Wins: checkedPlayer1Checkboxes,
//       }
//       // await matchService.update(data1)
//       let data2 = {
//         ...match,
//         player2Wins: checkedPlayer2Checkboxes,
//       }
//       // matchService.update(data2)
//   }

//   useEffect(() => {}, [player1, player2, props.currentMatch])

//   useEffect(() => {
//     const getPlayerInfo = async () => {
//       setPlayer1(props.currentMatch?.player1)
//       setPlayer2(props.currentMatch?.player2)
//     }
//     getPlayerInfo()
//   }, [props.currentMatch])


//   useEffect(() => {
//     const getGameRace = async () => {
//       try {
//         if (
//           props.currentMatch &&
//           props.currentMatch.player1 &&
//           props.currentMatch.player2
//         ) {
//           const data = await gameService.getGameRace(
//             props.currentMatch.player1,
//             props.currentMatch.player2
//           )
//           setGamesNeeded(data)
//         }
//       } catch (error) {
//         console.error("Error fetching game race:", error)
//       }
//     }
//     getGameRace()
//   }, [props.currentMatch])

//   useEffect(() => {
//     const addGamesNeeded = async () => {
//       try {
//         if (match && gamesNeeded && gamesNeeded.length >= 2) {
//           setUpdatedPlayerStateWithMatchCount((prevPlayerInfo) => {
//             if (
//               prevPlayerInfo?.length >= 2 &&
//               gamesNeeded?.length >= 2 &&
//               player1.games !== gamesNeeded[0] &&
//               player2.games !== gamesNeeded[1]
//             ) {
//               return [
//                 { ...prevPlayerInfo[0], games: gamesNeeded[0] },
//                 { ...prevPlayerInfo[1], games: gamesNeeded[1] },
//               ]
//             }
//             return prevPlayerInfo
//           })
//         }
//       } catch (error) {
//         console.error("Error updating player state:", error)
//       }
//     }
//     addGamesNeeded()
//   }, [match, gamesNeeded])

//   const handleWinner = async (winner) => {
//     console.log(winner)
//   }
//   return (
//     <>
//       <div className={`${styles.greenFelt} ${styles.bracket}`}>
//         <div className="flex column" style={{ alignItems: "center" }}>
//           <div
//             className="flex start bracket match-width2 match-height2 green-felt start"
//             style={{ width: "90%" }} //, WebkitTextStroke: '1px white', color:'black'
//           >
//             <h1>
//               {player1?.name} ({player1?.rank})
//             </h1>
//             <div className="end" style={{ width: "95%" }}>
//               {/* <Checkboxes
//                 //  handleSaveMatch={handleSaveMatch}
//                 playerInfo="player1"
//                 handleWonGame={handleWonGame}
//                 player={updatedPlayerStateWithMatchCount[0]}
//                 profile={props.profile}
//                 player1Wins={props.currentMatch?.player1Wins}
//                 match={props.currentMatch}
//                 handleUpdateMatch={props.handleUpdateMatch}
//                 handleWinner={handleWinner}
//               /> */}
//               <>
//                 {player1Checkboxes}
//                 {props.profile.accessLevel >= 40 && isDisabled && (
//                   <button
//                     onClick={() => {
//                       handleWinner(player1)
//                     }}
//                   >
//                     Winner
//                   </button>
//                 )}
//               </>
//             </div>
//           </div>
//           <div
//             className="flex bracket match-width2 match-height2 green-felt space-around start"
//             style={{ width: "90%" }} //, WebkitTextStroke: '1px white', color:'black'
//           >
//             <h1>
//               {player2?.name} ({player2?.rank})
//             </h1>
//             <div className="end" style={{ width: "95%" }}>
//               {/* <Checkboxes
//                 //  handleSaveMatch={handleSaveMatch}
//                 playerInfo='player2'
//                 handleWonGame={handleWonGame}
//                 player={updatedPlayerStateWithMatchCount[1]}
//                 player2Wins={props.currentMatch?.player2Wins}
//                 profile={props.profile}
//                  handleWinner={handleWinner}
//                 match={props.currentMatch}
//                 handleUpdateMatch={props.handleUpdateMatch}
//               /> */}

//               <>
//                 {player2Checkboxes}
//                 {props.profile.accessLevel >= 40 && isDisabled && (
//                   <button
//                     onClick={() => {
//                       handleWinner(player2)
//                     }}
//                   >
//                     Winner
//                   </button>
//                 )}
//               </>
//             </div>
//           </div>
//         </div>
//         <button onClick={() => props.handleCancel(props.mth)}>
//           Cancel this match
//         </button>
//       </div>
//     </>
//   )
// }

// export default SingleMatch

  // useEffect(() => {
  //   if(playerInfo === 'player1'){
  //     if (player1Wins?.length > 0) {
  //       setCheckedCheckboxes([...player1Wins])
  //     }
  //   }
  //   if(playerInfo === 'player2'){
  //     if (player2Wins?.length > 0) {
  //       setCheckedCheckboxes([...player2Wins])
  //     }
  //   }
  // }, [player1Wins, player?.games, player2Wins])

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
  // const [gameWinner, setGameWinner] = useState(null)
  // const [gameLoser, setGameLoser] = useState(null)
  // const [winningTeam, setWinningTeam] = useState(null)
  // const [losingTeam, setLosingTeam] = useState(null)