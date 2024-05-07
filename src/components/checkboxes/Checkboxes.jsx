import { useState, useEffect } from "react"
import * as matchService from "../../services/matchService"

const Checkboxes = ({
  player,
  profile,
  handleWinner,
  player1Wins,
  player2Wins,
  match,
  playerInfo,
}) => {
  const [checkboxes, setCheckboxes] = useState([])
  const [checkedCheckboxes, setCheckedCheckboxes] = useState([])
  const [isDisabled, setIsDisabled] = useState(true)

  useEffect(() => {
    updateDB()
  }, [checkedCheckboxes])

  useEffect(() => {
    let arr = []
    for (let i = 0; i < player?.games; i++) {
      arr.push(false)
    }
    setCheckedCheckboxes(arr)
  }, [player1Wins, player.games, player2Wins])

  console.log(checkboxes)
  console.log(checkedCheckboxes)

  const checkForWin = () => {
    if (checkedCheckboxes.every((value) => value === true)) {
      setIsDisabled(true)
    } else {
      setIsDisabled(false)
    }
  }

  useEffect(() => {
    if(playerInfo === 'player1'){
      if (player1Wins?.length > 0) {
        setCheckedCheckboxes([...player1Wins])
      }
    }
    if(playerInfo === 'player2'){
      if (player2Wins?.length > 0) {
        setCheckedCheckboxes([...player2Wins])
      }
    }
  }, [player1Wins, player?.games, player2Wins])

  const handleCheckboxChange = async (index) => {
    setCheckedCheckboxes((prev) => {
      const newChecked = [...prev]
      newChecked[index] = !newChecked[index]
      return newChecked
    })
    await updateDB()
  }

  useEffect(() => {
    const getCheckboxes = async () => {
      const checkboxesArray = []
      for (let i = 0; i < (player?.games || 0); i++) {
        const isChecked = await checkedCheckboxes[i]
        await checkboxesArray.push(
          <div
            key={`${player._id}-checkbox-${i}`}
            onClick={() => handleCheckboxChange(i)}
          >
            <div
              id={`${player._id}-checkbox-${i}`}
              className="poolballs"
              style={{
                backgroundColor: isChecked ? "black" : "",
                backgroundImage: isChecked ? "url(/9ball.png)" : "",
              }}
            ></div>
          </div>
        )
      }
      await setCheckboxes(checkboxesArray)
    }

    getCheckboxes()
    checkForWin()
  }, [player, checkedCheckboxes])

  const updateDB = async () => {
    if (playerInfo === "player1") {
      let data = await {
        ...match,
        player1Wins: checkedCheckboxes,
      }
      await matchService.update(data)
    }
    if (playerInfo === "player2") {
      let data = {
        ...match,
        player2Wins: checkedCheckboxes,
      }
      matchService.update(data)
    }
  }

  return (
    <>
      {checkboxes}
      {profile.accessLevel >= 40 && isDisabled && (
        <button
          onClick={() => {
            handleWinner(player)
          }}
        >
          Winner
        </button>
      )}
    </>
  )
}

export default Checkboxes
