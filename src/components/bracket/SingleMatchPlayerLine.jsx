// import { useEffect, useState } from "react"
// import * as playerService from '../../services/playerService'
import Checkboxes from "../checkboxes/Checkboxes"
const SingleMatchPlayerLine = ({ player, user, isHidden, setIsHidden, handleHideWinnerCheckbox }) => {
  
  console.log(player);
  if(player.value == 'undefined'){
    player = {
      _id: Math.random(),
      name: 'Bye',
      rank: 0
    }
  } 

  return (
    <div className="flex">
      <div className="flex start bracket match-width2 match-height2 red-felt">
        {player !== null &&
        <>
          <div>
            {player?.name}
            ({player?.rank}) 
          </div>
        </>
        }
      </div>
          <div className="end center">
            <Checkboxes
              setIsHidden={setIsHidden}
              player={player}
              user={user}
              isHidden={isHidden}
              handleHideWinnerCheckbox={handleHideWinnerCheckbox}
            />
          </div>
    </div>
  )
}

export default SingleMatchPlayerLine