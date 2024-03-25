import { useState, useEffect } from "react"
import axios from "axios"

function TeamDetails() {
  const [team, setTeam] = useState(null)

  useEffect(() => {
    axios
      .get("/api/team")
      .then((response) => {
        setTeam(response.data)
      })
      .catch((error) => {
        console.error("Error fetching team details:", error)
      })
  }, [])

  return (
    <div>
      {team && (
        <div>
          <h2>{team.teamName}</h2>
          <p>Team Captain: {team.teamCaptain}</p>
          <h3>Team Players:</h3>
          <ul>
            {team.teamPlayers.map((playerId) => (
              <li key={playerId}>{playerId}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default TeamDetails
