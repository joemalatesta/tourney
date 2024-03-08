import { useState, useRef } from "react"

const Approvals = ({profiles, handleUpdateProfiles}) => {
  const formElement = useRef()
  
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
    console.log(profile)
    const updatedProfile = {
      ...profile,
      accessLevel: profile.accessLevel,
    }
    setFormData(updatedProfile)
  }

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value, approved: true })
  }

  const handleSubmit = async (evt) => {
    evt.preventDefault()
    await handleEditProfile(formData)
    console.log(formData)
    setFormData({firstName: "",
    lastName: "",
    accessLevel: "",
    approved: "",
    email: ""})
  }
 
  const grabAccessLevel = (lvl) => {
    if(lvl === 90) return "Admin"
    if(lvl === 70) return "Validator"
    if(lvl === 50) return "Team Captain"
    if(lvl === 40) return "Assist Captain"
    if(lvl === 30) return "Player"
    if(lvl === 10) return "Not Approved"
  }

  return (
    <>
    <div className="bracket">
      <h2>Access Levels</h2>
          Admin = 90<br/>
          Validator = 70<br/>
          Team Captain = 50<br/>
          Assistant Captain = 40<br/>
          Player = 30<br/>
          Not Approved = 10<br/>
    </div>
      <h1>Awaiting Approval</h1>
      <form autoComplete="off" ref={formElement} onSubmit={handleSubmit}>
        <div>
          <br/>
          <label>Access Level</label>
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
      {filteredNames?.length ?
      filteredNames?.map((profile) => (
        <li onClick={() => handleChangeProfile(profile)} key={profile._id}>
          Name:  {profile.firstName} {profile.lastName}  Access Number: {profile.accessLevel} - {grabAccessLevel(profile.accessLevel)}
        </li>
      ))
      :
       <h2>No people here</h2> 
      }
    </>
  )
}

export default Approvals
