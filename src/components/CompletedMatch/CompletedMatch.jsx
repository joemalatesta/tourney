import { useEffect, useState } from "react"
import * as playerService from "../../services/playerService.js"

const CompletedMatch = ({ currentMatch }) => {
  const [winnerData, setWinnerData] = useState(null)
  const [loserData, setLoserData] = useState(null)

  useEffect(() => {
    const getPlayerData = async () => {
      try {
        if (!currentMatch?.winningPlayer || !currentMatch?.losingPlayer) {
          setWinnerData(null)
          setLoserData(null)
          return
        }

        const winnerId =
          typeof currentMatch.winningPlayer === "object"
            ? currentMatch.winningPlayer._id
            : currentMatch.winningPlayer

        const loserId =
          typeof currentMatch.losingPlayer === "object"
            ? currentMatch.losingPlayer._id
            : currentMatch.losingPlayer

        const [winner, loser] = await Promise.all([
          playerService.findOne(winnerId),
          playerService.findOne(loserId),
        ])

        setWinnerData(winner)
        setLoserData(loser)
      } catch (error) {
        console.error("Error loading completed match players:", error)
      }
    }

    getPlayerData()
  }, [currentMatch?.winningPlayer, currentMatch?.losingPlayer])

  const getPlayerName = (player) => {
    if (!player) return "Unknown player"
    return `${player.nameFirst || ""} ${player.nameLast || ""}`.trim()
  }

  return (
    <>
      <div>
        {getPlayerName(winnerData)} -- WINNER
      </div>

      <div>
        {getPlayerName(loserData)} -- LOSER
      </div>
    </>
  )
}

export default CompletedMatch