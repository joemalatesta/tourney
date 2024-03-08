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

  return (
    <main>
      <h1>List Of Users</h1>
      {profiles.map((profile) => (
        <p className="bracket" key={profile._id}>
          <h3>Name: {profile.firstName} {profile.lastName} || Email: {profile.email2} || {profile.accessLevel} </h3>
        </p>
      ))}
    </main>
  )
}

export default Profiles
