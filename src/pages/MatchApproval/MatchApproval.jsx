import { useState, useEffect } from "react"

import * as scheduleService from "../../services/scheduleService"

const MatchApproval = () => {
  const [scheduleDates, setScheduleDates] = useState()

  useEffect(() => {
    const fetchData = async () => {
      const data = await scheduleService.index()
      setScheduleDates(data)
    }
    fetchData()
  }, [])

  console.log(scheduleDates)

  return (
    <>
      match approvals
      {scheduleDates?.map((match) => (
        <li className="bracket green-felt2" key={match._id}>
          {match.name} <br />
          {match.matchesforApproval.map((eachMatch, idx) => (
            <div className="bracket" key={idx}>
              Completed : {eachMatch.completed}<br/>
              Winning Team : {eachMatch.winningTeam? eachMatch.winningTeam : "No Winner"}
              <br />
              Winning Player : {eachMatch?.winningPlayer!==null ? eachMatch?.winningPlayer.name : "No Winner"}<br/>
              <br />
              Losing Team : {eachMatch?.losingTeam!==null ? eachMatch?.losingTeam : "No Loser"}
              <br />
              Player games :<br/> 
              <div className="bracket green-felt">
                {eachMatch.player1.player.name} : {eachMatch.player1.gamesWon}<br/>
                {eachMatch.player2.player.name} : {eachMatch.player2.gamesWon}<br/>
              </div>
              Games Played : {eachMatch.gamesPlayed}<br/>
            </div>
          ))}
        </li>
      ))}
    </>
  )
}

export default MatchApproval
