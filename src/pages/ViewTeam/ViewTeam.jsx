import * as playerService from '../../services/playerService'
import { useEffect, useState } from 'react'

const ViewTeam = (props) => {
  const [playerInfo, setPlayerInfo] = useState()


  useEffect(() => {
    const getPlayerStats = async () => {
      try {
        const data = await Promise.all(
          props?.team.teamPlayers?.map((player) =>
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

  console.log(props.team);
  return (
    <>
      <h1>{props.team.teamName}</h1>
      <h3>{playerInfo?.map(player=>
        <p key={player._id}>
          {player.name} ({player.rank}) {player._id === props.team.teamCaptain && '** Captain **'}
        </p>

      )}</h3>
    </>
  )
}
 
export default ViewTeam