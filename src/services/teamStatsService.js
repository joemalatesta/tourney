import * as teamService from "./teamService"

async function adjustTeamStats(data, homeTeam, awayTeam) {
  winningTeam(data, homeTeam, awayTeam)
  // losingTeam(data, homeTeam, awayTeam)
}

function winningTeam(data, homeTeam, awayTeam) {
  console.log(data.winningPlayer);
  console.log(homeTeam)
  console.log(teamService )
  if(homeTeam.teamPlayer.includes(data.winningPlayer._id)) {
    console.log('this is a true statement')
  }
  // Need to find the players id in the home or away object then adjust the winners team information to reflect the needed changes then do the same for the losers team
}

// function losingTeam(data, homeTeam, awayTeam) {
//   let loser = data.losingPlayer
//   console.log(loser);
// }

export { adjustTeamStats }
