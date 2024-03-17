import { useState, useEffect } from "react"

import * as profileService from "../../services/profileService"

const Profiles = () => {
  const [profiles, setProfiles] = useState([])

  useEffect(() => {
    const fetchProfiles = async () => {
      const profileData = await profileService.getAllProfiles()
      setProfiles(profileData)
    }
    fetchProfiles()
  }, [])

  if (!profiles.length) {
    return (
      <main>
        <h1>Loading...</h1>
      </main>
    )
  }

  const grabAccessLevel = (lvl) => {
    if (lvl === 90) return "Admin"
    if (lvl === 70) return "Validator"
    if (lvl === 50) return "Team Captain"
    if (lvl === 40) return "Assist Captain"
    if (lvl === 30) return "Player"
    if (lvl === 10) return "Not Approved"
  }

  return (
    <main>
      <h1>List Of Users</h1>
      {profiles.map((profile) => (
        <div className="bracket" key={profile._id}>
          <h3>
            Name: {profile.firstName} {profile.lastName} || Email:{" "}
            {profile.email2} || {grabAccessLevel(profile.accessLevel)}{" "}
          </h3>
        </div>
      ))}
    </main>
  )
}

export default Profiles
