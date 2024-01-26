import Checkboxes from "../checkboxes/Checkboxes"

const SingleMatchPlayerLine = ({ player, user, isHidden, setIsHidden, handleHideWinnerCheckbox }) => {
  if(player.value == 'undefined'){
    player = {
      _id: Math.random(),
      name: 'Bye',
      rank: 0
    }
  } 
  return (
    <div className="flex">
      <div className="flex start bracket match-width2 match-height2 red-felt" >
        {player !== null &&
          <div>
            <div className="start flex">
              {player?.name}
              ({player?.rank}) 
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
              onChange={()=>{handleHideWinnerCheckbox()}} 
              type="checkbox" 
            />
          </div>
        }
    </div>
  )
}

export default SingleMatchPlayerLine