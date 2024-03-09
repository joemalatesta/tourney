import { useState, useEffect } from "react"
import { confetti } from '../../services/confetti'

import SingleMatchPlayerLine from "./SingleMatchPlayerLine"

import * as gameService from "../../services/gameService"
import * as styles from "./SingleMatch.module.css"

const SingleMatch = (props) => {
  const [match] = useState(props.match)
  const [seeCheckboxes, setSeeCheckboxes] = useState(true)
  const [gamesNeeded, setGamesNeeded] = useState()
  const [
    updatedPlayerStateWithMatchCount,
    setUpdatedPlayerStateWithMatchCount,
  ] = useState(match)
  const [gameWinner, setGameWinner] = useState()
  const [gameLoser, setGameLoser] = useState()

  useEffect(() => {}, [match])
  useEffect(() => {}, [seeCheckboxes]);


  let order = gameService.getFirstPlayer(match)
  useEffect(() => {
    const getGameRace = async () => {
      try {
        if (order !== undefined) {
          const data = await gameService.getGameRace(match[0], match[1])
          setGamesNeeded(data)
        }
      } catch (error) {
        console.error("Error fetching game race:", error)
      }
    }
    getGameRace()
  }, [match])

  useEffect(() => {
    const addGamesNeeded = async () => {
      try {
        if (match && gamesNeeded && gamesNeeded.length >= 2) {
          setUpdatedPlayerStateWithMatchCount((prevPlayerInfo) => {
            if (
              prevPlayerInfo &&
              prevPlayerInfo.length &&
              prevPlayerInfo[0].games !== gamesNeeded[0] &&
              prevPlayerInfo[1].games !== gamesNeeded[1]
            ) {
              return [
                { ...prevPlayerInfo[0], games: gamesNeeded[0] },
                { ...prevPlayerInfo[1], games: gamesNeeded[1] },
              ]
            }
          })
        }
      } catch (error) {
        console.error("Error updating player state:", error)
      }
    }
    addGamesNeeded()
  }, [match, gamesNeeded])

  const handleLoser = async (winner) => {
    let loser = match.filter(loser => winner._id !== loser._id)
    setGameLoser(loser[0])
  }

  const handleWinner = async (winner) => {
    handleLoser(winner)
    await setGameWinner(winner)
    disableCheckboxes()
    confetti.start(5000)
  }

  const disableCheckboxes = () => {
    setSeeCheckboxes(!seeCheckboxes)
  }

  console.log(gameWinner, 'winner')
  console.log(gameLoser, "game Loser")

  return (
    <>
      <div className={`${styles.greenFelt} ${styles.bracket}`}>
        {updatedPlayerStateWithMatchCount?.map((player, idx) => (
          <SingleMatchPlayerLine 
            gameWinner={gameWinner}
            profile={props.profile}
            seeCheckboxes={seeCheckboxes} 
            handleWinner={handleWinner}
            player={player} 
            key={idx} />
        ))}
      </div>
    </>
  )
}

export default SingleMatch
