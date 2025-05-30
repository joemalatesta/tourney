import { useState, useRef, useEffect } from "react"

const EditPlayer = (props) => {
  const formElement = useRef()
  const playerNameInput = useRef()

  const [validForm, setValidForm] = useState(false)
  const [title, setTitle] = useState("Add Player")
  const [editingPlayerId, setEditingPlayerId] = useState(null)
  const [showOnlyActive, setShowOnlyActive] = useState(true)

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

  useEffect(() => {
    if (!formElement.current) return
    setValidForm(formElement.current.checkValidity())
  }, [formData])

  const handleChange = (evt) => {
    const { name, type, checked, value } = evt.target
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    })
  }

  const startEditing = (player) => {
    setFormData(player)
    setTitle("Edit Player")
    setEditingPlayerId(player._id)
    setTimeout(() => playerNameInput.current?.focus(), 0)
  }

  const handleSubmit = (evt) => {
    evt.preventDefault()
    if (title === "Add Player") {
      props.handleAddPlayer(formData)
    } else if (title === "Edit Player") {
      props.handleEditPlayer(formData)
    }

    setFormData(emptyPlayer)
    setTitle("Add Player")
    setEditingPlayerId(null)
  }

  const cancelEdit = () => {
    setFormData(emptyPlayer)
    setTitle("Add Player")
    setEditingPlayerId(null)
  }
  const makePlayernull = () => {
    setEditingPlayerId(null)
  }

  const filteredPlayers = [
    ...(showOnlyActive ? props.players.filter((p) => p.active) : props.players),
  ].sort((a, b) =>
    a.nameLast.toLowerCase().localeCompare(b.nameLast.toLowerCase())
  )

  return (
    <div className="bracket green-felt2">
      <h2>Players</h2>

      <button onClick={() => setShowOnlyActive(!showOnlyActive)}>
        {showOnlyActive ? "Show All Players" : "Show Active Players Only"}
      </button>

      <ul>
        {filteredPlayers.map((player) => {
          const playerId = player._id || player.nameFirst + player.nameLast
          return (
            <li key={playerId} style={{ marginBottom: "1rem" }}>
              <strong>
                {player.nameFirst} {player.nameLast} (Rank: {player.rank})
              </strong>{" "}
              <button onClick={() => startEditing(player)}>Edit</button>{" "}
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
                  <button
                    onClick={() => {
                      props.handleDeletePlayer(player._id)
                      makePlayernull()
                    }}
                  >
                    Delete
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
