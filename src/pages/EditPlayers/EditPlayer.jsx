import { useState, useRef, useEffect } from "react";

const EditPlayer = (props) => {
  const formElement = useRef();
  const playerNameInput = useRef();

  const [validForm, setValidForm] = useState(false);
  const [title, setTitle] = useState("Add Player");
  const [isFormVisible, setIsFormVisible] = useState(false);

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
  };

  const [formData, setFormData] = useState(emptyPlayer);

  // Validate form whenever formData changes
  useEffect(() => {
    if (!formElement.current) return;
    setValidForm(formElement.current.checkValidity());
  }, [formData]);

  // Handle form input changes (including checkbox)
  const handleChange = (evt) => {
    const { name, type, checked, value } = evt.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Submit handler for add/edit
  const handleSubmit = (evt) => {
    evt.preventDefault();

    if (title === "Add Player") {
      props.handleAddPlayer(formData);
    } else if (title === "Edit Player") {
      props.handleEditPlayer(formData);
    }

    // Clear form, hide after submit
    setFormData(emptyPlayer);
    setTitle("Add Player");
    setIsFormVisible(false);
  };

  // Called when edit button is clicked — shows form with selected player data
  const startEditing = (player) => {
    setFormData(player);
    setTitle("Edit Player");
    setIsFormVisible(true);
    playerNameInput.current?.focus();
  };

  return (
    <div style={{ display: "flex", gap: "2rem" }}>
      
      <div className="bracket green-felt">
        <h2>Players</h2>
        <ul>
          {props.players.map((player) => (
            <li key={player._id || player.nameFirst + player.nameLast}>
              {player.nameFirst} {player.name} (Rank: {player.rank}){" "}
              <button onClick={() => startEditing(player)}>Edit</button>
            </li>
          ))}
        </ul>
      </div>
      {isFormVisible && (
        <form className="bracket h350 red-felt" ref={formElement} onSubmit={handleSubmit} noValidate>
          <h2>{title}</h2>

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
            {title}
          </button>
          <button
            type="button"
            onClick={() => {
              setIsFormVisible(false);
              setFormData(emptyPlayer);
              setTitle("Add Player");
            }}
          >
            Cancel
          </button>
        </form>
      )}
    </div>
  );
};

export default EditPlayer;
