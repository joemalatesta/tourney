import { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import ListOfPlayers from "../../components/players/ListOfPlayers"
import * as playerService from "../../services/playerService"
import * as styles from "./CreateTeam.module.css"

const CreateTeam = (props) => {
  const navigate = useNavigate()
  const [team, setTeam] = useState([])
  const [captain, setCaptain] = useState(null)
  const [players, setPlayers] = useState(props.players)
  const formElement = useRef()
  const [formData, setFormData] = useState({
    teamName: "",
    teamPlayers: [],
    teamCaptain: captain,
  })

  useEffect(() => {
    const fetchPlayers = async () => {
      const data = await playerService.index()
      setPlayers(data)
    }
    fetchPlayers()
  }, [])

  const handleAddPlayer = (player) => {
    setTeam([player, ...team])
    setPlayers(players.filter((el) => el._id !== player._id))
  }

  const handleRemovePlayer = (player) => {
    setTeam(team.filter((el) => el._id !== player._id))
    setPlayers([...players, player])
  }

  const handleChange = (evt) => {
    if (evt.target.name === "teamCaptain")
      setFormData({ ...formData, teamCaptain: captain._id })
    else setFormData({ ...formData, [evt.target.name]: evt.target.value })
  }

  const addCaptain = (player) => {
    setCaptain(player)
    setFormData({ ...formData, teamCaptain: player._id })
  }

  const handleSubmit = async (evt) => {
    evt.preventDefault()
    if (team.length > 0 && team.teamCaptain !== null) {
      setTeam(team)
      const updatedFormData = {
        ...formData,
        teamPlayers: team,
      }
      await props.handleAddTeam(updatedFormData)
      navigate("/view-teams")
    }
    else return <h1>select all players and captain</h1>
  }

  return (
    <main className={`${styles.bracket}`}>
      <form autoComplete="off" ref={formElement} onSubmit={handleSubmit}>
       <h2>Team Name</h2>
        <p>(must be unique)</p>
        <input
          className={styles.center}
          type="text"
          name="teamName"
          value={formData.teamName}
          onChange={handleChange}
          required
        />
        <button type="submit">Create Team</button>
      </form>

      <section className={`${styles.flex}`}>
        <div className={`${styles.bracket} ${styles.greenFelt} ${styles.w300}`}>
          <ListOfPlayers
            title="Available Players"
            players={players}
            handleAdd={handleAddPlayer}
          />
        </div>
        <div className={`${styles.bracket} ${styles.greenFelt} ${styles.w300}`}>
          <ListOfPlayers
            addCaptain={addCaptain}
            captain={captain}
            title="Assigned to Team"
            players={team}
            handleRemove={handleRemovePlayer}
          />
        </div>
      </section>
    </main>
  )
}

export default CreateTeam
