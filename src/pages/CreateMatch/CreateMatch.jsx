import { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"

import ListOfPlayers from "../../components/players/ListOfPlayers"

import * as playerService from "../../services/playerService"
import * as gameService from "../../services/gameService"
import * as styles from "./CreateMatch.module.css"

const CreateMatch = (props) => {
  const navigate = useNavigate()
  const formElement = useRef()
  const [match, setMatch] = useState([])
  const [formData, setFormData] = useState({
    name: "",
    gameType: "",
    matchPlayers: [],
    rounds: [],
    loserRounds: [],
    handicap: "",
  })
  const [players, setPlayers] = useState(props.players)

  useEffect(() => {
    const fetchPlayers = async () => {
      const data = await playerService.index()
      setPlayers(data)
    }
    fetchPlayers()
  }, [])

  const handleAdd = (player) => {
    setMatch([player, ...match])
    setPlayers(players.filter((el) => el._id !== player._id))
  }

  const handleRemove = (player) => {
    setMatch(match.filter((el) => el._id !== player._id))
    setPlayers([...players, player])
  }

  const handleChange = (evt) => {
    if (evt.target.name === "doubleElim") {
      const isDoubleElim = evt.target.value === "true"
      setFormData({ ...formData, doubleElim: isDoubleElim })
    } else if (evt.target.name === "handicap") {
      const isHandicap = evt.target.value === "true"
      setFormData({ ...formData, handicap: isHandicap })
    } else {
      setFormData({ ...formData, [evt.target.name]: evt.target.value })
    }
  }

  const addNullToRoundArray = (num) => {
    const roundsArray = [null]
    let nullsInSubarray = num
    while (num > 2) {
      nullsInSubarray = Math.min(num, Math.ceil(num / 2))
      roundsArray.push(Array(nullsInSubarray).fill(null))
      num -= nullsInSubarray
    }
    return roundsArray
  }

  const handleSubmit = async (evt) => {
    evt.preventDefault()
    if (match.length > 0) {
      setMatch(gameService.shufflePlayers(match))
      const updatedFormData = {
        ...formData,
        matchPlayers: match,
        rounds: addNullToRoundArray(match.length),
        loserRounds: addNullToRoundArray(match.length),
      }
      await props.handleAddMatch(updatedFormData)
      navigate("/view-tournaments")
    }
  }

  return (
    <main className="center bracket">
      <form autoComplete="off" ref={formElement} onSubmit={handleSubmit}>
        <label className="center">Tournament Name</label>
        <input
          className="center"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <div
          className="center"
          type="text"
          id="gameType"
          name="gameType"
          value={formData.gameType}
          onChange={handleChange}
          required
        >
          <select name="gameType" id="gameType">
            <option>Game (8-ball or 9-ball)</option>
            <option value="8-ball">8-ball</option>
            <option value="9-ball">9-ball</option>
          </select>
        </div>
        <div
          className="center"
          type=""
          id="doubleElim"
          name="doubleElim"
          value={formData.doubleElim}
          onChange={handleChange}
          required
        >
          {/* <select name="doubleElim" onChange={handleChange} id="doubleElim" required>
            <option>Double Elimination</option>
            <option value='true'>Yes</option>
            <option value="false">No</option>
          </select> */}
        </div>
        <div
          className="center"
          type=""
          id="handicap"
          name="handicap"
          value={formData.handicap}
          onChange={handleChange}
          required
        >
          <select
            name="handicap"
            onChange={handleChange}
            id="handicap"
            required
          >
            <option>Use Player Handicap?</option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>

        <button type="submit">Create</button>
      </form>

      <section className={styles.flex}>
        <div className={`${styles.greenFelt}`} style={{ width: "350px" }}>
          <ListOfPlayers
            title="Available Players"
            players={players}
            handleAdd={handleAdd}
          />
        </div>
        <div className={`${styles.greenFelt}`} style={{ width: "350px" }}>
          <ListOfPlayers
            title="Assigned to Match"
            players={match}
            handleRemove={handleRemove}
          />
        </div>
      </section>
    </main>
  )
}

export default CreateMatch
