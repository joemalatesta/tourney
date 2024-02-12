import { useState, useEffect } from "react"

const Checkboxes = ({ player }) => {
  console.log(player)
  const [checkboxes, setCheckboxes] = useState([])

  useEffect(() => {
    const getCheckboxes = () => {
      const checkboxesArray = []
      for (let i = 0; i < player?.games; i++) {
        checkboxesArray.push(
          <div key={`${player._id}-checkbox-${i}`}>
            <input
              id={Math.random()}
              type="checkbox"
              style={{ width: "50px", height: "50px" }}
            />
          </div>
        )
      }
      setCheckboxes(checkboxesArray)
    }
    getCheckboxes()
  }, [player])

  return <>{checkboxes}</>
}

export default Checkboxes
