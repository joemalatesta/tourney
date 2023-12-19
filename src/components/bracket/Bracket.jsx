import { useState, useEffect } from "react";
import SingleMatch from './SingleMatch';
import * as gameService from '../../services/gameServices';

const Bracket = ({ playerObj, user, matches, round, setRound}) => {
  const getIndex = (searchedPlayer) => {
    return playerObj?.findIndex((player) => searchedPlayer?._id === player?._id)
  };

  const [roundFlattened, setRoundFlattened] = useState(round.flat())
  console.log('this is the round',round);
  console.log('this is the round flattened',roundFlattened);
  useEffect(() => {
    setRoundFlattened(round.flat())
    gameService.SplitIntoTuples(round)
  }, [round])

  
  const handleRoundPlayers = (player) => {
    const playerIdx = getIndex(player)
    const updatedRound = [...round]
   
    if (playerIdx >= 0) {
      
      const roundIndex = Math.floor(playerIdx / 4)
      const subRound = updatedRound[roundIndex]
     
      if (subRound?.includes(null)) {
        const nullIndex = subRound.indexOf(null);
        subRound[nullIndex] = player
        updatedRound[roundIndex] = subRound;
        setRound(updatedRound)
      }
    }
  }

  return (
    <>
      {matches?.map((match, idx) => (
        <SingleMatch
          round={round}
          user={user}
          match={match}
          playerObj={roundFlattened}
          key={idx}
          handleRoundPlayers={handleRoundPlayers}
        />
      ))}
    </>
  )
}

export default Bracket