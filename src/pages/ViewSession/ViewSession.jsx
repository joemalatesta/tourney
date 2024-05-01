import { useState, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
// import SingleMatch from '../../components/SingleMatch/SingleMatch'
// import MatchHandler from "../../components/MatchHandler/MatchHandler"
import * as sessionService from "../../services/sessionService"

const ViewSession = () => {
  const [currentMatches, setCurrentMatches] = useState()
  const location = useLocation()
  const navigate = useNavigate()
  const queryString = location.search
  const params = new URLSearchParams(queryString)
  const sessionId = params.get("sessionId")
  useEffect(() => {
    const getSession = async () => {
      const data = await sessionService.findOne(sessionId)
      setCurrentMatches(data)
    }
    getSession()
  }, [])

  const handleShowMatch = (match) => {
    const state = {
      tableId: match._id,
      sessionId: sessionId,
    }
    const queryString = new URLSearchParams(state).toString()
    navigate(`/viewOneSession?${queryString}`)
  }

  return (
    <>
      <div className='bracket' onClick={() => handleShowMatch(currentMatches.table1)}>
        {currentMatches?.table1.homeTeam.teamName}
        <br /> VS
        <br /> {currentMatches?.table1.awayTeam.teamName}
        <br />
        <br />
      </div>
      <div  className='bracket' onClick={() => handleShowMatch(currentMatches.table2)}>
        {currentMatches?.table2.homeTeam.teamName}
        <br /> VS
        <br /> {currentMatches?.table2.awayTeam.teamName}
        <br />
        <br />
      </div>
      <div  className='bracket' onClick={() => handleShowMatch(currentMatches.table3)}>
        {currentMatches?.table3.homeTeam.teamName}
        <br /> VS
        <br /> {currentMatches?.table3.awayTeam.teamName}
        <br />
        <br />
      </div>
      <div className='bracket' onClick={() => handleShowMatch(currentMatches.table4)}>
        {currentMatches?.table4.homeTeam.teamName}
        <br /> VS
        <br /> {currentMatches?.table4.awayTeam.teamName}
        <br />
        <br />
      </div>
    </>
  )
}

export default ViewSession

{
  /* <SingleMatch
        mth={props.mth}
        setShowButton={props.setShowButton}
        handleCancel={props.handleCancel}
        match1={props.match1}
        match2={props.match2}
        match3={props.match3}
        showButton={props.showButton}
        setCompleteMatch={props.setCompleteMatch}
        completeMatch={props.completeMatch}
        number={props.matchNumber}
        matchId={props.matchId}
        match={props.match}
        profile={props.profile}
      /> */
}

// const Match = (props) => {
//   const [finalSubmit, setFinalSubmit] = useState(false)
//   const [team1, setTeam1] = useState(null)
//   const [team2, setTeam2] = useState(null)
//   const [player1, setPlayer1] = useState(null)
//   const [player2, setPlayer2] = useState(null)
//   const [match, setMatch] = useState([])
//   const [match1, setMatch1] = useState(null)
//   const [match2, setMatch2] = useState(null)
//   const [match3, setMatch3] = useState(null)
//   const [showButton, setShowButton] = useState(false)
//   const [completeMatch, setCompleteMatch] = useState({
//     match1: "",
//     match2: "",
//     match3: "",
//     isSubmitted: "",
//     submittedBy: `${props.profile.firstName} ${props.profile.lastName}`,
//   })

//   useEffect(() => {
//     setCompleteMatch((prevMatch) => ({
//       ...prevMatch,
//       homeTeam: team1,
//       visitingTeam: team2,
//     }))
//   }, [team1, team2])

//   useEffect(() => {
//     const getTeamData = () => {
//       setTeam1(props.viewMatch.homeTeam)
//       setTeam2(props.viewMatch.visitor)
//     }
//     getTeamData()
//   }, [props?.viewMatch?.homeTeam, props?.viewMatch?.visitor])

//   useEffect(() => {}, [match])

//   const handleChoosePlayer = (player, title) => {
//     if (title === "Team 1") {
//       setPlayer1(player)
//     }
//     if (title === "Team 2") {
//       setPlayer2(player)
//     }
//   }

//   const handleSetPlayers = async () => {
//     if (player1 !== null && player2 !== null) {
//       if (match1 === null) {
//         await setMatch1([player1, player2])
//       }
//       if (match2 === null && match1 !== null) {
//         await setMatch2([player1, player2])
//       }
//       if (match3 === null && match1 !== null && match2 !== null) {
//         await setMatch3([player1, player2])
//       }
//       setMatch([player1, player2])
//       setPlayer1(null)
//       setPlayer2(null)
//     }
//   }

//   const finalSubmitForApprovalButton = async () => {
//     console.log(completeMatch)
//     await triMatchService.create(completeMatch)
//     setFinalSubmit(!finalSubmit)
//   }

//   let color = player1 == null || player2 == null ? "red" : "green"

//   const handleCancel = (mth) => {
//     if (mth === "m1") setMatch1(null)
//     if (mth === "m2") setMatch2(null)
//     if (mth === "m3") setMatch3(null)
//   }

//   return (
//     <>
//       <div className="bracket">
//         <h1 className="center">Match </h1>

//         <p className="center">Pick players here for match play.</p>
//         <p className="center">
//           Press the green center button to confirm names scroll down to view the
//           match.
//           <br />
//         </p>
//         <p className="center">
//           After you validate the match you can choose your next match players.
//         </p>
//         <p className="center">
//           When all 3 matches have been played press the final{" "}
//         </p>
//         <p className="center">
//           match complete the match and submit your scores.
//         </p>
//       </div>

//       <div className="row center space-around">
//         <div className="bracket">
//           <h2>{team1?.teamName}</h2>
//           <div className="w325">
//             <TeamPlayers
//               matchPlayer={player1}
//               title="Team 1"
//               team={team1}
//               handleChoosePlayer={handleChoosePlayer}
//             />
//           </div>
//         </div>

//         <MatchHandler
//           completeMatch={completeMatch}
//           match1={match1}
//           match2={match2}
//           match3={match3}
//           handleSetPlayers={handleSetPlayers}
//           color={color}
//         />
//         <div className="bracket">
//           <h2>{team2?.teamName}</h2>
//           <div className="w325">
//             <TeamPlayers
//               matchPlayer={player2}
//               title="Team 2"
//               team={team2}
//               handleChoosePlayer={handleChoosePlayer}
//             />
//           </div>
//         </div>
//       </div>
//       {showButton === true && finalSubmit === false && (
//         <>
//           <div className="center">
//             <h1> Match is Complete</h1>
//             <br />
//           </div>

//           <div className="center">
//             <button
//               style={{ width: "100px", height: "100px" }}
//               onClick={finalSubmitForApprovalButton}
//             >
//               Approve the Match
//             </button>
//           </div>
//         </>
//       )}
//       {match3 !== null && (
//         <>
//           <h1 className="center">Match 3</h1>
//           <MatchView
//             mth="m3"
//             handleCancel={handleCancel}
//             setShowButton={setShowButton}
//             match1={match1}
//             match2={match2}
//             match3={match3}
//             showButton={showButton}
//             setCompleteMatch={setCompleteMatch}
//             completeMatch={completeMatch}
//             matchNumber={3}
//             match={match3}
//             matchId={props.matchId}
//             profile={props.profile}
//           />
//         </>
//       )}
//       {match2 !== null && (
//         <>
//           <h1 className="center">Match 2</h1>
//           <MatchView
//             mth="m2"
//             handleCancel={handleCancel}
//             match1={match1}
//             match2={match2}
//             match3={match3}
//             showButton={showButton}
//             setCompleteMatch={setCompleteMatch}
//             completeMatch={completeMatch}
//             matchNumber={2}
//             match={match2}
//             matchId={props.matchId}
//             profile={props.profile}
//           />
//         </>
//       )}
//       {match1 !== null && (
//         <>
//           <h1 className="center">Match 1</h1>
//           <MatchView
//             mth="m1"
//             handleCancel={handleCancel}
//             match1={match1}
//             match2={match2}
//             match3={match3}
//             showButton={showButton}
//             setCompleteMatch={setCompleteMatch}
//             completeMatch={completeMatch}
//             matchNumber={1}
//             match={match1}
//             matchId={props.matchId}
//             profile={props.profile}
//           />
//         </>
//       )}
//     </>
//   )
// }
