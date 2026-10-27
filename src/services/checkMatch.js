
import * as matchService from "../services/matchService"

export async function checkMatch(matchId) {
  try {
    const match = await matchService.findOne(matchId)

    if (!match) return false

    const arrays = [
      match.player1WinsHome,
      match.player1WinsAway,
      match.player2WinsHome,
      match.player2WinsAway,
    ]

    // Each team must have saved its results before comparing.
    if (
      arrays.some(
        (arr) => !Array.isArray(arr) || arr.length === 0
      )
    ) {
      return false
    }

    // Compare arrays without considering the order of values.
    const arraysMatch = (home, away) => {
      if (home.length !== away.length) return false

      const sortedHome = [...home].sort((a, b) => a - b)
      const sortedAway = [...away].sort((a, b) => a - b)

      return sortedHome.every(
        (value, index) => value === sortedAway[index]
      )
    }

    return (
      arraysMatch(
        match.player1WinsHome,
        match.player1WinsAway
      ) &&
      arraysMatch(
        match.player2WinsHome,
        match.player2WinsAway
      )
    )
  } catch (error) {
    console.error("Error checking match equality:", error)
    return false
  }
}
