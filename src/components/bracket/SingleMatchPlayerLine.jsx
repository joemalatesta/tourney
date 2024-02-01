import Checkboxes from "../checkboxes/Checkboxes"

const SingleMatchPlayerLine = ({ player, user, isHidden, setIsHidden, handleHideWinnerCheckbox, handleUpdateMatch, gameObj, roundId, setMatchDetails, roundIndex}) => {
  if(player?.value === 'undefined'){
    player = {
      _id: Math.random(),
      name: 'Awaiting Player',
      rank: 0
    }
  } 

  const handleAddWinnerToNextRound = () => {
    let idxNum = roundIndex.indexOf(player._id)
    let idx = Math.floor(idxNum / 2)
    setMatchDetails(prevGameObj => {
      const updatedGameObj = { ...prevGameObj }
      updatedGameObj.rounds[roundId + 1].splice(idx, 1, player._id)
      return updatedGameObj
    })
    handleUpdateMatch(gameObj)
  }

  return (
    <div className="flex">
      <div className="flex start bracket match-width2 match-height2 red-felt" >
        {player !== null &&
          <div>
            <div className="start flex">
              <div>
                {player !== undefined ?
                <>
                  <div>
                    {player?.name}
                  </div>
                  <div>
                    ({player?.rank})
                  </div>
                </>
                :
                <>
                  Awaiting Player
                </>
              }
              </div>
              <div className="flex">
                <Checkboxes
                  setIsHidden={setIsHidden}
                  player={player}
                  user={user}
                  isHidden={isHidden}
                  handleHideWinnerCheckbox={handleHideWinnerCheckbox}
                />
              </div>
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