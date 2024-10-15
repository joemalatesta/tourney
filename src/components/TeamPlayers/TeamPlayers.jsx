import { useState, useEffect } from "react"
import * as playerService from "../../services/playerService"

const TeamPlayers = ({ team, handleChoosePlayer, title, matchPlayer, adjustedTeam }) => {
  const [playerInfo, setPlayerInfo] = useState()

  //! sorted by name
  // const sortedPlayers = playerInfo
  // ?.slice()
  // .sort((a, b) => a.name.localeCompare(b.name))

  // sorted by rank
  const sortedPlayers = adjustedTeam?.teamPlayers?.sort((a, b) => b.rank - a.rank)

  useEffect(() => {
    const getPlayerStats = async () => {
      try {
        const data = await Promise.all(
          (team?.teamPlayers || [])
            .filter(Boolean)
            .map((player) => playerService.findOne(player))
        )
        setPlayerInfo(data)
      } catch (error) {
        console.error("Error fetching player stats:", error)
      }
    }
    getPlayerStats()
  }, [team])

  return (
    <div className="green-felt margin">
      <h3>Players</h3>
      {sortedPlayers?.map((player) => (
        <div
          onClick={() => handleChoosePlayer(player._id, title)}
          key={player?._id}
        >
          <div>
            <span
              style={
                matchPlayer === player?._id ? { color: "black" } : {}
              }
            >
              {matchPlayer?._id === player?._id ? (
                <h2>
                  {player?.name} ({player?.rank})
                </h2>
              ) : (
                <p>
                  {player?.name} ({player?.rank})
                </p>
              )}
            </span>
            {player?._id == team?.teamCaptain ? "** Captain **" : ""}
          </div>
        </div>
      ))}
    </div>
  )
}

export default TeamPlayers
