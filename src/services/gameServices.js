
export function getGameRace (player1, player2){
  if(player1?.name === 'bye' || player2?.name === 'bye') return 'No game'
  if(player1 === null || player2 === null) return
  let highest = Math.max(player1.rank , player2.rank)
  let lowest = Math.min(player1.rank , player2.rank)
  let difference = highest - lowest

  if(highest <= 39){
   
    if(difference <= 10) return ['3','3']
    else return ['3','2']
  }

  if(highest > 39 && highest<= 49){
  
    if(difference <= 10) return['3','3']
    if(difference > 10 && difference < 27) return ['3','2']
    if(difference >= 27 && difference < 50) return ['4','2']
  }

  if(highest > 49 && highest <= 69){
 
    if(difference <= 6) return ['4','4']
    if(difference > 6 && difference < 19) return ['4','3']
    if(difference >= 19 && difference < 30) return ['5','3']
    if(difference >= 30 && difference < 40) return ['4','2']
    if(difference >= 40 && difference < 49) return ['5','2']
    if(difference >= 49 && difference < 69) return ['6','2']
    if(difference >= 69 ) return ['5','2']
  }

  if(highest > 69 && highest <= 89){

    if(difference <= 5 ) return ['5','5']
    if(difference > 5  && difference <= 14) return ['5','4']
    if(difference > 14 && difference <= 21) return ['6','4']
    if(difference > 21 && difference <= 28) return ['5','3']
    if(difference > 28 && difference <= 36) return ['6','3']
    if(difference > 36 && difference <= 46) return ['7','3']
    if(difference > 46 && difference <= 56) return ['6','2']
    if(difference > 56 && difference <= 62) return ['7','2']
    if(difference > 62 && difference <= 82) return ['8','2']
    if(difference > 82 && difference <= 89) return ['7','2']
  }

  if(highest > 89 ){

    if(difference <= 4 ) return ['6','6']
    if(difference >= 5 && difference < 12) return ['6','5']
    if(difference >= 12 && difference < 18) return ['7','5']
    if(difference >= 18 && difference < 23) return ['6','4']
    if(difference >= 23 && difference < 29) return ['7','4']
    if(difference >= 29 && difference < 36) return ['8','4']
    if(difference >= 36 && difference < 43) return ['7','3']
    if(difference >= 43 && difference < 49) return ['8','3']
    if(difference >= 49 && difference < 59) return ['9','3']
    if(difference >= 59 && difference < 69) return ['8','2']
    if(difference >= 69 && difference < 75) return ['9','2']
    if(difference >= 75 && difference < 94) return ['10','2']
    if(difference >= 94 && difference < 113) return ['9','2']
    if(difference >= 113) return ['10','2']
  }
}

export function shufflePlayers (players){
  function shuffleArray(array) {
    for (let i = array?.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
 
  shuffleArray(players)
  return players
}

export function SplitIntoTuples (players) {
  
 
  let playerTuples = []
  
  for(let i = 0; i < players?.length; i=i+2){
    
    playerTuples.push([players[i],players[i+1]])
  }
  return playerTuples
}

export function getFirstPlayer  (game) {
  
  function compareByValue(a, b) {
    if(a=== null || b === null) return 
    return b.rank - a.rank;
  }
  return game.sort(compareByValue)
}

export function addByePlayers (players) {
  let num
  const calcByesNeeded = (num) => {
    for(let i = 0; i < num ; i++){
      players.push({
        _id: Math.random(),
        name: 'Bye',
        rank: 0
      })
    }
  }
  
  if(players.length > 2 && players.length <= 4 ){

    num = 4 - players.length
    calcByesNeeded(num)
  }
  if(players.length > 4 && players.length < 8 ){
   
    num = (8 - players.length)
    calcByesNeeded(num)
  }
  if(players.length > 8 && players.length <= 16 ){
    
    num = 16 - players.length
    calcByesNeeded(num)
  }
  if(players.length > 16 && players.length < 32 ){
   
    num = 32 - players.length
    calcByesNeeded(num)
  }
  if(players.length > 32 && players.length < 64 ){
    
    num = 64 - players.length
    calcByesNeeded(num)
  }
}

