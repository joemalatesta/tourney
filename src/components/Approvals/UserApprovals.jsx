import { useState, useRef } from "react"

const UserApprovals = ({ profiles, handleUpdateProfiles }) => {
  const formElement = useRef()
  const [highlighted, setHighlighted] = useState("rgb(235, 230, 140")
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    accessLevel: "",
    approved: true,
    email: "",
  })

  const filteredNames = profiles?.filter((el) => el.approved === false)
  const filteredApprovedNames = profiles?.filter((el) => el.approved === true)
  const handleEditProfile = async (editedPlayerData) => {
    await handleUpdateProfiles(editedPlayerData)
  }

  const handleChangeProfile = (profile) => {
    setHighlighted(profile._id)
    const updatedProfile = {
      ...profile,
      accessLevel: profile.accessLevel,
    }
    setFormData(updatedProfile)
  }

  const handleChange = (evt) => {
    setFormData({
      ...formData,
      [evt.target.name]: evt.target.value,
      approved: true,
    })
  }

  const handleSubmit = async (evt) => {
    evt.preventDefault()
    await handleEditProfile(formData)
    setFormData({
      firstName: "",
      lastName: "",
      accessLevel: "",
      approved: "",
      email: "",
    })
    setHighlighted(null)
    console.log("Submitted Form Data", formData)
  }

  const grabAccessLevel = (lvl) => {
    if (lvl === 90) return "Admin"
    if (lvl === 70) return "Score Admin"
    if (lvl === 50) return "Team Captain"
    if (lvl === 40) return "Assist Captain"
    if (lvl === 30) return "Player"
    if (lvl === 10) return "Not Approved"
  }

  const checkHighlighted = (profileId) => {
    return highlighted === profileId ? "red" : "rgb(235, 230, 140)"
  }
  return (
    <>
      <div className="bracket">
        <h2 className="center">Access Levels</h2>
        <div className="center">
          Admin - Has ability to change anything on the page.
          <br />
          Score Admin - Has ability to approve matches, adjust player info.
          <br />
          Team Captain - Has ability to finalize matches.
          <br />
          Assistant Captain - Has ability to submit matches.
          <br />
          Player - Has ability to see teams, and matches.
          <br />
          Not Approved - Cannot view any pages.
          <br />
        </div>
        <h3 className="center">Awaiting Approval</h3>
        <div className="column center">
          <form autoComplete="off" ref={formElement} onSubmit={handleSubmit}>
            <div>
              <br />
              <label>Access Level</label>
              <br />
              <div
                type="text"
                name="accessLevel"
                value={formData.accessLevel}
                id="accessLevel"
                onChange={handleChange}
                required
              >
                <select name="accessLevel" id="accessLevel">
                  <option> Pick access level</option>
                  <option value="90">Admin</option>
                  <option value="70">Score Admin</option>
                  <option value="50">Captain</option>
                  <option value="40">Assistant Captain</option>
                  <option value="30">Player</option>
                  <option value="10">Not Authorized</option>
                </select>
              </div>
            </div>
            <div>
              <button type="submit">Submit Change</button>
            </div>
          </form>
          <div className="bracket column">
            Not Approved :
            {filteredNames?.length ? (
              filteredNames?.map((profile) => (
                <li
                  style={{ color: checkHighlighted(profile._id) }}
                  onClick={() => handleChangeProfile(profile)}
                  key={profile._id}
                >
                  Name: {profile.firstName} {profile.lastName} -{" "}
                  {grabAccessLevel(profile.accessLevel)}
                </li>
              ))
            ) : (
              <h3>No people here</h3>
            )}
            <br />
            Approved Players :
            {filteredApprovedNames?.length ? (
              filteredApprovedNames?.map((profile) => (
                <li
                  style={{ color: checkHighlighted(profile._id) }}
                  onClick={() => handleChangeProfile(profile)}
                  key={profile._id}
                >
                  Name: {profile.firstName} {profile.lastName} -{" "}
                  {grabAccessLevel(profile.accessLevel)}
                </li>
              ))
            ) : (
              <h3>No people here</h3>
            )}
          </div>
          <br />
        </div>
      </div>
    </>
  )
}

export default UserApprovals
