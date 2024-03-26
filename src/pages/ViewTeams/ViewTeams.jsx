import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

import PlayerName from "../../components/players/PlayerName"

import * as teamService from "../../services/teamService"
import * as styles from "./ViewTeams.module.css"

const ViewTeams = ({ setTeam, teams, setTeams }) => {
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
    navigate("/view-team")
  }

  return (
    <div className={`${styles.center} ${styles.bracket}`}>
      <h1>Teams</h1>

      {teams?.length ? (
        <div
          className={`${styles.greenFelt} ${styles.flex}  ${styles.bracket}`}
        >
          {teams?.map((team) => (
            <div
              style={{ width: "200px" }}
              className={styles.bracket}
              key={team._id}
            >
              <h3 onClick={() => handleGetTeam(team)}>{team.teamName}</h3>
        
              <PlayerName team={team} />
            </div>
          ))}
        </div>
      ) : (
        <div
          className={`${styles.greenFelt} ${styles.flex}  ${styles.bracket}`}
        >
          <h1>No Teams Yet</h1>
        </div>
      )}
    </div>
  )
}

export default ViewTeams
