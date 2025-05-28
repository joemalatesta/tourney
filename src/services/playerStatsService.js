import * as playerService from "./playerService"
function adjustPlayerStats(data) {
  console.log("hit adjust player stats")
  let winner =
    data.winningPlayer._id === data.player1._id ? data.player1 : data.player2
  let loser =
    data.losingPlayer._id === data.player1._id ? data.player1 : data.player2
  winningPlayer(winner, loser)
  losingPlayer(loser, winner)
}

function winningPlayer(winner, loser) {
  let updatedPlayer = {
    ...winner,
    rank: winner.rank + 1,
    matchesPlayed: winner.matchesPlayed + 1,
    matchWin: winner.matchWin + 1,
    gamesWon:
      winner.gamesWon +
      winner.gamesWon.reduce((acc, value) => {
        if (value === true) acc += 1
        return acc
      }, 0),
    gamesLoss:
      winner.gamesLoss +
      loser.gamesWon.reduce((acc, value) => {
        if (value === true) acc += 1
        return acc
      }, 0),
  }
  console.log("winner updated")
  playerService.update(updatedPlayer)
}

function losingPlayer(loser, winner) {
  console.log(loser)
  let updatedPlayer = {
    ...loser,
    rank: loser.rank - 1,
    matchesPlayed: loser.matchesPlayed + 1,
    matchLoss: loser.matchLoss + 1,
    gamesWon:
      loser.gamesWon +
      loser.gamesWon.reduce((acc, value) => {
        if (value === true) acc += 1
        return acc
      }, 0),
    gamesLoss:
      loser.gamesLoss +
      winner.gamesWon.reduce((acc, value) => {
        if (value === true) acc += 1
        return acc
      }, 0),
  }
  playerService.update(updatedPlayer)
  console.log("loser updated")
}

export { adjustPlayerStats }
