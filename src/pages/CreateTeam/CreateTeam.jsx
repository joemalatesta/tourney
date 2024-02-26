import { useState, useEffect, useRef } from "react"
import ListOfPlayers from "../CreateMatch/ListOfPlayers"
import * as playerService from "../../services/playerService"
import { useNavigate } from "react-router-dom"

const CreateTeam = (props) => {
  const navigate = useNavigate()
  const [team, setTeam] = useState([])
  const [captain, setCaptain] = useState(null)
  const [players, setPlayers] = useState (props.players)
  const formElement = useRef()
  const [formData, setFormData] = useState({
    teamName: "",
    teamPlayers: [],
    teamCaptain: captain
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
    if(evt.target.name === 'teamCaptain') setFormData({ ...formData, teamCaptain: captain._id })
    else setFormData({ ...formData, [evt.target.name]: evt.target.value })
  }

  const addCaptain = (player) => {
    setCaptain(player)
    setFormData({...formData, teamCaptain: player._id})
  }

  const handleSubmit = async (evt) => {
    evt.preventDefault()
    if(team.length >0){
      setTeam(team)
      const updatedFormData = {
        ...formData,
        teamPlayers: team,
      }
      await props.handleAddTeam(updatedFormData)
      navigate("/view-teams")
    }
  }

  return (
    <main className="center bracket">
      <form autoComplete="off" ref={formElement} onSubmit={handleSubmit}>
        <label className="center">Team Name</label>
        <p>(must be unique)</p>
        <input
          className="center"
          type="text"
          name="teamName"
          value={formData.teamName}
          onChange={handleChange}
          required
        />
        <button type="submit">Create Team</button>
      </form>

      <section className="bracket flex" style={{ width: "600px" }}>
        <ListOfPlayers
          title="Available Players"
          players={players}
          handleAdd={handleAddPlayer}
        />
        <ListOfPlayers
          addCaptain={addCaptain}
          captain={captain}
          title="Assigned to Team"
          players={team}
          handleRemove={handleRemovePlayer}
        />
      </section>
    </main>
  )
}

export default CreateTeam