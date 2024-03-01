import { useEffect, useState } from "react"

import * as playerService from "../../services/playerService"
import * as styles from "./ViewTeam.module.css"

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

  const sortedPlayers = playerInfo
  ?.slice()
  .sort((a, b) => a.name.localeCompare(b.name))


  return (
    <div className={`${styles.greenFelt} ${styles.bracket} ${styles.center}`}>
      <h1>{props.team.teamName}</h1>
      <h3 className={`${styles.bracket} ${styles.w75percent}`}>
        {sortedPlayers?.map((player) => (
          <p key={player._id}>
            
            {player.name === props.team.teamCaptain && <div style={{color:'antiquewhite'}}>** Captain **</div>}Name : {player.name}<br/>
            Rank : {player.rank} <br />
            Matches Played : {player.matchesPlayed}
          </p>
        ))}
      </h3>
    </div>
  )
}

export default ViewTeam
