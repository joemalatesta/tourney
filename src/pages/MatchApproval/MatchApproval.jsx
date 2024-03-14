
import { useState, useEffect } from "react"
import * as playerService from "../../services/playerService"
import * as playedMatchService from "../../services/playedMatchService"

const MatchApproval = ({ handleEditTeam }) => {
  const [playedData, setPlayedData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await playedMatchService.index()
        const matchStates = data.map((match) => ({
          ...match,
          isDisabled: false,
        }))
        setPlayedData(matchStates)
      } catch (error) {
        console.error("Error fetching played matches:", error)
      }
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

  const handleConfirmMatch = async (matchIndex) => {
    try {
      const match = playedData[matchIndex]

      
      setPlayedData((prevMatches) => {
        const updatedMatches = [...prevMatches]
        updatedMatches[matchIndex] = {
          ...updatedMatches[matchIndex],
          isDisabled: true,
          confirmed: true
        }
        return updatedMatches
      })

      await playedMatchService.update(playedData)
      await handleWinners(match.winningTeam, match.winningPlayer)
      await handleLosers(match.losingTeam, match.losingPlayer)
    } catch (error) {
      console.error("Error confirming match:", error)
    }
  }
  return (
    <>
      <h1>Match Approvals</h1>
      {playedData?.map((match, index) => (
        <div className="bracket green-felt2" key={match._id}>
          {match.confirmed === false && 
          <>
          <h1>Match Date: {match.matchDate}</h1>
          Winning Team: {match.winningTeam
            ? match.winningTeam.teamName
            : "N/A"}{" "}
          <br />
          Losing Team: {match.losingTeam ? match.losingTeam.teamName : "N/A"}
          <br />
          Completed: {match.completed ? "Yes" : "No"}
          <br />
          <div className="bracket">
            Game Stats:
            <div className="bracket">
              <div className="bracket">
                Winning Player:{" "}
                {match.winningPlayer ? match.winningPlayer.name : "N/A"}
                <br />
                Games Won: {match.winnerGamesPlayed}
                <br />
              </div>
              <div className="bracket">
                Losing Player:{" "}
                {match.losingPlayer ? match.losingPlayer.name : "N/A"}{" "}
                <br />
                Games Won: {match.loserGamesPlayed}
                <br />
              </div>
              Total games played:{" "}
              {match.loserGamesPlayed + match.winnerGamesPlayed} <br />
            </div>
          </div>
          Confirmed: {match.confirmed ? "Yes" : "No"}
          <button
          onClick={() => handleConfirmMatch(index)}
          disabled={match.isDisabled}
          >
            Confirm Match
          </button>
        </>
        }
        </div>
          
      ))}
    </>
  )
}

export default MatchApproval
