import { useState, useEffect, useRef } from "react"

import * as profileService from '../../services/profileService'

const Approvals = () => {
  const formElement = useRef()
  const [profiles, setProfiles] = useState()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    accessLevel: '',
    approved: '',
    email:'',
  })
  
  const filteredNames = profiles?.filter((el)=> el.approved === false )

  const handleEditProfile = async (editedPlayerData) => {
    console.log(formData);
    await profileService.update(editedPlayerData)
   
  }

  useEffect(() => {
    const fetchProfiles = async () => {
      const data = await profileService.getAllProfiles()
      setProfiles(data)
    }
    fetchProfiles()
  }, [])

  const handleChangeProfile = (profile) => {
    console.log(profile);
    const updatedProfile = {
      ...profile, 
      accessLevel: profile.accessLevel,
      approved: profile.approved,
    }
    setFormData(updatedProfile)
  }

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value })
  }


  const handleSubmit = (evt) => {
    evt.preventDefault()
    handleEditProfile(formData)
    console.log(formData);
  }

  return (
    <>
      <form
        autoComplete="off"
        ref={formElement}
        onSubmit={handleSubmit}
      >
   
           <div>
          <label>
            Access Level
          </label>
          <input
            type="text"
            name="accessLevel"
            value={formData.accessLevel}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Approved? </label>
          <input
            type="text"
            name="approved"
            value={formData.approved}
            onChange={handleChange}
          />
        </div>
        <div>
          <button type="submit">Submit Change
          </button>
        </div>
      </form>
    <h1>Awaiting Approval</h1>
    {filteredNames?.map(profile => (
      <li onClick={()=>handleChangeProfile(profile)} key={profile._id}>{profile.firstName} {profile.lastName}
      </li>
    ))}
    </>
  )
}
 
export default Approvals