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

  const compareObjects = (obj1, obj2, propertiesToCompare) => {
    for (let property of propertiesToCompare) {
      if (obj1[property] !== obj2[property]) {
        return false
      }
    }
    return true
  }

  useEffect(() => {
    const matchedIndices = new Set()

    const data = playedData.reduce((acc, currentItem, index, arr) => {
      if (matchedIndices.has(index)) {
        return acc
      }

      const propertiesToCompare = ["homeTeam._id", "visitingTeam._id"]

      const matchingIndex = arr.findIndex(
        (item, i) =>
          i !== index &&
          !matchedIndices.has(i) &&
          compareObjects(currentItem, item, propertiesToCompare)
      )
      if (matchingIndex !== -1) {
        const matchingItem = arr[matchingIndex]
        matchedIndices.add(index)
        matchedIndices.add(matchingIndex)
        acc.push([currentItem, matchingItem])
      }
      return acc
    }, [])

    console.log(data)
  }, [playedData])

  return (
    <>
      {playedData.length ? (
        playedData?.map((match) => (
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
        ))
      ) : (
        <div className="center">
          <h1>All Matches have been Approved</h1>
        </div>
      )}
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
