
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

import ListOfPlayers from "../../components/players/ListOfPlayers"

import * as playerService from "../../services/playerService"
import * as styles from "./CreateTeam.module.css"

const CreateTeam = (props) => {
  const navigate = useNavigate()

  const [team, setTeam] = useState([])
  const [captain, setCaptain] = useState(null)

  const [players, setPlayers] = useState(
    Array.isArray(props.players) ? props.players : []
  )

  const [formData, setFormData] = useState({
    teamName: "",
    teamPlayers: [],
    teamCaptain: "",
  })

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const data = await playerService.index()

        if (Array.isArray(data)) {
          setPlayers(data)
        }
      } catch (error) {
        console.error("Failed to fetch players:", error)
      }
    }

    fetchPlayers()
  }, [])

  const handleAddPlayer = (player) => {
    setTeam((prevTeam) => [...prevTeam, player])

    setPlayers((prevPlayers) =>
      prevPlayers.filter((el) => el._id !== player._id)
    )
  }

  const handleRemovePlayer = (player) => {
    setTeam((prevTeam) =>
      prevTeam.filter((el) => el._id !== player._id)
    )

    setPlayers((prevPlayers) => [...prevPlayers, player])

    if (formData.teamCaptain === player._id) {
      setCaptain(null)

      setFormData((prevData) => ({
        ...prevData,
        teamCaptain: "",
      }))
    }
  }

  const handleChange = (evt) => {
    const { name, value } = evt.target

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const addCaptain = (player) => {
    setCaptain(`${player.nameFirst} ${player.nameLast}`)

    setFormData((prevData) => ({
      ...prevData,
      teamCaptain: player._id,
    }))
  }

  const handleSubmit = async (evt) => {
    evt.preventDefault()

    if (team.length === 0 || !formData.teamCaptain) {
      alert("Please select at least one player and a team captain.")
      return
    }

    const updatedFormData = {
      ...formData,
      teamPlayers: team,
    }

    try {
      await props.handleAddTeam(updatedFormData)
      navigate("/admin")
    } catch (error) {
      console.error("Failed to create team:", error)
    }
  }

  return (
    <main className={styles.bracket}>
      <form autoComplete="off" onSubmit={handleSubmit}>
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

      <section className={styles.flex}>
        <div
          className={`${styles.bracket} ${styles.greenFelt} ${styles.w300}`}
        >
          <ListOfPlayers
            title="Available Players"
            players={players}
            handleAdd={handleAddPlayer}
          />
        </div>

        <div
          className={`${styles.bracket} ${styles.greenFelt} ${styles.w300}`}
        >
          <ListOfPlayers
            addCaptain={addCaptain}
            captain={formData.teamCaptain}
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
