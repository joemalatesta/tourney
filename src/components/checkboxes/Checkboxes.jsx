import { useState, useEffect } from "react"

const Checkboxes = ({player}) => {
  const [checkboxes, setCheckboxes] = useState([])
  const [isHidden, setIsHidden] = useState(false)
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

  const handleHideWinnerCheckbox = () => {
    setIsHidden(true)
  }
 

  return (  
    <>
      Winner <input 
        hidden={isHidden} 
        onChange={()=>{handleHideWinnerCheckbox()}} 
        type="checkbox" />
    </>
  )
}
 
export default Checkboxes;