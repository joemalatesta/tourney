// import * as playerService from "../../services/playerService"
// import * as teamService from "../../services/teamService"
import { useState, useEffect } from "react"
import * as triMatchService from "../../services/triMatchService"

const MatchApproval = () => {
  const [playedData, setPlayedData] = useState([])
  const [matchPairs, setMatchPairs] = useState([])

  console.log(playedData)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await triMatchService.index()
        const matchStates = data.map((match) => ({
          ...match,
          isDisabled: false,
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

  return (
    <>
      {!matchPairs?.length && <h1>No Matches to Display</h1>}
      {matchPairs?.length && (
        <div className="bracket">
          {matchPairs?.map((match, idx) => (
            <div className="bracket" key={idx}>
              {match.length === 1 && 
              <h2>Warning Only one Person has submitted Stats</h2>
              }
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
              {match.length > 1 ? ` & ${match[1]?.submittedBy}` : ""}
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

//  {playedData.length ? (
//     playedData?.map((match) => (
//       <li className="bracket" key={match._id}>
//         Date: {match.date}
//         <br />
//         Home Team : {match.homeTeam.teamName}
//         <br />
//         Visiting Team : {match.visitingTeam.teamName}
//         <br />
//         <div className="row">
//           <div className="bracket ">
//             Match 1<br />
//             Completed : {match.match1.completed ? " YES" : " NO"}
//             <br />
//             Winning Team :{" "}
//             {match.match1.winningTeam == undefined
//               ? "None"
//               : match.match1.winningTeam.teamName}
//             <br />
//             Losing Team :{" "}
//             {match.match1.losingTeam === undefined
//               ? "None"
//               : match.match1.losingTeam.teamName}
//             <br />
//             <div>
//               Winning Player :{" "}
//               {match.match1.winningPlayer === undefined
//                 ? "None"
//                 : match.match1.winningPlayer.name}{" "}
//               <br />
//               Games Won : {match.match1.winnerGamesPlayed}
//               <br />
//               Losing Player :{" "}
//               {match.match1.losingPlayer === undefined
//                 ? "None"
//                 : match.match1.losingPlayer.name}{" "}
//               <br />
//               Games Won : {match.match1.loserGamesPlayed}
//               <br />
//             </div>
//           </div>
//           <div className="bracket ">
//             Match 2<br />
//             Completed : {match.match2.completed ? " YES" : " NO"}
//             <br />
//             Winning Team :{" "}
//             {match.match2.winningTeam == undefined
//               ? "None"
//               : match.match2.winningTeam.teamName}
//             <br />
//             Losing Team :{" "}
//             {match.match2.losingTeam === undefined
//               ? "None"
//               : match.match2.losingTeam.teamName}
//             <br />
//             <div>
//               Winning Player :{" "}
//               {match.match2.winningPlayer === undefined
//                 ? "None"
//                 : match.match2.winningPlayer.name}{" "}
//               <br />
//               Games Won : {match.match2.winnerGamesPlayed}
//               <br />
//               Losing Player :{" "}
//               {match.match2.losingPlayer === undefined
//                 ? "None"
//                 : match.match2.losingPlayer.name}{" "}
//               <br />
//               Games Won : {match.match2.loserGamesPlayed}
//               <br />
//             </div>
//           </div>
//           <div className="bracket ">
//             Match 3<br />
//             Completed : {match.match3.completed ? " YES" : " NO"}
//             <br />
//             Winning Team :{" "}
//             {match.match3.winningTeam == undefined
//               ? "None"
//               : match.match3.winningTeam.teamName}
//             <br />
//             Losing Team :{" "}
//             {match.match3.losingTeam === undefined
//               ? "None"
//               : match.match3.losingTeam.teamName}
//             <br />
//             <div>
//               Winning Player :{" "}
//               {match.match3.winningPlayer === undefined
//                 ? "None"
//                 : match.match3.winningPlayer.name}{" "}
//               <br />
//               Games Won : {match.match3.winnerGamesPlayed}
//               <br />
//               Losing Player :{" "}
//               {match.match3.losingPlayer === undefined
//                 ? "None"
//                 : match.match3.losingPlayer.name}{" "}
//               <br />
//               Games Won : {match.match3.loserGamesPlayed}
//               <br />
//             </div>
//           </div>
//         </div>
//         Submitted By : {match.submittedBy}
//         {/* <h1>
//           Match Winner:{" "}
//           {homeWins > awayWins
//             ? match.homeTeam.teamName
//             : match.visitingTeam.teamName}
//         </h1>
//          <button onClick={() => handleSubmitChanges(match)}>
//           Submit Changes to Teams and Players
//         </button>
//       </li>
//     ))
//   ) : (
//     <div className="center">
//       <h1>All Matches have been Approved</h1>
//     </div>
//   )}
