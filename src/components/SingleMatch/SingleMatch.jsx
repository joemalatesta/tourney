import { useState, useEffect } from "react"
import SingleMatchPlayerLine from "./SingleMatchPlayerLine"
import * as gameService from "../../services/gameService"
import * as styles from './SingleMatch.module.css'

const SingleMatch = (props) => {
  const [match,  ] = useState(props.match)
  const [gamesNeeded, setGamesNeeded] = useState()
  const [
    updatedPlayerStateWithMatchCount,
    setUpdatedPlayerStateWithMatchCount,
  ] = useState(match)

  useEffect(() => {
    
  }, [match]);

  let order = gameService.getFirstPlayer(match)
  useEffect(() => {
    const getGameRace = async () => {
      try {
        if (order !== undefined) {
          const data = await gameService.getGameRace(
            match[0],
            match[1]
          )
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

  return (
    <>
      <div className={`${styles.greenFelt} ${styles.bracket}`}>
        {updatedPlayerStateWithMatchCount?.map((player, idx) => (
          <SingleMatchPlayerLine player={player} key={idx} />
        ))}
      </div>
    </>
  )
}

export default SingleMatch
