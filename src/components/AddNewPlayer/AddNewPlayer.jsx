import { useState } from "react"
import * as playerService from "../../services/playerService"
// playerService.create will add a new player


const AddNewPlayer = ({ handleAddPlayer }) => {
  const emptyPlayer = {
    nameFirst: "",
    nameLast: "",
    rank: 1,
    matchesPlayed: 0,
    matchWin: 0,
    matchLoss: 0,
    gamesWon: 0,
    gamesLoss: 0,
    active: false,
  }

  const [formData, setFormData] = useState(emptyPlayer)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (evt) => {
    const { name, value, type, checked } = evt.target

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : type === "number"
            ? value === ""
              ? ""
              : Number(value)
            : value,
    }))
  }

  
const handleSubmit = async (evt) => {
  evt.preventDefault()
  setError("")

  if (!formData.nameFirst.trim() || !formData.nameLast.trim()) {
    setError("Please enter the player's first and last name.")
    return
  }

  if (formData.rank === "" || formData.rank < 1) {
    setError("Rank must be at least 1.")
    return
  }

  try {
    setSaving(true)

    const newPlayer = {
      ...formData,
      nameFirst: formData.nameFirst.trim(),
      nameLast: formData.nameLast.trim(),
    }

    const savedPlayer = await playerService.create(newPlayer)

    // Update the parent component's player list, if provided.
    if (handleAddPlayer) {
      handleAddPlayer(savedPlayer)
    }

    setFormData({ ...emptyPlayer })
  } catch (err) {
    setError(err.message || "Unable to add player.")
  } finally {
    setSaving(false)
  }
}


  return (
    <div className="bracket green-felt2">
      <h2>Add New Player</h2>

      <form
        className="bracket h350 red-felt"
        onSubmit={handleSubmit}
      >
        <label>
          First Name:
          <input
            type="text"
            name="nameFirst"
            value={formData.nameFirst}
            onChange={handleChange}
            required
          />
        </label>

        <br />

        <label>
          Last Name:
          <input
            type="text"
            name="nameLast"
            value={formData.nameLast}
            onChange={handleChange}
            required
          />
        </label>

        <br />

        <label>
          Rank:
          <input
            type="number"
            name="rank"
            min={1}
            value={formData.rank}
            onChange={handleChange}
            required
          />
        </label>

        <br />

        <label>
          Active:
          <input
            type="checkbox"
            name="active"
            checked={formData.active}
            onChange={handleChange}
          />
        </label>

        <br />

        {error && <p role="alert">{error}</p>}

        <button type="submit" disabled={saving}>
          {saving ? "Adding Player..." : "Add Player"}
        </button>

        <button
          type="button"
          onClick={() => {
            setFormData(emptyPlayer)
            setError("")
          }}
          disabled={saving}
        >
          Clear
        </button>
      </form>
    </div>
  )
}

export default AddNewPlayer
