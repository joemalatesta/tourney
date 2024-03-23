import * as playerService from "../../services/playerService"
// import * as teamService from "../../services/teamService"
import { useState, useEffect } from "react"
import * as triMatchService from "../../services/triMatchService"

const MatchApproval = () => {
  const [playedData, setPlayedData] = useState([])
  const [matchPairs, setMatchPairs] = useState([])

  console.log(playedData)
  console.log(matchPairs)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await triMatchService.index()
        const matchStates = data.map((match) => ({
          ...match,
        }))
        setPlayedData(matchStates)
        if (matchStates && matchStates.length > 0) {
          const groupedArrays = matchStates.reduce((groups, current) => {
            const key = current.date + "|" + current.homeTeam.teamName
            if (!groups[key]) {
              groups[key] = []
            }
            groups[key].push(current)
            return groups
          }, {})
          const result = Object.values(groupedArrays)
          setMatchPairs(result)
        } else {
          setMatchPairs([])
        }
      } catch (error) {
        console.error("Error fetching played matches:", error)
      }
    }
    fetchData()
  }, [])

  const handleFinalSubmit = async (match) => {
    // Player stat adjusting code

    const winner1 = await match[0].match1.winningPlayer
    const winner2 = await match[0].match2.winningPlayer
    const winner3 = await match[0].match3.winningPlayer

    const loser1 = await match[0].match1.losingPlayer
    const loser2 = await match[0].match2.losingPlayer
    const loser3 = await match[0].match3.losingPlayer

    let winData1 = await {
      ...winner1,
      rank: winner1.rank + 1,
      matchesPlayed: winner1.matchesPlayed + 1,
      matchWin: winner1.matchWin + 1,
      gamesWon: winner1.gamesWon + winner1.winnerGamesPlayed,
      gamesLoss: winner1.gamesLoss + loser1.loserGamesPlayed
    }
    let winData2 = await {
      ...winner2,
      rank: winner2.rank + 1,
      matchesPlayed: winner2.matchesPlayed + 1,
      matchWin: winner2.matchWin + 1,
    }
    let winData3 = await {
      ...winner3,
      rank: winner3.rank + 1,
      matchesPlayed: winner3.matchesPlayed + 1,
      matchWin: winner3.matchWin + 1,
    }

    let loserData1 = await {
      ...loser1,
      rank: loser1.rank - 1,
      matchesPlayed: loser1.matchesPlayed + 1,
      matchLoss: loser1.matchLoss + 1,
    }
    let loserData2 = await {
      ...loser2,
      rank: loser2.rank - 1,
      matchesPlayed: loser2.matchesPlayed + 1,
      matchLoss: loser2.matchLoss + 1,
    }
    let loserData3 = await {
      ...loser3,
      rank: loser3.rank - 1,
      matchesPlayed: loser3.matchesPlayed + 1,
      matchLoss: loser3.matchLoss + 1,
    }

    playerService.update(winData1)
    playerService.update(winData2)
    playerService.update(winData3)

    playerService.update(loserData1)
    playerService.update(loserData2)
    playerService.update(loserData3)

    // Team stat adjusting code

    console.log(match)
  }

  return (
    <>
      {!matchPairs?.length && <h1>No Matches to Display</h1>}
      {matchPairs?.length && (
        <div className="bracket">
          {matchPairs?.map((match, idx) => (
            <div className="bracket" key={idx}>
              {match.length === 1 && (
                <h2>Warning Only one Person has submitted Stats</h2>
              )}
              <li>{match[0].date}</li>
              Home Team : {match[0].homeTeam.teamName}
              <br />
              <br />
              Visiting Team : {match[0].visitingTeam.teamName}
              <br />
              <div className=" row">
                <div className="bracket ">
                  <div className="center">
                    Match 1<br />
                  </div>
                  Winner :{" "}
                  {match[0].match1.winningPlayer.name ===
                  match[1]?.match1.winningPlayer.name ? (
                    <div style={{ color: "green " }}>
                      {match[0].match1.winningPlayer.name}
                    </div>
                  ) : (
                    <div style={{ color: "red" }}>
                      {match[0].match1.winningPlayer.name}
                      <br />
                      OR <br />
                      {match[1]?.match1?.winningPlayer.name} ?
                    </div>
                  )}
                  <br />
                  <div>
                    {" "}
                    Games Won :{" "}
                    {match[0].match1.winnerGamesPlayed ===
                    match[1]?.match1.winnerGamesPlayed ? (
                      <div style={{ color: "green " }}>
                        {match[0].match1.winnerGamesPlayed}
                      </div>
                    ) : (
                      <div style={{ color: "red" }}>
                        {match[0].match1.winnerGamesPlayed} OR{" "}
                        {match[1]?.match1?.winnerGamesPlayed} ?
                      </div>
                    )}
                    Loser :{" "}
                    {match[0].match1.losingPlayer.name ===
                    match[1]?.match1?.losingPlayer.name ? (
                      <div style={{ color: "green " }}>
                        {match[0].match1.losingPlayer.name}
                      </div>
                    ) : (
                      <div style={{ color: "red" }}>
                        {match[0].match1.losingPlayer.name}
                        <br />
                        OR <br />
                        {match[1]?.match1.losingPlayer.name} ?
                      </div>
                    )}
                  </div>
                  <br />
                  <div>
                    {" "}
                    Games Won :{" "}
                    {match[0].match1.loserGamesPlayed ===
                    match[1]?.match1.loserGamesPlayed ? (
                      <div style={{ color: "green " }}>
                        {match[0].match1.loserGamesPlayed}
                      </div>
                    ) : (
                      <div style={{ color: "red" }}>
                        {match[0].match1.loserGamesPlayed} OR{" "}
                        {match[1]?.match1.loserGamesPlayed} ?
                      </div>
                    )}
                  </div>
                </div>
                <div className="bracket ">
                  <div className="center">
                    Match 2<br />
                  </div>
                  Winner :{" "}
                  {match[0].match2.winningPlayer.name ===
                  match[1]?.match2.winningPlayer.name ? (
                    <div style={{ color: "green " }}>
                      {match[0].match2.winningPlayer.name}
                    </div>
                  ) : (
                    <div style={{ color: "red" }}>
                      {match[0].match2.winningPlayer.name} <br />
                      OR <br />
                      {match[1]?.match2.winningPlayer.name} ?
                    </div>
                  )}
                  <br />
                  <div>
                    {" "}
                    Games Won :{" "}
                    {match[0].match2.winnerGamesPlayed ===
                    match[1]?.match2.winnerGamesPlayed ? (
                      <div style={{ color: "green " }}>
                        {match[0].match2.winnerGamesPlayed}
                      </div>
                    ) : (
                      <div style={{ color: "red" }}>
                        {match[0].match2.winnerGamesPlayed} OR{" "}
                        {match[1]?.match2.winnerGamesPlayed} ?
                      </div>
                    )}
                    Loser :{" "}
                    {match[0].match2.losingPlayer.name ===
                    match[1]?.match2.losingPlayer.name ? (
                      <div style={{ color: "green " }}>
                        {match[0].match2.losingPlayer.name}
                      </div>
                    ) : (
                      <div style={{ color: "red" }}>
                        {match[0].match2.losingPlayer.name}
                        <br />
                        OR
                        <br />
                        {match[1]?.match2.losingPlayer.name} ?
                      </div>
                    )}
                  </div>
                  <br />
                  <div>
                    {" "}
                    Games Won :{" "}
                    {match[0].match2.loserGamesPlayed ===
                    match[1]?.match2.loserGamesPlayed ? (
                      <div style={{ color: "green " }}>
                        {match[0].match2.loserGamesPlayed}
                      </div>
                    ) : (
                      <div style={{ color: "red" }}>
                        {match[0].match2.loserGamesPlayed} OR{" "}
                        {match[1]?.match2.loserGamesPlayed} ?
                      </div>
                    )}
                  </div>
                </div>
                <div className="bracket ">
                  <div className="center">
                    Match 3<br />
                  </div>
                  Winner :{" "}
                  {match[0].match3.winningPlayer.name ===
                  match[1]?.match3.winningPlayer.name ? (
                    <div style={{ color: "green " }}>
                      {match[0].match3.winningPlayer.name}
                    </div>
                  ) : (
                    <div style={{ color: "red" }}>
                      {match[0].match3.winningPlayer.name} OR{" "}
                      {match[1]?.match3.winningPlayer.name} ?
                    </div>
                  )}
                  <br />
                  <div>
                    {" "}
                    Games Won :{" "}
                    {match[0].match3.winnerGamesPlayed ===
                    match[1]?.match3.winnerGamesPlayed ? (
                      <div style={{ color: "green " }}>
                        {match[0].match3.winnerGamesPlayed}
                      </div>
                    ) : (
                      <div style={{ color: "red" }}>
                        {match[0].match3.winnerGamesPlayed} OR{" "}
                        {match[1]?.match3.winnerGamesPlayed} ?
                      </div>
                    )}
                    Loser :{" "}
                    {match[0].match3.losingPlayer.name ===
                    match[1]?.match3.losingPlayer.name ? (
                      <div style={{ color: "green " }}>
                        {match[0].match3.losingPlayer.name}
                      </div>
                    ) : (
                      <div style={{ color: "red" }}>
                        {match[0].match3.losingPlayer.name} OR{" "}
                        {match[1]?.match3.losingPlayer.name} ?
                      </div>
                    )}
                  </div>
                  <br />
                  <div>
                    {" "}
                    Games Won :{" "}
                    {match[0].match3.loserGamesPlayed ===
                    match[1]?.match3.loserGamesPlayed ? (
                      <div style={{ color: "green " }}>
                        {match[0].match3.loserGamesPlayed}
                      </div>
                    ) : (
                      <div style={{ color: "red" }}>
                        {match[0].match3.loserGamesPlayed} OR{" "}
                        {match[1]?.match3.loserGamesPlayed} ?
                      </div>
                    )}
                  </div>
                </div>
              </div>
              Match submitted by : {match[0]?.submittedBy}{" "}
              {match.length > 1 ? ` & ${match[1]?.submittedBy}` : ""}{" "}
              <button onClick={() => handleFinalSubmit(match)}>
                Submit Final Stats
              </button>
            </div>
          ))}
        </div>
      )}
    </>
  )
}

export default MatchApproval

// // // // const handleConfirmMatch = async (matchIndex) => {
// // // //   try {
// // // //     const match = playedData[matchIndex]
// // // //     setPlayedData((prevMatches) => {
// // // //       const updatedMatches = [...prevMatches]
// // // //       updatedMatches[matchIndex] = {
// // // //         ...updatedMatches[matchIndex],
// // // //         isDisabled: true,
// // // //         confirmed: true
// // // //       }
// // // //       return updatedMatches
// // // //     })
// // // //     await playedMatchService.update(playedData)
// // // //     await handleWinners(match.winningTeam, match.winningPlayer)
// // // //     await handleLosers(match.losingTeam, match.losingPlayer)
// // // //   } catch (error) {
// // // //     console.error("Error confirming match:", error)
// // // //   }
// // // // }

// const handleSubmitChanges = async (match) => {
//   await grabTeamWins()
//   console.log(match);
//   let homeTeam = match.homeTeam
//   let visitingTeam = match.visitingTeam
//   let updatedHomeScores = {
//     ...homeTeam,
//     wins: homeTeam.wins + homeWins,
//     loss: homeTeam.loss + (3 - homeWins)}

//   let updatedAwayScores = {
//     ...visitingTeam,
//     wins: visitingTeam.wins + awayWins,
//     loss: visitingTeam.loss + (3 - awayWins)}

//   console.log(updatedAwayScores, updatedHomeScores)
//   await teamService.update(updatedAwayScores)
//   await teamService.update(updatedHomeScores)
// }
