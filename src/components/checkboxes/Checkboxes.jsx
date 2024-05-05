import { useState, useEffect } from "react"

const Checkboxes = ({
  player,
  profile,
  handleWinner,
  // handleWonGame,
  handleSaveMatch,
  playerWins,
}) => {
  const [checkboxes, setCheckboxes] = useState([])
  const [checkedCheckboxes, setCheckedCheckboxes] = useState([])
  const [isDisabled, setIsDisabled] = useState(true)

  useEffect(() => {
    let arr = []
    for(let i = 0; i< player?.games; i++ ){
      arr.push(false)
    }
    setCheckedCheckboxes(arr)
  }, [playerWins, player.games])

  useEffect(() => {
    if (checkedCheckboxes.every((value) => value === true)) {
      setIsDisabled(true)
    } else {
      setIsDisabled(false)
    }
  }, [checkedCheckboxes])

  useEffect(() => {
    if (playerWins?.length > 0) {
      setCheckedCheckboxes([...playerWins])
    } 
  }, [playerWins, player?.games]); 

  const handleCheckboxChange = (index) => {
    setCheckedCheckboxes((prev) => {
      const newChecked = [...prev]
      newChecked[index] = !newChecked[index]
      return newChecked
    })
  }

  console.log(checkedCheckboxes);

  useEffect(() => {
    const getCheckboxes = () => {
      const checkboxesArray = []
      for (let i = 0; i < (player?.games || 0); i++) {
        const isChecked = checkedCheckboxes[i]
        checkboxesArray.push(
          <div
            key={`${player._id}-checkbox-${i}`}
            onClick={() => handleCheckboxChange(i)}
          >
            <div
              id={`${player._id}-checkbox-${i}`}
              style={{
                display: 'flex',
                width: "50px",
                height: "50px",
                border: "5px solid white",
                padding: "5px",
                backgroundColor: isChecked ? "black" : "",
                backgroundImage: isChecked ? "url(/9ball.png)" : "",
                backgroundSize: "cover",
                fontSize: "50px",
                fontWeight: "bolder",
                alignContent: "center",
                alignItems: "center",
                justifyContent: "center",
                justifyItems: "center",
                backgroundPosition: 'center'
              }}
            >
            </div>
          </div>
        )
      }
      setCheckboxes(checkboxesArray)
    }

    getCheckboxes()
  }, [player, checkedCheckboxes])

  return (
    <>
      {checkboxes}
      {profile.accessLevel >= 40 && isDisabled && (
        <button
          onClick={() => {
            handleWinner(player)
            handleSaveMatch()
          }}
        >
          Winner
        </button>
      )}
    </>
  )
}

export default Checkboxes
