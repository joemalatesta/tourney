import { useState, useEffect } from "react"

const Checkboxes = ({player}) => {
  const [checkboxes, setCheckboxes] = useState([])
 
  // console.log(player);
  useEffect(() => {
    const getCheckboxes = () => {
      const checkboxesArray = []
      for (let i = 0; i < player?.games; i++) {
        checkboxesArray.push(
          <div key={`${player._id}-checkbox-${i}`}>
            <input type="checkbox" />
          </div>
        )}
      //   checkboxesArray.push(
      //     <div key={i}>
      //       <input type="checkbox" />
      //     </div>
      //   )
      // }
      // console.log(checkboxesArray);
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