import { useState, useEffect } from "react"
// import * as playerService from "../../services/playerService"
import * as triMatchService from "../../services/triMatchService"

const MatchApproval = () => {
  const [playedData, setPlayedData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await triMatchService.index()
        const matchStates = data.map((match) => ({
          ...match,
          isDisabled: false,
        }))
        setPlayedData(matchStates)
      } catch (error) {
        console.error("Error fetching played matches:", error)
      }
    }
    fetchData()
  }, [])

  let data = playedData.map((match) => [match])

  data = data.reduce((acc, currentItem, index, arr) => {
    for (let i = index + 1; i < arr.length; i++) {
      const comparedItem = arr[i]
      if (
        currentItem.date === comparedItem.date &&
        currentItem.homeTeam === comparedItem.homeTeam &&
        currentItem.visitingTeam === comparedItem.visitingTeam
      ) {
        return [currentItem, comparedItem]
      }
    }
    return acc
  }, [])


//   const compareObjects = (obj1, obj2, propertiesToCompare) => {
//     for (let property of propertiesToCompare) {
//         if (obj1[property] !== obj2[property]) {
//             return false;
//         }
//     }
//     // If all values are equal, return true
//     return true;
// }
// // Example objects to compare
// const obj1 = { a: 1, b: 2, c: 3, d: 4 };
// const obj2 = { a: 1, b: 2, c: 3, d: 4 };
// const obj3 = { a: 1, b: 2, c: 3, d: 5 };

// const propertiesToCompare = ['c', 'd'];
// console.log(compareObjects(obj1, obj2, propertiesToCompare)); // Output: true
// console.log(compareObjects(obj1, obj3, propertiesToCompare));

  return (
    <>
      {playedData?.map((match) => (
        <li className="bracket" key={match._id}>
          Date: {match.date}
          <br />
          Home Team : {match.homeTeam.teamName}
          <br />
          Visiting Team : {match.visitingTeam.teamName}
          <br />
          <div className="row">
            <div className="bracket ">
              Match 1<br />
              Completed : {match.match1.completed ? " YES" : " NO"}
              <br />
              Winning Team :{" "}
              {match.match1.winningTeam == undefined
                ? "None"
                : match.match1.winningTeam.teamName}
              <br />
              Losing Team :{" "}
              {match.match1.losingTeam === undefined
                ? "None"
                : match.match1.losingTeam.teamName}
              <br />
              <div>
                Winning Player :{" "}
                {match.match1.winningPlayer === undefined
                  ? "None"
                  : match.match1.winningPlayer.name}{" "}
                <br />
                Games Won : {match.match1.winnerGamesPlayed}
                <br />
                Losing Player :{" "}
                {match.match1.losingPlayer === undefined
                  ? "None"
                  : match.match1.losingPlayer.name}{" "}
                <br />
                Games Won : {match.match1.loserGamesPlayed}
                <br />
              </div>
            </div>
            <div className="bracket ">
              Match 2<br />
              Completed : {match.match2.completed ? " YES" : " NO"}
              <br />
              Winning Team :{" "}
              {match.match2.winningTeam == undefined
                ? "None"
                : match.match2.winningTeam.teamName}
              <br />
              Losing Team :{" "}
              {match.match2.losingTeam === undefined
                ? "None"
                : match.match2.losingTeam.teamName}
              <br />
              <div>
                Winning Player :{" "}
                {match.match2.winningPlayer === undefined
                  ? "None"
                  : match.match2.winningPlayer.name}{" "}
                <br />
                Games Won : {match.match2.winnerGamesPlayed}
                <br />
                Losing Player :{" "}
                {match.match2.losingPlayer === undefined
                  ? "None"
                  : match.match2.losingPlayer.name}{" "}
                <br />
                Games Won : {match.match2.loserGamesPlayed}
                <br />
              </div>
            </div>
            <div className="bracket ">
              Match 3<br />
              Completed : {match.match3.completed ? " YES" : " NO"}
              <br />
              Winning Team :{" "}
              {match.match3.winningTeam == undefined
                ? "None"
                : match.match3.winningTeam.teamName}
              <br />
              Losing Team :{" "}
              {match.match3.losingTeam === undefined
                ? "None"
                : match.match3.losingTeam.teamName}
              <br />
              <div>
                Winning Player :{" "}
                {match.match3.winningPlayer === undefined
                  ? "None"
                  : match.match3.winningPlayer.name}{" "}
                <br />
                Games Won : {match.match3.winnerGamesPlayed}
                <br />
                Losing Player :{" "}
                {match.match3.losingPlayer === undefined
                  ? "None"
                  : match.match3.losingPlayer.name}{" "}
                <br />
                Games Won : {match.match3.loserGamesPlayed}
                <br />
              </div>
            </div>
          </div>
          Submitted By : {match.submittedBy}
        </li>
      ))}
    </>
  )
}

export default MatchApproval

// // const handleLosers = async (team, player) => {
// //   try {
// //     let losingTeam = { ...team, loss: parseInt(team.loss) + 1 }
// //     console.log("This is the losing team", losingTeam)
// //     await handleEditTeam(losingTeam)

// //     let loser = {
// //       ...player,
// //       matchesPlayed: player.matchesPlayed + 1,
// //       matchLoss: parseInt(player.matchLoss) + 1,
// //       rank: player.rank - 1,
// //     }
// //     await playerService.update(loser)
// //   } catch (error) {
// //     console.error("Error handling losers:", error)
// //   }
// // }

// // const handleWinners = async (team, player) => {
// //   try {
// //     let winningTeam = { ...team, wins: parseInt(team.wins) + 1 }
// //     console.log(winningTeam)
// //     await handleEditTeam(winningTeam)

// //     let winner = {
// //       ...player,
// //       matchesPlayed: player.matchesPlayed + 1,
// //       matchWin: parseInt(player.matchWin) + 1,
// //       rank: player.rank + 1,
// //     }
// //     await playerService.update(winner)
// //   } catch (error) {
// //     console.error("Error handling winners:", error)
// //   }
// // }

// // const handleConfirmMatch = async (matchIndex) => {
// //   try {
// //     const match = playedData[matchIndex]
// //     setPlayedData((prevMatches) => {
// //       const updatedMatches = [...prevMatches]
// //       updatedMatches[matchIndex] = {
// //         ...updatedMatches[matchIndex],
// //         isDisabled: true,
// //         confirmed: true
// //       }
// //       return updatedMatches
// //     })
// //     await playedMatchService.update(playedData)
// //     await handleWinners(match.winningTeam, match.winningPlayer)
// //     await handleLosers(match.losingTeam, match.losingPlayer)
// //   } catch (error) {
// //     console.error("Error confirming match:", error)
// //   }
// // }
