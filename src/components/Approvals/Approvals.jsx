import { useState, useRef } from "react"

const Approvals = ({profiles, handleUpdateProfiles}) => {
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

  const handleEditProfile = async (editedPlayerData) => {
    console.log(formData)
    await handleUpdateProfiles(editedPlayerData)
   
  }

  const handleChangeProfile = (profile) => {
    console.log(profile);
    setHighlighted(profile._id);
    const updatedProfile = {
      ...profile,
      accessLevel: profile.accessLevel,
    };
    setFormData(updatedProfile);
  };



  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value, approved: true })
  }

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    await handleEditProfile(formData);
    console.log(formData);
    setFormData({
      firstName: "",
      lastName: "",
      accessLevel: "",
      approved: "",
      email: "",
    });
    setHighlighted(null)
  };
 
  const grabAccessLevel = (lvl) => {
    if(lvl === 90) return "Admin"
    if(lvl === 70) return "Validator"
    if(lvl === 50) return "Team Captain"
    if(lvl === 40) return "Assist Captain"
    if(lvl === 30) return "Player"
    if(lvl === 10) return "Not Approved"
  }

  const checkHighlighted = (profileId) => {
    return highlighted === profileId ? "red" : "rgb(235, 230, 140)";
  };
  return (
    <>
    <div className="bracket">
      <h2 className="center">Access Levels</h2>
      <div className="center">

          Admin = 90<br/>
          Validator = 70<br/>
          Team Captain = 50<br/>
          Assistant Captain = 40<br/>
          Player = 30<br/>
          Not Approved = 10<br/>
      </div>
      <h3 className="center">Awaiting Approval</h3>
          <div className="column center">

      <form autoComplete="off" ref={formElement} onSubmit={handleSubmit}>
        <div>
          <br/>
          <label>Access Level</label>
          <br/>
          <input
            type="text"
            name="accessLevel"
            value={formData.accessLevel}
            onChange={handleChange}
            required
            />
        </div>
        <div>
          <button type="submit">Submit Change</button>
        </div>
      </form>
      <div className="column">
        {filteredNames?.length ? (
          filteredNames?.map((profile) => (
            <li
              style={{ color: checkHighlighted(profile._id) }}
              onClick={() => handleChangeProfile(profile)}
              key={profile._id}
            >
              Name: {profile.firstName} {profile.lastName} Access Number: {profile.accessLevel} - {grabAccessLevel(profile.accessLevel)}
            </li>
          ))
        ) : (
          <h3>No people here</h3>
        )}
      </div>
      <br/>
    </div>
    </div>
    </>
  )
}

export default Approvals
