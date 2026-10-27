
import { useState, useEffect } from "react"

import * as profileService from "../../services/profileService"

const AdjustUserProfile = (props) => {
  const [formData, setFormData] = useState(props.profile || {})
  const [message, setMessage] = useState("")

  useEffect(() => {
    setFormData(props.profile || {})
  }, [props.profile])

  const handleChange = (evt) => {
    const { name, value } = evt.target

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = async (evt) => {
    evt.preventDefault()
    setMessage("")

    try {
      const updatedProfile = await profileService.update({
        ...formData,
        _id: props.profile._id,
      })

      if (updatedProfile.err) {
        console.error("Error updating profile:", updatedProfile.err)
        setMessage("Unable to update profile.")
        return
      }

      // Update the displayed information with the saved values.
      setFormData({
        ...formData,
        ...updatedProfile,
      })

      setMessage("Profile updated successfully!")
      console.log("Profile updated:", updatedProfile)
    } catch (error) {
      console.error("Error updating profile:", error)
      setMessage("An error occurred while updating your profile.")
    }
  }

  return (
    <>
      <h3>Current Profile</h3>

      <div>First Name: {formData.firstName}</div>
      <div>Last Name: {formData.lastName}</div>
      <div>Email: {formData.email2}</div>

      <hr />

      <form onSubmit={handleSubmit}>
        <label>
          First Name:
          <input
            type="text"
            name="firstName"
            value={formData.firstName || ""}
            onChange={handleChange}
            required
          />
        </label>

        <br />

        <label>
          Last Name:
          <input
            type="text"
            name="lastName"
            value={formData.lastName || ""}
            onChange={handleChange}
            required
          />
        </label>

        <br />

        <label>
          Email:
          <input
            type="email"
            name="email2"
            value={formData.email2 || ""}
            onChange={handleChange}
            required
          />
        </label>

        <br />

        <button type="submit">Submit Changes</button>
      </form>

      {message && <p>{message}</p>}
    </>
  )
}

export default AdjustUserProfile
