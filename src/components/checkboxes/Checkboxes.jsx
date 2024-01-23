import { useState, useEffect } from "react"

const Checkboxes = ({player, isHidden, setIsHidden}) => {
  const [checkboxes, setCheckboxes] = useState([])
 
  useEffect(() => {
    const getCheckboxes = () => {
      const checkboxesArray = []
      for (let i = 0; i < player?.games; i++) {
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
      {checkboxes}
      Winner <input 
        hidden={isHidden} 
        onChange={()=>{handleHideWinnerCheckbox()}} 
        type="checkbox" />
    </>
  )
}
 
export default Checkboxes;