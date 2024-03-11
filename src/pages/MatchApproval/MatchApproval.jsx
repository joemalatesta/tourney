import { useState, useEffect } from "react"

import * as scheduleService from "../../services/scheduleService"
import * as playerService from '../../services/playerService'
import * as teamService from '../../services/teamService'

const MatchApproval = () => {
  const [scheduleDates, setScheduleDates] = useState()

  useEffect(() => {
    const fetchData = async () => {
      const data = await scheduleService.index()
      setScheduleDates(data)
    }
    fetchData()
  }, [])

  const handleLosers = (team, player) => {
    let loser = {...player, matchesPlayed : (player.matchesPlayed + 1), matchWin: (player.matchLoss + 1), rank: (player.rank - 1) }
    playerService.update(loser)
  }

  const handleWinners = (team, player) => {
    let winner = {...player, matchesPlayed : (player.matchesPlayed + 1), matchWin: (player.matchWin + 1), rank: (player.rank + 1) }
    playerService.update(winner)
  }



  const handleConfirmMatch = (match) => {
    console.log(match);
    handleWinners(match.winningTeam, match.winningPlayer)
    handleLosers(match.losingTeam, match.losingPlayer)
  }

  return (
    <>
      <h1>Match Approvals</h1>
      {scheduleDates?.map((match) => (
        <li className="bracket green-felt2" key={match._id}>
          {match.name} <br />
          {match.matchesforApproval.map((eachMatch, idx) => (
            <div className="bracket" key={idx}>
              Completed : {eachMatch.completed}<br/><br/>
              Winning Team : {eachMatch.winningTeam? eachMatch.winningTeam : "No Winner"}
              <br />
              Winning Player : {eachMatch.winningPlayer!==null ? eachMatch.winningPlayer.name : "No Winner"}<br/>
              <br />
              Losing Team : {eachMatch.losingTeam!==null ? eachMatch.losingTeam : "No Loser"}
              <br />
              Losing Player : {eachMatch.losingPlayer!==null ? eachMatch.losingPlayer.name : "No Loser"}<br/><br/>
              Player games :<br/> 
              <div className="bracket green-felt">
                {eachMatch.player1.player.name} : {eachMatch.player1.gamesWon}<br/>
                {eachMatch.player2.player.name} : {eachMatch.player2.gamesWon}<br/>
              </div>
              Games Played : {eachMatch.gamesPlayed}<br/>
              <button onClick={()=>handleConfirmMatch(eachMatch)}>Confirm Match</button>
            </div>
          ))}
        </li>
      ))}
    </>
  )
}

export default MatchApproval
