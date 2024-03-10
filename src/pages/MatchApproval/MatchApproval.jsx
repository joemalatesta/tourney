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
        <li key={match._id}>
          {match.name} <br />
          {match.matchesforApproval.map((eachMatch, idx) => (
            <div key={idx}>
              Home Team : {eachMatch.homeTeam}
              <br />
              Visitors : {eachMatch.visitors}
              <br />
              Games Played : {eachMatch.gamesPlayed}
              <br />
              Winning Player : {eachMatch.winningPlayer.name}
            </div>
          ))}
        </li>
      ))}
    </>
  )
}

export default MatchApproval
