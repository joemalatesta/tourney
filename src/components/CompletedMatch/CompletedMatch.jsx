
const CompletedMatch = ({ currentMatch }) => {
  if (!currentMatch) return null

  const getPlayerName = (player) => {
    if (!player) return "Unknown player"

    return `${player.nameFirst || ""} ${player.nameLast || ""}`.trim()
  }

  const getPlayerGames = (playerId) => {
    const player1Id = currentMatch.player1?._id
    const player2Id = currentMatch.player2?._id

    if (String(playerId) === String(player1Id)) {
      const games = currentMatch.player1WinsHome || []

      return {
        won: games.filter(Boolean).length,
        needed: games.length,
      }
    }

    if (String(playerId) === String(player2Id)) {
      const games = currentMatch.player2WinsHome || []

      return {
        won: games.filter(Boolean).length,
        needed: games.length,
      }
    }

    return { won: 0, needed: 0 }
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

  const winnerGames = getPlayerGames(winnerId)
  const loserGames = getPlayerGames(loserId)

  const moneyOwedTable = winnerGames.won + loserGames.won

  return (
    <>
      <div>
        {getPlayerName(winner)} — Games Won: {winnerGames.won} of {" "}
        {winnerGames.needed} — WINNER
      </div>

      <div>
        {getPlayerName(loser)} — Games Won: {loserGames.won} of {" "}
        {loserGames.needed} — LOSER
      </div>

      <div className="bracket blue-felt">
        ${(moneyOwedTable * 0.25).toFixed(2)} per player is owed to the table.
      </div>
    </>
  )
}

export default CompletedMatch
