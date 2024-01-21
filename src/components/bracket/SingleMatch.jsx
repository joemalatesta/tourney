import { useState } from 'react'
import * as gameService from '../../services/gameServices'
import SingleMatchPlayerLine from './SingleMatchPlayerLine'
const SingleMatch = (props) => {
  
  return (
    <>
      <div className="bracket">
        {props.match?.map((player)=>
          (player !== null &&
            <SingleMatchPlayerLine
            user={props.user}
            player={player}
            key={player}
            />
            )
            )}
      </div>
    </>
  )
  
}

export default SingleMatch;

// const [isHidden, setIsHidden] = useState(false)
// let match
// gameService.getFirstPlayer(props.match)
// let gamesNeededToWin = gameService.getGameRace(props?.match[0], props?.match[1])
// if(props.match[0] !== null && props.match[1] !== null ) {
//   match = [{...props?.match[0], gamesNeeded: gamesNeededToWin[0]}, {...props?.match[1], gamesNeeded: gamesNeededToWin[1]}]
// }
// const handleHideWinnerCheckbox = () => {
//   setIsHidden(true)
// }
// if(props.match[0] === null && props.match[1] === null ) return ''
// const handleAddWinnerToNextRound = (player) => {
//   props.handleRoundPlayers(player)
// }