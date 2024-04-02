import * as styles from "./AdminFullStatPage.module.css"
import Papa from "papaparse"
const AdminFullStatPage = ({ teams, players }) => {
  const calculateWinPercentage = (team) => {
    const totalMatches = team.wins + team.loss;
    return totalMatches === 0 ? 0 : (team.wins / totalMatches) * 100;
  };

  const sortedTeams = [...teams].sort((a, b) => calculateWinPercentage(b) - calculateWinPercentage(a));
  const calculateTotalGames = (player) => player.gamesWon + player.gamesLoss;
  const calculateRankDifference = (rank, startRank) => {
    if (rank - startRank > 0)
      return rank - startRank;
    if (rank - startRank < 0)
      return rank - startRank;
    if (rank - startRank === 0)
      return rank - startRank;
  };

  const getRankDifference = (rank, startRank) => {
    if (rank - startRank > 0)
      return <p style={{ color: "green" }}>{rank - startRank}</p>
    if (rank - startRank < 0)
      return <p style={{ color: "red" }}>{rank - startRank}</p>
    if (rank - startRank === 0)
      return <p style={{ color: "white" }}>{rank - startRank}</p>
  }

  const downloadPlayerCSV = () => {
    console.log("Downloading Player CSV...");
    // Prepare data for CSV conversion
    const filteredData = players.map((player) => {
      const { _id, createdAt, updatedAt, __v, profile, seasonRankStart, ...rest } = player;
      return {
        ...rest,
        totalGames: calculateTotalGames(player), // Add total games to player object
        rankUpDown: calculateRankDifference(player.rank, player.seasonRankStart), // Add rank up/down to player object
      };
    });
    // Convert data to CSV format
    const csv = Papa.unparse(filteredData);
    console.log("Player CSV converted successfully:", csv);
    // Create Blob and initiate download
    const blob = new Blob([csv], { type: "text/csv" });
    console.log("Player Blob created successfully:", blob);
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "player_stats.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };
  const downloadTeamCSV = () => {
    console.log("Downloading Team CSV...");
    const teamsWithWinPercentage = sortedTeams.map((team) => ({
      ...team,
      winPercentage: calculateWinPercentage(team).toFixed(2),
    }));
    const filteredData = teamsWithWinPercentage.map((item) => {
      const { _id, createdAt, updatedAt, __v, teamPlayers, ...rest } = item;
      return rest;
    });
    const csv = Papa.unparse(filteredData);
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "team_stats.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <>
      <h1>Team Stats</h1>
      <div className="border">
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
      <button onClick={downloadTeamCSV}>Download Team CSV</button>
      <h1>Player Stats</h1>
      <div className={`${styles.container}`}>
        <div className={styles.title}>Player</div>
        <div className={styles.title}>Rank</div>
        <div className={styles.title}>Matches Played</div>
        <div className={styles.title}>Match Wins</div>
        <div className={styles.title}>Match Loss</div>
        <div className={styles.title}>Total Games</div>
        <div className={styles.title}>Games Won</div>
        <div className={styles.title}>Games Loss</div>
        <div className={styles.title}>Season Start Rank</div>
        <div className={styles.title}>Rank up/down</div>

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
              {player.matchesPlayed}
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
              {player.gamesWon + player.gamesLoss}
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
      </div>
      <button onClick={downloadPlayerCSV}>Download Player CSV</button>
    </>
  )
}

export default AdminFullStatPage
