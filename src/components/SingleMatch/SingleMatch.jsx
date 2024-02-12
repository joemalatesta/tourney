import { useState, useEffect } from "react"
import SingleMatchPlayerLine from "./SingleMatchPlayerLine"
import * as gameService from "../../services/gameService"

const SingleMatch = (props) => {
  const [gamesNeeded, setGamesNeeded] = useState()
  const [
    updatedPlayerStateWithMatchCount,
    setUpdatedPlayerStateWithMatchCount,
  ] = useState(props.match)

  useEffect(() => {
    console.log(updatedPlayerStateWithMatchCount)
    console.log(props.match)
  }, [updatedPlayerStateWithMatchCount])

  useEffect(() => {
    const getGameRace = async () => {
      try {
        if (props.match !== undefined) {
          const data = await gameService.getGameRace(
            props.match[0],
            props.match[1]
          )
          setGamesNeeded(data)
        }
      } catch (error) {
        console.error("Error fetching game race:", error)
      }
    }
    getGameRace()
  }, [props.match])

  useEffect(() => {
    const addGamesNeeded = async () => {
      try {
        if (props.match && gamesNeeded && gamesNeeded.length >= 2) {
          setUpdatedPlayerStateWithMatchCount((prevPlayerInfo) => {
            console.log("prevPlayerInfo:", prevPlayerInfo)
            console.log("gamesNeeded[0]:", gamesNeeded[0])
            console.log("gamesNeeded[1]:", gamesNeeded[1])
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
  }, [props.match, gamesNeeded])

  return (
    <>
      <div className="bracket">
        {updatedPlayerStateWithMatchCount?.map((player, idx) => (
          <SingleMatchPlayerLine player={player} key={idx} />
        ))}
      </div>
    </>
  )
}

export default SingleMatch
