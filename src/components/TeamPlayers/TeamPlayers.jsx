import { useState, useEffect } from "react"
import * as playerService from '../../services/playerService'

const TeamPlayers = ({team, handleChoosePlayer, title}) => {
  const [playerInfo, setPlayerInfo] = useState()

  useEffect(() => {
    const getPlayerStats = async () => {
      try {
        const data = await Promise.all(
          (team?.teamPlayers || []).filter(Boolean).map((player) =>
            playerService.findOne(player)
          )
        );
        setPlayerInfo(data);
      } catch (error) {
        console.error("Error fetching player stats:", error);
      }
    };
    getPlayerStats();
  }, [team]);

  return (
    <>
    <h3>Players</h3>
      {playerInfo?.map(player =>
      <div onClick={()=>handleChoosePlayer(player,title)} key={player._id}>
        {player.name} ({player.rank}) {player._id == team.teamCaptain ? '** Captain **' : ''}
      </div>  
      )}
    </>
  )
}
 
export default TeamPlayers
