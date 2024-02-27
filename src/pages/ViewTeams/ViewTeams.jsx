import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import * as teamService from "../../services/teamService"
import * as styles from './ViewTeams.module.css'

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
    <div className={`${styles.center} ${styles.bracket}`}>
      <h1>Teams</h1>
      <div className={`${styles.greenFelt}  ${styles.bracket}`}>
      {teams?.map((team) => (
        <div key={team._id}>
            <h3 onClick={() => handleGetTeam(team)}>{team.teamName}</h3>
          </div>
        )
      )}
      </div>
     
    </div>
  )
}

export default ViewTeams