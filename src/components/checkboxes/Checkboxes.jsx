import { useState, useEffect } from "react"

const Checkboxes = ({
  player,
  profile,
  handleWinner
}) => {
  const [checkboxes, setCheckboxes] = useState([])
  const [checkedCheckboxes, setCheckedCheckboxes] = useState([])
  const [isDisabled, setIsDisabled] = useState(false)
  useEffect(() => {
    setCheckedCheckboxes(Array.from({ length: player.games }, () => false))
  }, [player.games])

  useEffect(() => {
    const checkCheckboxes = () =>{
      if (checkedCheckboxes.every((el) => el === true)) setIsDisabled(!isDisabled)
    }
    checkCheckboxes()
  }, [checkedCheckboxes]);

  useEffect(() => {
    const getCheckboxes = () => {
      const checkboxesArray = []
      for (let i = 0; i < player?.games; i++) {
        checkboxesArray.push(
          <div key={`${player._id}-checkbox-${i}`}>
            <input
              id={`${player._id}-checkbox-${i}`}
              type="checkbox"
              style={{ width: "50px", height: "50px" }}
              onChange={() => handleCheckboxChange(i)}
            />
          </div>
        )
      }
      setCheckboxes(checkboxesArray)
    }

    getCheckboxes()
  }, [player, isDisabled])

  const handleCheckboxChange = (index) => {
    setCheckedCheckboxes((prevCheckboxes) =>
      prevCheckboxes.map((checkbox, i) => (i === index ? !checkbox : checkbox))
    )
  }

  return (
    <>
      {checkboxes}
      {profile.accessLevel >= 40 && isDisabled && (
        <button onClick={() => handleWinner(player)}>Winner</button>
      )}
    </>
  )
}

export default Checkboxes
