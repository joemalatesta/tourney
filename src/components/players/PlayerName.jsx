import { useEffect, useState } from "react"

import * as playerService from "../../services/playerService"

const PlayerName = ({ team }) => {
  const [playerInfo, setPlayerInfo] = useState()
  const sortedPlayers = playerInfo
    ?.slice()
    .sort((a, b) => a?.name.localeCompare(b.name))

  useEffect(() => {
    const getPlayerStats = async () => {
      try {
        const data = await Promise.all(
          team.teamPlayers?.map((player) =>
            player === undefined ? player : playerService.findOne(player)
          )
        )
        setPlayerInfo(data)
      } catch (error) {
        console.error("Error fetching player stats:", error)
      }
    }
    getPlayerStats()
  }, [team.teamPlayers])

  return (
    <>
      <div>
        <span style={{ color: "antiquewhite" }}>Captain - </span>{" "}
        {team.teamCaptain}
        {sortedPlayers?.map(
          (player) =>
            player?.name !== team.teamCaptain && (
              <li key={player?._id}>{player?.name}</li>
            )
        )}
      </div>
    </>
  )
}

export default PlayerName
