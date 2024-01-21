import { useEffect, useState } from "react"
import * as playerService from '../../services/playerService'

const SingleMatchPlayerLine = ({player}) => {
  const [playerInfo, setPlayerInfo]= useState()

  useEffect(() => {
    const getPlayerStats=async()=>{
      let data = await playerService.findOne(player)
      setPlayerInfo(data)
    }
    getPlayerStats()
  }, [player]);

  console.log(playerInfo);
  return (
    <div className="flex">
      <div className="flex start bracket match-width2 match-height2 red-felt">
        {player !== null &&
        <>
          {playerInfo?.name}``
          ({playerInfo?.rank}) 
        </>
        }
      </div>
    </div>
  )
}

export default SingleMatchPlayerLine