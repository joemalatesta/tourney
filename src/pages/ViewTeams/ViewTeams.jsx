import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

import PlayerName from "../../components/players/PlayerName"

import * as teamService from "../../services/teamService"
import * as styles from "./ViewTeams.module.css"

const ViewTeams = ({ setTeam, handleDeleteTeam, teams, setTeams, user }) => {
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
      <div className={`${styles.greenFelt} ${styles.flex}  ${styles.bracket}`}>
        {teams?.map((team) => (
          <div
            style={{ width: "200px" }}
            className={styles.bracket}
            key={team._id}
          >
            <h3 onClick={() => handleGetTeam(team)}>{team.teamName}</h3>
            <PlayerName team={team} />
            {user?.name === "Admin" && (
              <>
                <button style={{ backgroundColor: "green" }}>Edit Team</button>
                <button onClick={() => handleDeleteTeam(team._id)}>
                  Delete
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default ViewTeams
