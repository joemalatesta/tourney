import * as playerService from '../../services/playerService'
import { useEffect, useState } from 'react'

const PlayerName = ({team}) => {
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
  }, [])


  return (
    <>
      <div>
        {playerInfo?.map(player =>
          <li key={player._id}>{player.name}</li>
        )}
      </div>
    </>
  )
}

export default PlayerName
