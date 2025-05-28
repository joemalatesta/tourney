import * as styles from "./AdminFullStatPage.module.css"
import Papa from "papaparse"
import { useState } from "react"

const AdminFullStatPage = ({ teams, players }) => {
  const [showActiveOnly, setShowActiveOnly] = useState(true)

  const toggleShowActive = () => {
    setShowActiveOnly(!showActiveOnly)
  }

  const calculateWinPercentage = (team) => {
    const totalMatches = team.wins + team.loss
    return totalMatches === 0 ? 0 : (team.wins / totalMatches) * 100
  }

  const sortedPlayers = [...players]
    .filter((player) => (showActiveOnly ? player.active : true))
    .sort((a, b) => {
      if (a.nameLast < b.nameLast) return -1
      if (a.nameLast > b.nameLast) return 1
      return 0
    })

  const sortedTeams = [...teams].sort(
    (a, b) => calculateWinPercentage(b) - calculateWinPercentage(a)
  )

  const calculateTotalGames = (player) => player.gamesWon + player.gamesLoss

  const calculatePlayerWinPercentage = (player) => {
    return (
      (player.gamesWon / (player.gamesWon + player.gamesLoss)) *
      100
    ).toFixed(2)
  }

  const getRankDifference = (rank, startRank) => {
    const diff = rank - startRank
    const color = diff > 0 ? "green" : diff < 0 ? "red" : "white"
    return <p style={{ color }}>{diff}</p>
  }

  const downloadPlayerCSV = () => {
    const filteredData = players.map((player) => {
      const { _id, createdAt, updatedAt, __v, profile, ...rest } = player
      return {
        name: rest.nameFirst + " " + rest.nameLast,
        active: rest.active,
        seasonRankStart: rest.seasonRankStart,
        rank: rest.rank,
        rankUpDown: rest.rank - rest.seasonRankStart,
        matchesPlayed: rest.matchesPlayed,
        matchWin: rest.matchWin,
        matchLoss: rest.matchLoss,
        totalGames: calculateTotalGames(player),
        gamesWon: rest.gamesWon,
        gamesLoss: rest.gamesLoss,
        winPercentage: calculatePlayerWinPercentage(player),
      }
    })

    const csv = Papa.unparse(filteredData)
    const blob = new Blob([csv], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "player_stats.csv"
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const downloadTeamCSV = () => {
    const teamsWithWinPercentage = sortedTeams.map((team) => ({
      ...team,
      winPercentage: calculateWinPercentage(team).toFixed(2),
    }))
    const filteredData = teamsWithWinPercentage.map((item) => {
      const { _id, createdAt, updatedAt, __v, teamPlayers, ...rest } = item
      return rest
    })
    const csv = Papa.unparse(filteredData)
    const blob = new Blob([csv], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "team_stats.csv"
    a.click()
    window.URL.revokeObjectURL(url)
  }

  return (
    <>
      <div className="bracket">
        <h1 className="center">Team Stats</h1>
        <div className="border center">
          <div className={styles.teamContainer}>
            <div className={styles.title}>Team</div>
            <div className={styles.title}>Match Wins</div>
            <div className={styles.title}>Match Loss</div>
            <div className={styles.title}>Win Percentage</div>

            <div className={`${styles.teamRow} ${styles.column}`}>
              {sortedTeams.map((team) => (
                <div className={styles.team} key={team._id}>
                  {team.teamName}
                </div>
              ))}
            </div>
            <div className={`${styles.teamRow} border`}>
              {sortedTeams.map((team) => (
                <div className={styles.team} key={team._id}>
                  {team.wins}
                </div>
              ))}
            </div>
            <div className={`${styles.teamRow} border`}>
              {sortedTeams.map((team) => (
                <div className={styles.team} key={team._id}>
                  {team.loss}
                </div>
              ))}
            </div>
            <div className={`${styles.teamRow} border`}>
              {sortedTeams.map((team) => (
                <div className={styles.team} key={team._id}>
                  {((team.wins / (team.wins + team.loss)) * 100).toFixed(2)}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CSV and Toggle Buttons */}
        <div className="center">
          <button onClick={downloadTeamCSV}>Download Team CSV</button>
          <br />
          <button onClick={downloadPlayerCSV}>Download Player CSV</button>
          <br />
          <button onClick={toggleShowActive}>
            {showActiveOnly ? "Show All Players" : "Show Only Active Players"}
          </button>
        </div>

        <h1 className="center">Player Stats</h1>
        <div className={styles.container}>
          {[
            "Player",
            "Rank",
            "Season Start Rank",
            "Rank up/down",
            "Match Wins",
            "Match Loss",
            "Matches Played",
            "Games Won",
            "Games Loss",
            "Total Games",
            "Win %",
          ].map((title, i) => (
            <div key={i} className={styles.title}>
              {title}
            </div>
          ))}

          {[
            (p) => `${p.nameFirst} ${p.nameLast}`,
            (p) => p.rank,
            (p) => p.seasonRankStart,
            (p) => getRankDifference(p.rank, p.seasonRankStart),
            (p) => p.matchWin,
            (p) => p.matchLoss,
            (p) => p.matchesPlayed,
            (p) => p.gamesWon,
            (p) => p.gamesLoss,
            (p) => p.gamesWon + p.gamesLoss,
            (p) => ((p.gamesWon / (p.gamesWon + p.gamesLoss)) * 100).toFixed(2),
          ].map((getter, i) => (
            <div key={i} className={styles.row}>
              {sortedPlayers.map((player) => (
                <div key={player._id} className={styles.player}>
                  {getter(player)}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default AdminFullStatPage
