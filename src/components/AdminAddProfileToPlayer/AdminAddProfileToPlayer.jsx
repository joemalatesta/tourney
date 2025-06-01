import { useState } from "react"
import * as playerService from "../../services/playerService"

function AdminConnectProfileToPlayer(props) {
  const [profile, setProfile] = useState({})
  const [playerId, setPlayerId] = useState("")

  const handleSubmit = async (event) => {
    event.preventDefault()
    const profileId = profile._id
    if (!playerId || !profileId) {
      console.error("Both player and profile must be selected")
      return
    }
    const playerData = {
      _id: playerId,
      profile: profileId,
    }
    console.log(playerData)
    playerService.update(playerData)
  }

  return (
    <div>
      <h2>Connect Profile to Player</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Profile:
          <select
            value={profile._id}
            onChange={(e) =>
              setProfile(
                props.profiles.find((profile) => profile._id === e.target.value)
              )
            }
          >
            <option value="">Select Profile</option>
            {props.profiles.map((profile) => (
              <option key={profile._id} value={profile._id}>
                {profile.firstName} {profile.lastName}
              </option>
            ))}
          </select>
        </label>
        <label>
          Player:
          <select
            value={playerId}
            onChange={(e) => setPlayerId(e.target.value)}
          >
            <option value="">Select Player</option>
            {props.players.map((player) => (
              <option key={player._id} value={player._id}>
                {player.nameFirst} {player.nameLast}
              </option>
            ))}
          </select>
        </label>
        <button type="submit">Connect Profile</button>
      </form>
    </div>
  )
}

export default AdminConnectProfileToPlayer
