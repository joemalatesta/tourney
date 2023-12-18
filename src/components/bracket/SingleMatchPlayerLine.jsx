import { useEffect, useState } from "react"

const SingleMatchPlayerLine = ({ player, user, isHidden, handleHideWinnerCheckbox, handleAddWinnerToNextRound }) => {
  const [checkboxes, setCheckboxes] = useState([])

  useEffect(() => {
    const getCheckboxes = () => {
      const checkboxesArray = []
      for (let i = 0; i < player?.gamesNeeded; i++) {
        checkboxesArray.push(
          <div key={i}>
            <input type="checkbox" />
          </div>
        )
      }
      setCheckboxes(checkboxesArray)
    }
    getCheckboxes()
  }, [player])

  return (
    <div className="flex">
      <div className="flex start bracket match-width2 match-height2 red-felt">
        {player !== null &&
        <>
          {player.name}
           ({player.rank})
           {checkboxes}
        </>
        }
      </div>
      <div className="end center">
        {user?.name === 'Admin' && 
        <div hidden={isHidden}>
          Winner <input hidden={isHidden} 
          onChange={()=>{
            handleHideWinnerCheckbox()
            handleAddWinnerToNextRound(player)}} 
            type="checkbox" />
        </div>
        
        }
        
      </div>
    </div>
  )
}

export default SingleMatchPlayerLine