import { useState, useEffect } from 'react';
import SingleMatchPlayerLine from './SingleMatchPlayerLine'
import * as playerService from '../../services/playerService'
import * as gameService from '../../services/gameServices'

const SingleMatch = (props) => {
  const [gamesNeeded, setGamesNeeded]= useState()
  const [isHidden, setIsHidden] = useState(false)
  const [playerInfo, setPlayerInfo]= useState()
 
  
  console.log(gamesNeeded);
  useEffect(() => {
    const getPlayerStats=async()=>{
      let data = await Promise.all(props.match.map(player=>
        playerService.findOne(player)))
        data = gameService.getFirstPlayer(data)
        setPlayerInfo(data)
      }
      getPlayerStats()
    }, [props.match])
    
    useEffect(() => {
      const getGameRace = async () =>{
        let data = await gameService.getGameRace(playerInfo[0],playerInfo[1])
        setGamesNeeded(data)
      }
      getGameRace()
    }, [playerInfo])

  const handleHideWinnerCheckbox = () => {
    setIsHidden(true)
  }



  return (
    <>
      <div className="bracket">
        {playerInfo?.map((player,idx)=>
        
            <SingleMatchPlayerLine
              user={props.user}
              player={player}
              key={idx}
              gamesNeeded={gamesNeeded}
              setGamesNeeded={setGamesNeeded}
              isHidden={isHidden}
              handleHideWinnerCheckbox={handleHideWinnerCheckbox}
              setIsHidden={setIsHidden}
            />
            
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