import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import * as teamService from "../../services/teamService"
import * as styles from './ViewTeams.module.css'

const ViewTeams = ({setTeam, handleDeleteTeam, teams, setTeams}) => {
  const navigate = useNavigate()
  
  
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
    <div className={`${styles.center} ${styles.bracket}`}>
      <h1>Teams</h1>
      <div className={`${styles.greenFelt}  ${styles.bracket}`}>
      {teams?.map((team) => (
        <div key={team._id}>
            <h3 onClick={() => handleGetTeam(team)}>{team.teamName}
            </h3>
            <button onClick={()=>handleDeleteTeam(team._id)}>Delete</button>
          </div>
        )
      )}
      </div>
     
    </div>
  )
}

export default ViewTeams