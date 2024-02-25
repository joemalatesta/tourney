import { useState, useEffect } from "react"
import * as playerService from '../../services/playerService'

const TeamPlayers = ({team}) => {
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
  }, [team])

  console.log(playerInfo);


  return (
    <>
    <h3>Players</h3>
      {playerInfo?.map(player =>
      <div key={player._id}>
        {player.name} ({player.rank})
      </div>  
      )}
    </>
  )
}
 
export default TeamPlayers

