import { useState, useRef, useEffect } from "react"

const EditPlayer = (props) => {
  const formElement = useRef()
  const playerNameInput = useRef()

  const [validForm, setValidForm] = useState(false)
  const [title, setTitle] = useState("Add Player")

  // Store which player is currently being edited (null = none)
  const [editingPlayerId, setEditingPlayerId] = useState(null)

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

  // formData will hold current player data for editing
  const [formData, setFormData] = useState(emptyPlayer)

  // Update form validation on formData change
  useEffect(() => {
    if (!formElement.current) return
    setValidForm(formElement.current.checkValidity())
  }, [formData])

  // Handle form input changes
  const handleChange = (evt) => {
    const { name, type, checked, value } = evt.target
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    })
  }

  // When user clicks Edit on a player
  const startEditing = (player) => {
    setFormData(player)
    setTitle("Edit Player")
    setEditingPlayerId(player._id || player.nameFirst + player.nameLast)
    // Focus after form shows
    setTimeout(() => playerNameInput.current?.focus(), 0)
  }

  // When submitting the form
  const handleSubmit = (evt) => {
    evt.preventDefault()

    if (title === "Add Player") {
      props.handleAddPlayer(formData)
    } else if (title === "Edit Player") {
      props.handleEditPlayer(formData)
    }

    // Clear form & close editing form
    setFormData(emptyPlayer)
    setTitle("Add Player")
    setEditingPlayerId(null)
  }

  // Cancel editing
  const cancelEdit = () => {
    setFormData(emptyPlayer)
    setTitle("Add Player")
    setEditingPlayerId(null)
  }

  return (
    <div className="bracket green-felt2">
      <h2>Players</h2>
      <ul>
        {props.players.map((player) => {
          const playerId = player._id || player.nameFirst + player.nameLast
          return (
            <li key={playerId} style={{ marginBottom: "1rem" }}>
              <strong>
                {player.nameFirst} {player.name} (Rank: {player.rank})
              </strong>{" "}
              <button onClick={() => startEditing(player)}>Edit</button>
              {/* Show form only under the player being edited */}
              {editingPlayerId === playerId && (
                <form
                  className="bracket h350 red-felt"
                  ref={formElement}
                  onSubmit={handleSubmit}
                  noValidate
                  style={{
                    marginTop: "1rem",
                    border: "1px solid #ccc",
                    padding: "1rem",
                  }}
                >
                  <h3>{title}</h3>
                  <label>
                    First Name:
                    <input
                      type="text"
                      name="nameFirst"
                      value={formData.nameFirst}
                      onChange={handleChange}
                      required
                      ref={playerNameInput}
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
                    Matches Played:
                    <input
                      type="number"
                      name="matchesPlayed"
                      min={0}
                      value={formData.matchesPlayed}
                      onChange={handleChange}
                    />
                  </label>
                  <br />
                  <label>
                    Match Wins:
                    <input
                      type="number"
                      name="matchWin"
                      min={0}
                      value={formData.matchWin}
                      onChange={handleChange}
                    />
                  </label>
                  <br />
                  <label>
                    Match Losses:
                    <input
                      type="number"
                      name="matchLoss"
                      min={0}
                      value={formData.matchLoss}
                      onChange={handleChange}
                    />
                  </label>
                  <br />
                  <label>
                    Games Won:
                    <input
                      type="number"
                      name="gamesWon"
                      min={0}
                      value={formData.gamesWon}
                      onChange={handleChange}
                    />
                  </label>
                  <br />
                  <label>
                    Games Lost:
                    <input
                      type="number"
                      name="gamesLoss"
                      min={0}
                      value={formData.gamesLoss}
                      onChange={handleChange}
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
                  <button type="submit" disabled={!validForm}>
                    Save
                  </button>{" "}
                  <button type="button" onClick={cancelEdit}>
                    Cancel
                  </button>
                </form>
              )}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default EditPlayer
