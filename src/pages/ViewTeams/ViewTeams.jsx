import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import * as teamService from "../../services/teamService"


const ViewTeams = ({setTeam}) => {
  const navigate = useNavigate()
  const [teams, setTeams] = useState()
  
  useEffect(() => {
    const fetchTeams = async () => {
      const data = await teamService.index()
      setTeams(data)
    }
    fetchTeams()
  }, [])

    const handleGetTeam = async (team) => {
      await setTeam(team)
      navigate('/view-team')
    }
    
  return (
    <div>
      <h1>Teams</h1>
      {teams?.map((team) => (
        <div style={{color:'white'}} key={team._id}>
            <button onClick={() => handleGetTeam(team)}>{team.teamName}</button>
          </div>
        )
      )}
     
    </div>
  )
}

export default ViewTeams

// import { useEffect, useState } from "react"
// import { useNavigate } from "react-router-dom"
// import * as matchService from "../../services/matchService"
// import * as styles from "./ViewTournaments.module.css"

// const ViewTournaments = ({
//   user,
//   setTourneyMatch,
//   tourneyMatch,
//   setSingleMatch,
// }) => {
//   const navigate = useNavigate()
//   const [tourney, setTourney] = useState()

//   const handleGetMatch = async (game) => {
//     await setSingleMatch(game)
//     navigate("/brackets")
//   }

//   useEffect(() => {
//     const fetchMatches = async () => {
//       const data = await matchService.index()
//       setTourney(data)
//     }
//     fetchMatches()
//   }, [tourneyMatch])

//   const handleDeleteMatch = async (id) => {
//     const deletedMatch = await matchService.deleteOne(id)
//     setTourneyMatch(
//       tourneyMatch.filter((match) => match._id !== deletedMatch._id)
//     )
//   }

//   return (
//     <div className={`${styles.bracket}`}>
//       <div className={`${styles.greenFelt}`}>
//         {tourney?.length > 0 ? (
//           tourney?.map((game) => (
//             <div key={game._id}>
//               <button onClick={() => handleGetMatch(game)}>
//                 {game.name} : {game.gameType}
//               </button>
//               {user?.name === "Admin" && (
//                 <button onClick={() => handleDeleteMatch(game._id)}>
//                   delete match
//                 </button>
//               )}
//             </div>
//           ))
//         ) : (
//           <h1>No Tournaments Available</h1>
//         )}
//       </div>
//     </div>
//   )
// }

// export default ViewTournaments
