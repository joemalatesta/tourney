import { useEffect } from "react"

import * as scheduleService from "../../services/scheduleService"
import * as playerService from "../../services/playerService"
// import * as teamService from '../../services/teamService'

const MatchApproval = ({
  handleEditTeam,
  scheduleDates,
  setScheduleDates,
  setRandom,
}) => {
  useEffect(() => {
    const fetchData = async () => {
      const data = await scheduleService.index()
      setScheduleDates(data)
    }
    fetchData()
  }, [])

  const handleLosers = async (team, player) => {
    try {
      let losingTeam = { ...team, loss: parseInt(team.loss) + 1 }
      console.log("This is the losing team", losingTeam)
      await handleEditTeam(losingTeam)

      let loser = {
        ...player,
        matchesPlayed: player.matchesPlayed + 1,
        matchLoss: parseInt(player.matchLoss) + 1,
        rank: player.rank - 1,
      }
      await playerService.update(loser)
    } catch (error) {
      console.error("Error handling losers:", error)
    }
  }

  console.log(scheduleDates)
  const handleWinners = async (team, player) => {
    try {
      let winningTeam = { ...team, wins: parseInt(team.wins) + 1 }
      console.log(winningTeam)
      await handleEditTeam(winningTeam)

      let winner = {
        ...player,
        matchesPlayed: player.matchesPlayed + 1,
        matchWin: parseInt(player.matchWin) + 1,
        rank: player.rank + 1,
      }
      await playerService.update(winner)
    } catch (error) {
      console.error("Error handling winners:", error)
    }
  }

  // const handleSetConfirmMatch = async (match) => {
  //   let data =  await scheduleDates.filter(el => el.date === match.date)
  //   const updatedData = {...data, confirmed: "YES"}

  //   await scheduleService.update({...scheduleDates, updatedData})
  //   console.log(match)
  // }

  const handleConfirmMatch = async (match) => {
    console.log(match)
    setRandom(Math.random()+1)
    // await handleSetConfirmMatch(match)
    // await handleSetConfirmMatch(match.losingTeam)
    await handleWinners(match.winningTeam, match.winningPlayer)
    await handleLosers(match.losingTeam, match.losingPlayer)
  }

  return (
    <>
      <h1>Match Approvals</h1>
      {scheduleDates?.map((match) => (
        <li className="bracket green-felt2" key={match._id}>
          {match.name} <br />
          {match.matchesforApproval.map(
            (eachMatch, idx) =>
              eachMatch.confirmed === "NO" && (
                <div className="bracket" key={idx}>
                  Completed : {eachMatch.completed}
                  <br />
                  <br />
                  Winning Team :{" "}
                  {eachMatch.winningTeam
                    ? eachMatch.winningTeam.teamName
                    : "No Winner"}
                  <br />
                  Winning Player :{" "}
                  {eachMatch.winningPlayer !== null
                    ? eachMatch.winningPlayer.name
                    : "No Winner"}
                  <br />
                  <br />
                  Losing Team :{" "}
                  {eachMatch.losingTeam !== null
                    ? eachMatch.losingTeam.teamName
                    : "No Loser"}
                  <br />
                  Losing Player :{" "}
                  {eachMatch.losingPlayer !== null
                    ? eachMatch.losingPlayer.name
                    : "No Loser"}
                  <br />
                  <br />
                  Player games :<br />
                  <div className="bracket green-felt">
                    {eachMatch.player1.player.name} :{" "}
                    {eachMatch.player1.gamesWon}
                    <br />
                    {eachMatch.player2.player.name} :{" "}
                    {eachMatch.player2.gamesWon}
                    <br />
                  </div>
                  Games Played : {eachMatch.gamesPlayed}
                  <br />
                  <button onClick={() => handleConfirmMatch(eachMatch)}>
                    Confirm Match
                  </button>
                </div>
              )
          )}
        </li>
      ))}
    </>
  )
}

export default MatchApproval
