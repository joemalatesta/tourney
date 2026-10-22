
import * as playerService from "./playerService.js"

async function adjustPlayerStats(data) {
  console.log("Adjusting player stats:", data)

  // Team-match objects contain match1, match2, and match3.
  // Player statistics are updated when each individual match completes.
  if (data?.match1 || data?.match2 || data?.match3) {
    console.log(
      "Team match received. Individual match completion handles player stats."
    )
    return
  }

  // Individual match validation.
  if (!data?.player1 || !data?.player2) {
    throw new Error(
      "Match is missing player1 or player2."
    )
  }

  if (!data.winningPlayer || !data.losingPlayer) {
    throw new Error(
      "Match is missing the winning player or losing player."
    )
  }

  const player1 = data.player1
  const player2 = data.player2

  const player1Id = String(player1._id ?? player1)
  const player2Id = String(player2._id ?? player2)
  const winnerId = String(data.winningPlayer)
  const loserId = String(data.losingPlayer)

  if (
    ![player1Id, player2Id].includes(winnerId) ||
    ![player1Id, player2Id].includes(loserId) ||
    winnerId === loserId
  ) {
    throw new Error(
      "The winner and loser must be different players in this match."
    )
  }

  const player1Wins = Array.isArray(data.player1WinsHome)
    ? data.player1WinsHome
    : []

  const player2Wins = Array.isArray(data.player2WinsHome)
    ? data.player2WinsHome
    : []

  const countWins = (results) =>
    results.filter((won) => won === true).length

  const player1GamesWon = countWins(player1Wins)
  const player2GamesWon = countWins(player2Wins)

  const winner = winnerId === player1Id ? player1 : player2
  const loser = loserId === player1Id ? player1 : player2

  const winnerGamesWon =
    winnerId === player1Id
      ? player1GamesWon
      : player2GamesWon

  const winnerGamesLost =
    winnerId === player1Id
      ? player2GamesWon
      : player1GamesWon

  const loserGamesWon =
    loserId === player1Id
      ? player1GamesWon
      : player2GamesWon

  const loserGamesLost =
    loserId === player1Id
      ? player2GamesWon
      : player1GamesWon

  const updatedWinner = {
    ...winner,
    rank: Number(winner.rank || 0) + 1,
    matchesPlayed: Number(winner.matchesPlayed || 0) + 1,
    matchWin: Number(winner.matchWin || 0) + 1,
    gamesWon:
      Number(winner.gamesWon || 0) + winnerGamesWon,
    gamesLoss:
      Number(winner.gamesLoss || 0) + winnerGamesLost,
  }

  const updatedLoser = {
    ...loser,
    rank: Number(loser.rank || 0) - 1,
    matchesPlayed: Number(loser.matchesPlayed || 0) + 1,
    matchLoss: Number(loser.matchLoss || 0) + 1,
    gamesWon:
      Number(loser.gamesWon || 0) + loserGamesWon,
    gamesLoss:
      Number(loser.gamesLoss || 0) + loserGamesLost,
  }

  console.log("Updating winner:", winnerId)
  console.log("Updating loser:", loserId)

  const [winnerResult, loserResult] = await Promise.all([
    playerService.update(updatedWinner),
    playerService.update(updatedLoser),
  ])

  console.log("Player statistics updated successfully.")

  return {
    winner: winnerResult,
    loser: loserResult,
  }
}

export { adjustPlayerStats }
