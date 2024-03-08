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

  return (
    <>
      <form autoComplete="off" ref={formElement} onSubmit={handleSubmit}>
        <div>
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
      <h1>Awaiting Approval</h1>
      {filteredNames?.length ?
      filteredNames?.map((profile) => (
        <li onClick={() => handleChangeProfile(profile)} key={profile._id}>
          {profile.firstName} {profile.lastName}
        </li>
      ))
      :
       <h2>No people here</h2> 
      }
    </>
  )
}

export default Approvals
