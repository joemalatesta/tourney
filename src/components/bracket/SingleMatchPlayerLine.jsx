import Checkboxes from "../checkboxes/Checkboxes"

const SingleMatchPlayerLine = ({ player, user, isHidden, setIsHidden, handleHideWinnerCheckbox, handleUpdateMatch, gameObj, roundId, setMatchDetails }) => {
  if(player?.value == 'undefined'){
    player = {
      _id: Math.random(),
      name: 'Bye',
      rank: 0
    }
  } 
  
  if(player?.value === 'null'){
    player = {
      _id: Math.random(),
      name: 'Awaiting Player',
      rank: 0
    }
  } 
  const handleAddWinnerToNextRound = () => {
    console.log(gameObj.rounds[roundId-1])
    // need to find the index of the player
    // then figure out where in the array they would be placed in the new array swapping out the null value in that position.

    gameObj.rounds[roundId].push(player._id)
    setMatchDetails(gameObj)
    handleUpdateMatch(gameObj)
  }

  

  return (
    <div className="flex">
      <div className="flex start bracket match-width2 match-height2 red-felt" >
        {player !== null &&
          <div>
            <div className="start flex">
              {player?.name}
               {player?.rank &&
                ((player?.rank))
              }
              <Checkboxes
                setIsHidden={setIsHidden}
                player={player}
                user={user}
                isHidden={isHidden}
                handleHideWinnerCheckbox={handleHideWinnerCheckbox}
              />
            </div>
          </div>
        }
      </div>
      {user?.name === 'Admin' && 
          <div className="end flex center ">
            Winner <input 
              hidden={isHidden} 
              onChange={()=>{
                handleHideWinnerCheckbox()
                handleAddWinnerToNextRound(player._id)
              }} 
              type="checkbox" 
            />
          </div>
        }
    </div>
  )
}

export default SingleMatchPlayerLine