
import * as teamService from "./teamService.js"

async function adjustTeamStats(data) {
  console.log("adjustTeamStats called:", data)

  if (!data?.homeTeam || !data?.awayTeam) {
    throw new Error("Team match is missing homeTeam or awayTeam.")
  }

  const matches = [
    {
      match: data.match1,
      completed: data.match1Completed,
    },
    {
      match: data.match2,
      completed: data.match2Completed,
    },
    {
      match: data.match3,
      completed: data.match3Completed,
    },
  ]

  const homePlayerIds = (data.homeTeam.teamPlayers || []).map(
    (player) => String(player?._id ?? player)
  )

  const awayPlayerIds = (data.awayTeam.teamPlayers || []).map(
    (player) => String(player?._id ?? player)
  )

  let homeWins = 0
  let awayWins = 0

  for (const { match, completed } of matches) {
    // Only count matches marked completed in both places.
    if (
      !match ||
      match.completed !== true ||
      completed !== true
    ) {
      continue
    }

    const winnerId = String(
      match.winningPlayer?._id ?? match.winningPlayer ?? ""
    )

    if (!winnerId) {
      console.warn(
        "Completed match has no winningPlayer:",
        match._id
      )
      continue
    }

    if (homePlayerIds.includes(winnerId)) {
      homeWins += 1
    } else if (awayPlayerIds.includes(winnerId)) {
      awayWins += 1
    } else {
      console.warn(
        "Winning player does not belong to either team:",
        winnerId
      )
    }
  }

  // Every individual match won by one team is a loss for the other.
  const homeLosses = awayWins
  const awayLosses = homeWins

  console.log("Team match totals:", {
    homeTeam: data.homeTeam.teamName,
    homeWins,
    homeLosses,
    awayTeam: data.awayTeam.teamName,
    awayWins,
    awayLosses,
  })

  if (homeWins + awayWins === 0) {
    console.log("No completed individual matches to count.")
    return {
      homeWins: 0,
      homeLosses: 0,
      awayWins: 0,
      awayLosses: 0,
    }
  }

  // Build the updated team records using the existing season totals.
  const updatedHomeTeam = {
    ...data.homeTeam,
    wins: Number(data.homeTeam.wins || 0) + homeWins,
    loss: Number(data.homeTeam.loss || 0) + homeLosses,
  }

  const updatedAwayTeam = {
    ...data.awayTeam,
    wins: Number(data.awayTeam.wins || 0) + awayWins,
    loss: Number(data.awayTeam.loss || 0) + awayLosses,
  }

  // Save both teams.
  const [homeResult, awayResult] = await Promise.all([
    teamService.update(updatedHomeTeam),
    teamService.update(updatedAwayTeam),
  ])

  console.log("Home team stats saved:", homeResult)
  console.log("Away team stats saved:", awayResult)

  return {
    homeTeam: data.homeTeam.teamName,
    awayTeam: data.awayTeam.teamName,
    homeWins,
    homeLosses,
    awayWins,
    awayLosses,
  }
}

export { adjustTeamStats }
