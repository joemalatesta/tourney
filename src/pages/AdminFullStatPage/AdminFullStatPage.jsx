import * as styles from "./AdminFullStatPage.module.css"
import Papa from "papaparse"
const AdminFullStatPage = ({ teams, players }) => {
  const calculateWinPercentage = (team) => {
    const totalMatches = team.wins + team.loss
    return totalMatches === 0 ? 0 : (team.wins / totalMatches) * 100
  }

  const sortedTeams = [...teams].sort(
    (a, b) => calculateWinPercentage(b) - calculateWinPercentage(a)
  )
  const calculateTotalGames = (player) => player.gamesWon + player.gamesLoss
  const calculateRankDifference = (rank, startRank) => {
    if (rank - startRank > 0) return rank - startRank
    if (rank - startRank < 0) return rank - startRank
    if (rank - startRank === 0) return rank - startRank
  }

  const getRankDifference = (rank, startRank) => {
    if (rank - startRank > 0)
      return <p style={{ color: "green" }}>{rank - startRank}</p>
    if (rank - startRank < 0)
      return <p style={{ color: "red" }}>{rank - startRank}</p>
    if (rank - startRank === 0)
      return <p style={{ color: "white" }}>{rank - startRank}</p>
  }

  const downloadPlayerCSV = () => {
    console.log("Downloading Player CSV...")
    const filteredData = players.map((player) => {
      const { _id, createdAt, updatedAt, __v, profile, ...rest } = player
      console.log(_id,createdAt, updatedAt, __v,profile);
      return {
        name: rest.name,
        seasonRankStart: rest.seasonRankStart,
        rank: rest.rank,
        rankUpDown: calculateRankDifference(
          player.rank,
          player.seasonRankStart
        ),
        matchesPlayed: rest.matchesPlayed,
        matchWin: rest.matchWin,
        matchLoss: rest.matchLoss,
        totalGames: calculateTotalGames(player),
        gamesWon: rest.gamesWon,
        gamesLoss: rest.gamesLoss,
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
    console.log("Downloading Team CSV...")
    const teamsWithWinPercentage = sortedTeams.map((team) => ({
      ...team,
      winPercentage: calculateWinPercentage(team).toFixed(2),
    }))
    const filteredData = teamsWithWinPercentage.map((item) => {
      const { _id, createdAt, updatedAt, __v, teamPlayers, ...rest } = item
      console.log(_id, createdAt, updatedAt, __v,teamPlayers);
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
          <div className={`${styles.teamContainer} `}>
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
                  {((team?.wins / (team?.wins + team?.loss)) * 100).toFixed(2)}
                </div>
              ))}
            </div>
          </div>
        </div>
                <br/>
        <div className="center">
          <button onClick={downloadTeamCSV}>Download Team CSV</button><br/>
        </div>

        <div className="center">
          <button onClick={downloadPlayerCSV}>Download Player CSV</button>
        </div>
          
        <h1 className="center">Player Stats</h1>
        <div className={`${styles.container}`}>
          <div className={styles.title}>Player</div>
          <div className={styles.title}>Rank</div>
          <div className={styles.title}>Season Start Rank</div>
          <div className={styles.title}>Rank up/down</div>
          <div className={styles.title}>Match Wins</div>
          <div className={styles.title}>Match Loss</div>
          <div className={styles.title}>Matches Played</div>
          <div className={styles.title}>Games Won</div>
          <div className={styles.title}>Games Loss</div>
          <div className={styles.title}>Total Games</div>

          <div className={`${styles.row}`}>
            {players.map((player) => (
              <div className={styles.player} key={player._id}>
                {player.name}
              </div>
            ))}
          </div>
          <div className={`${styles.row}`}>
            {players.map((player) => (
              <div className={styles.player} key={player._id}>
                {player.rank}
              </div>
            ))}
          </div>
          <div className={styles.row}>
            {players.map((player) => (
              <div className={styles.player} key={player._id}>
                {player.seasonRankStart}
              </div>
            ))}
          </div>
          <div className={styles.row}>
            {players.map((player) => (
              <div className={styles.player} key={player._id}>
                {getRankDifference(player.rank, player.seasonRankStart)}
              </div>
            ))}
          </div>
          <div className={styles.row}>
            {players.map((player) => (
              <div className={styles.player} key={player._id}>
                {player.matchWin}
              </div>
            ))}
          </div>
          <div className={styles.row}>
            {players.map((player) => (
              <div className={styles.player} key={player._id}>
                {player.matchLoss}
              </div>
            ))}
          </div>
          <div className={styles.row}>
            {players.map((player) => (
              <div className={styles.player} key={player._id}>
                {player.matchesPlayed}
              </div>
            ))}
          </div>
          <div className={styles.row}>
            {players.map((player) => (
              <div className={styles.player} key={player._id}>
                {player.gamesWon}
              </div>
            ))}
          </div>
          <div className={styles.row}>
            {players.map((player) => (
              <div className={styles.player} key={player._id}>
                {player.gamesLoss}
              </div>
            ))}
          </div>
          <div className={styles.row}>
            {players.map((player) => (
              <div className={styles.player} key={player._id}>
                {player.gamesWon + player.gamesLoss}
              </div>
            ))}
          </div>

        </div>
      </div>
    </>
  )
}

export default AdminFullStatPage
