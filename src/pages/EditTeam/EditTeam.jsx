import { useState, useEffect } from "react"
import * as teamService from "../../services/teamService"

const EditTeam = (props) => {
  const [editForm, setEditForm] = useState(false)
  const [formData, setFormData] = useState({
    teamName: "",
    teamCaptain: "",
    wins: 0,
    loss: 0,
  })
  const [currentTeamId, setCurrentTeamId] = useState(null)

  useEffect(() => {
    if (currentTeamId) {
      const team = props.teams.find((team) => team._id === currentTeamId)
      if (team) {
        setFormData({ ...team })
      }
    }
  }, [currentTeamId, props.teams])

  const handleChange = (evt) => {
    const { name, value, type } = evt.target
    const newValue = type === "number" ? parseInt(value, 10) : value
    setFormData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }))
  }

  const calculateWinPercentage = (team) => {
    const totalMatches = team.wins + team.loss
    return totalMatches === 0 ? 0 : (team.wins / totalMatches) * 100
  }

  const sortedTeams = [...props.teams].sort(
    (a, b) => calculateWinPercentage(b) - calculateWinPercentage(a)
  )

  const teamEditInfo = (team) => {
    setCurrentTeamId(team._id)
    setEditForm(true)
  }

  const handleSave = async () => {
    try {
      await teamService.update(formData)
      console.log("Updated team:", formData)
      setEditForm(false)
      setCurrentTeamId(null)
      if (props.onUpdate) props.onUpdate()
    } catch (error) {
      console.error("Failed to update team:", error)
    }
  }

  const handleClose = () => {
    setEditForm(false)
    setCurrentTeamId(null)
  }

  return (
    <>
      <h2>
        {sortedTeams.map((el) => (
          <div key={el._id} className="bracket" style={{ width: 350 }}>
            <div onClick={() => teamEditInfo(el)}>
              {editForm && currentTeamId === el._id ? (
                <div className="edit-form">
                  <span className="close" onClick={handleClose}>
                    &times;
                  </span>
                  <h2>Edit {el.teamName}</h2>
                  <form>
                    <label>
                      Team Name:
                      <input
                        type="text"
                        name="teamName"
                        value={formData.teamName}
                        onChange={handleChange}
                      />
                    </label>
                    <br />
                    <label>
                      Team Captain:
                      <input
                        type="text"
                        name="teamCaptain"
                        value={formData.teamCaptain}
                        onChange={handleChange}
                      />
                    </label>
                    <br />
                    <label>
                      Wins:
                      <input
                        type="number"
                        name="wins"
                        value={formData.wins}
                        onChange={handleChange}
                      />
                    </label>
                    <br />
                    <label>
                      Losses:
                      <input
                        type="number"
                        name="loss"
                        value={formData.loss}
                        onChange={handleChange}
                      />
                    </label>
                    <br />
                    <button type="button" onClick={handleSave}>
                      Save
                    </button>
                  </form>
                </div>
              ) : (
                <>
                  {el.teamName}
                  <br />
                  Wins: {el.wins}
                  <br />
                  Losses: {el.loss}
                  <br />
                  Win %:{" "}
                  {isNaN(((el.wins / (el.wins + el.loss)) * 100).toFixed(2))
                    ? "0.00"
                    : ((el.wins / (el.wins + el.loss)) * 100).toFixed(2)}
                </>
              )}
            </div>
          </div>
        ))}
      </h2>
    </>
  )
}

export default EditTeam
