
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

    const arraysMatch = (home, away) =>
      home.length === away.length &&
      home.every((value, index) => value === away[index])

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
