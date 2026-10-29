
const CompletedMatch = ({ currentMatch }) => {
  if (!currentMatch) return null

  const getPlayerName = (player) => {
    if (!player) return "Unknown player"

    return `${player.nameFirst || ""} ${player.nameLast || ""}`.trim()
  }

  const getGamesWon = (playerId) => {
    const player1Id = currentMatch.player1?._id
    const player2Id = currentMatch.player2?._id

    if (String(playerId) === String(player1Id)) {
      return (currentMatch.player1WinsHome || []).filter(Boolean).length
    }

    if (String(playerId) === String(player2Id)) {
      return (currentMatch.player2WinsHome || []).filter(Boolean).length
    }

    return 0
  }

  const winnerId = currentMatch.winningPlayer
  const loserId = currentMatch.losingPlayer

  const winner =
    String(currentMatch.player1?._id) === String(winnerId)
      ? currentMatch.player1
      : String(currentMatch.player2?._id) === String(winnerId)
        ? currentMatch.player2
        : null

  const loser =
    String(currentMatch.player1?._id) === String(loserId)
      ? currentMatch.player1
      : String(currentMatch.player2?._id) === String(loserId)
        ? currentMatch.player2
        : null

  const winnerGames = getGamesWon(winnerId)
  const loserGames = getGamesWon(loserId)

  const moneyOwedTable = winnerGames + loserGames 

  return (
    <>
      <div>
        {getPlayerName(winner)} — Games Won: {winnerGames} — WINNER
      </div>

      <div>
        {getPlayerName(loser)} — Games Won: {loserGames} — LOSER
      </div>

      <div className="bracket blue-felt">
        ${moneyOwedTable * 0.25} per player is owed to the table.
      </div>
    </>
  )
}

export default CompletedMatch
