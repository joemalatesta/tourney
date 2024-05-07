export function getGameRace(player1, player2) {
  if (player1 === null || player2 === null) return
  if (player1 === undefined || player2 === undefined) return

  let highest = Math.max(player1.rank, player2.rank)
  let lowest = Math.min(player1.rank, player2.rank)
  let difference = highest - lowest

  if (player1.rank > player2.rank){
    if (highest <= 39) {
      if (difference <= 10) return ["3", "3"]
      else return ["3", "2"]
    }
  
    if (highest > 39 && highest <= 49) {
      if (difference <= 10) return ["3", "3"]
      if (difference > 10 && difference < 27) return ["3", "2"]
      if (difference >= 27 && difference < 50) return ["4", "2"]
    }
  
    if (highest > 49 && highest <= 69) {
      if (difference <= 6) return ["4", "4"]
      if (difference > 6 && difference < 19) return ["4", "3"]
      if (difference >= 19 && difference < 30) return ["5", "3"]
      if (difference >= 30 && difference < 40) return ["4", "2"]
      if (difference >= 40 && difference < 49) return ["5", "2"]
      if (difference >= 49 && difference < 69) return ["6", "2"]
      if (difference >= 69) return ["5", "2"]
    }
  
    if (highest > 69 && highest <= 89) {
      if (difference <= 5) return ["5", "5"]
      if (difference > 5 && difference <= 14) return ["5", "4"]
      if (difference > 14 && difference <= 21) return ["6", "4"]
      if (difference > 21 && difference <= 28) return ["5", "3"]
      if (difference > 28 && difference <= 36) return ["6", "3"]
      if (difference > 36 && difference <= 46) return ["7", "3"]
      if (difference > 46 && difference <= 56) return ["6", "2"]
      if (difference > 56 && difference <= 62) return ["7", "2"]
      if (difference > 62 && difference <= 82) return ["8", "2"]
      if (difference > 82 && difference <= 89) return ["7", "2"]
    }
  
    if (highest > 89) {
      if (difference <= 4) return ["6", "6"]
      if (difference >= 5 && difference < 12) return ["6", "5"]
      if (difference >= 12 && difference < 18) return ["7", "5"]
      if (difference >= 18 && difference < 23) return ["6", "4"]
      if (difference >= 23 && difference < 29) return ["7", "4"]
      if (difference >= 29 && difference < 36) return ["8", "4"]
      if (difference >= 36 && difference < 43) return ["7", "3"]
      if (difference >= 43 && difference < 49) return ["8", "3"]
      if (difference >= 49 && difference < 59) return ["9", "3"]
      if (difference >= 59 && difference < 69) return ["8", "2"]
      if (difference >= 69 && difference < 75) return ["9", "2"]
      if (difference >= 75 && difference < 94) return ["10", "2"]
      if (difference >= 94 && difference < 113) return ["9", "2"]
      if (difference >= 113) return ["10", "2"]
    }
  }
  if(player2.rank >= player1.rank){
    if (highest <= 39) {
      if (difference <= 10) return ["3","3"]
      else return ["2","3"]
    }
  
    if (highest > 39 && highest <= 49) {
      if (difference <= 10) return ["3","3"]
      if (difference > 10 && difference < 27) return ["2","3"]
      if (difference >= 27 && difference < 50) return ["2","4"]
    }
  
    if (highest > 49 && highest <= 69) {
      if (difference <= 6) return ["4","4"]
      if (difference > 6 && difference < 19) return ["3","4" ]
      if (difference >= 19 && difference < 30) return ["3","5"]
      if (difference >= 30 && difference < 40) return ["2","4"]
      if (difference >= 40 && difference < 49) return ["2","5"]
      if (difference >= 49 && difference < 69) return ["2","6"]
      if (difference >= 69) return ["2","5"]
    }
  
    if (highest > 69 && highest <= 89) {
      if (difference <= 5) return ["5", "5"]
      if (difference > 5 && difference <= 14) return ["4","5"]
      if (difference > 14 && difference <= 21) return ["4","6"]
      if (difference > 21 && difference <= 28) return ["3","5"]
      if (difference > 28 && difference <= 36) return ["3","6"]
      if (difference > 36 && difference <= 46) return ["3","7"]
      if (difference > 46 && difference <= 56) return ["2","6"]
      if (difference > 56 && difference <= 62) return ["2","7"]
      if (difference > 62 && difference <= 82) return ["2","8"]
      if (difference > 82 && difference <= 89) return ["2","7"]
    }
  
    if (highest > 89) {
      if (difference <= 4) return ["6", "6"]
      if (difference >= 5 && difference < 12) return ["5","6"]
      if (difference >= 12 && difference < 18) return ["5","7"]
      if (difference >= 18 && difference < 23) return ["4","6"]
      if (difference >= 23 && difference < 29) return ["4","7"]
      if (difference >= 29 && difference < 36) return ["4","8"]
      if (difference >= 36 && difference < 43) return ["3","7"]
      if (difference >= 43 && difference < 49) return ["3","8"]
      if (difference >= 49 && difference < 59) return ["3","9"]
      if (difference >= 59 && difference < 69) return ["2","8"]
      if (difference >= 69 && difference < 75) return ["2","9"]
      if (difference >= 75 && difference < 94) return ["2","10"]
      if (difference >= 94 && difference < 113) return [ "2","9"]
      if (difference >= 113) return ["2","10"]
    }
  }

}


export function getFirstPlayer(game) {
  function compareByValue(a, b) {
    if (a === null || b === null) return
    return b.rank - a.rank
  }
  return game.sort(compareByValue)
}

// export function shufflePlayers(players) {
//   function shuffleArray(array) {
//     for (let i = array?.length - 1; i > 0; i--) {
//       const j = Math.floor(Math.random() * (i + 1))
//       ;[array[i], array[j]] = [array[j], array[i]]
//     }
//   }
//   shuffleArray(players)
//   return players
// }

// export function SplitIntoMatches(players) {
//   let playerTuples = []

//   for (let i = 0; i < players?.length; i = i + 2) {
//     playerTuples.push([players[i], players[i + 1]])
//   }
//   return playerTuples
// }

// export function addByePlayers(players) {
//   players.push({
//     _id: Math.random(),
//     name: "Bye",
//     rank: 1,
//   })
// }
