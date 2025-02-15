import * as playerService from "./playerService"

function adjustPlayerStats (data) {
  console.log('hit adjust player stats');
  
  winningPlayer(data)
  losingPlayer(data)
}

function winningPlayer(data) {
  let winner = data.winningPlayer
  let updatedPlayer = {
    ...data.winningPlayer,
    rank: winner.rank + 1,
    matchesPlayed: winner.matchesPlayed + 1,
    matchWin: winner.matchWin + 1,
    gamesWon:
      winner.gamesWon +
      parseInt(
        data.winningPlayer._id === data.player1._id
          ? data.player1Wins
          : data.player2Wins
      ),
    gamesLoss:
      winner.gamesLoss +
      parseInt(
        data.winningPlayer._id === data.player1._id
          ? data.player2Wins
          : data.player1Wins
      ),
  }
  console.log('winner updated')
  playerService.update(updatedPlayer)
}

function losingPlayer(data) {
  let loser = data.losingPlayer
  console.log(loser)
  let updatedPlayer = {
    ...data.losingPlayer,
    rank: loser.rank - 1,
    matchesPlayed: loser.matchesPlayed + 1,
    matchLoss: loser.matchLoss + 1,
    gamesWon:
      loser.gamesWon +
      parseInt(
        data.losingPlayer._id === data.player2._id
          ? data.player2Wins
          : data.player1Wins
      ),
    gamesLoss:
      loser.gamesLoss +
      parseInt(
        data.losingPlayer._id === data.player2._id
          ? data.player1Wins
          : data.player2Wins
      ),
  }
  playerService.update(updatedPlayer)
  console.log('loser updated');
  
}

export { adjustPlayerStats }
