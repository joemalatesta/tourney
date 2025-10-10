import * as playerService from "./playerService"
function adjustPlayerStats(data) {
  console.log("hit adjust player stats", data)

  winningPlayer(data)
  losingPlayer(data)
}

function winningPlayer(data) {
  let winnerWins =  data.winningPlayer === data.player1._id ? data.player1WinsHome : data.player2WinsHome
  let loserWins = data.losingPlayer === data.player1._id ? data.player1WinsHome : data.player2WinsHome
  let winner = data.winningPlayer === data.player1._id ? data.player1 : data.player2

    let updatedPlayer = {
    ...winner,
    rank: winner.rank + 1,
    matchesPlayed: winner.matchesPlayed + 1,
    matchWin: winner.matchWin + 1,
    gamesWon:
      winner.gamesWon +
      winnerWins.reduce((acc, value) => {
        if (value === true) acc += 1
        return acc
      }, 0),
    gamesLoss:
      winner.gamesLoss +
      loserWins.reduce((acc, value) => {
        if (value === true) acc += 1
        return acc
      }, 0),
  }
  console.log("winner updated")
  playerService.update(updatedPlayer)
}

function losingPlayer(data) {
    let winnerWins =  data.winningPlayer === data.player1._id ? data.player1WinsHome : data.player2WinsHome
  let loserWins = data.losingPlayer === data.player1._id ? data.player1WinsHome : data.player2WinsHome
  let loser =
    data.losingPlayer === data.player1._id ? data.player1 : data.player2
  console.log(loser)
  let updatedPlayer = {
    ...loser,
    rank: loser.rank - 1,
    matchesPlayed: loser.matchesPlayed + 1,
    matchLoss: loser.matchLoss + 1,
    gamesWon:
      loser.gamesWon +
      loserWins.reduce((acc, value) => {
        if (value === true) acc += 1
        return acc
      }, 0),
    gamesLoss:
      loser.gamesLoss +
      winnerWins.reduce((acc, value) => {
        if (value === true) acc += 1
        return acc
      }, 0),
  }
  playerService.update(updatedPlayer)
  console.log("loser updated")
}

export { adjustPlayerStats }
