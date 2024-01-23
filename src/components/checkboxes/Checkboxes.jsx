import { useState, useEffect } from "react"

const Checkboxes = ({player, isHidden, setIsHidden, user}) => {
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
      {user?.name === 'Admin' && 
        <div className="end flex center ">
          Winner <input 
            hidden={isHidden} 
            onChange={()=>{handleHideWinnerCheckbox()}} 
            type="checkbox" />
        </div>
      }
    </>
  )
}
 
export default Checkboxes;