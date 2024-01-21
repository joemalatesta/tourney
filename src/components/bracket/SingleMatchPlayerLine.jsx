import { useEffect, useState } from "react"
import * as playerService from '../../services/playerService'
import Checkboxes from "../checkboxes/Checkboxes"
const SingleMatchPlayerLine = ({ player, user, isHidden, setIsHidden, handleHideWinnerCheckbox }) => {
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
          <div>
            {playerInfo?.name}
            ({playerInfo?.rank}) 
          </div>
        </>
        }
      </div>
          <div className="end center">
            <Checkboxes
              setIsHidden={setIsHidden}
              player={playerInfo}
              user={user}
              isHidden={isHidden}
              handleHideWinnerCheckbox={handleHideWinnerCheckbox}
            />
          </div>
    </div>
  )
}

export default SingleMatchPlayerLine