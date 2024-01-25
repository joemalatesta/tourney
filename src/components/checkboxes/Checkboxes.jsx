import { useState, useEffect } from "react"

const Checkboxes = ({player}) => {
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



  return (  
    <>
      {checkboxes}
    </>
  )
}
 
export default Checkboxes;