import { useState, useEffect } from "react"
import * as playerService from "../../services/playerService"
import * as gameService from "../../services/gameService"
import WinnerCheckbox from "../WinnerCheckbox/WinnerCheckbox"

const BracketView = (props) => {
  const [playerInfo, setPlayerInfo] = useState()

  useEffect(() => {
    const getPlayerStats = async () => {
      try {
        const data = await Promise.all(
          props?.match?.map((player) =>
            player === undefined ? player : playerService.findOne(player)
          )
        )
        const updatedPlayerInfo = gameService.getFirstPlayer(data)
        setPlayerInfo(updatedPlayerInfo)
      } catch (error) {
        console.error("Error fetching player stats:", error)
      }
    }
    getPlayerStats()
  }, [props.match])


  return (
    <>
      {playerInfo?.map((player, idx) =>
        player?.name === undefined ? (
          <div key={idx}>
            <div className="bracket">
              Awaiting Player
            </div>
          </div>
        ) : (
          <div key={idx}>
            <div className="bracket">
              {player.name} : {player.rank}
            </div>
            <WinnerCheckbox
              player={player}
            />
          </div>
        )
      )}
    </>
  )
}

export default BracketView
