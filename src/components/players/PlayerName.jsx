import { useEffect, useState } from "react"

import * as playerService from "../../services/playerService"

const PlayerName = ({ team }) => {
  const [playerInfo, setPlayerInfo] = useState()


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
        {playerInfo?.map(
          (player) => 
            player?._id === team?.teamCaptain && (
              <div key={player?._id}>{player.nameFirst} {player.nameLast}</div>
            )
        )}
        {playerInfo?.map(
          (player) =>
            player?._id !== team?.teamCaptain && (
              <li key={player?._id}>{player?.nameFirst} {player?.nameLast}</li>
            )
        )}
      </div>
    </>
  )
}

export default PlayerName
