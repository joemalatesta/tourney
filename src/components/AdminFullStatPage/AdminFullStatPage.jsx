import * as styles from "./AdminFullStatPage.module.css"
import Papa from 'papaparse'; 
const AdminFullStatPage = ({ teams, players }) => {

  const getRankDifference = (rank, startRank) => {
    if(rank - startRank > 0 ) return <p style={{color: 'green'}}>{rank - startRank}</p>
    if(rank - startRank < 0 ) return <p style={{color: 'red'}}>{rank - startRank}</p>
    if(rank - startRank === 0) return <p style={{color: 'white'}}>{rank - startRank}</p>
  }

  const downloadPlayerCSV = () => {
    console.log("Downloading CSV...");
    const allData = [...players]
    const filteredData = allData.map(item => {
      const { _id, createdAt, updatedAt, __v, profile, ...rest } = item;
      return rest; 
    })
    const csv = Papa.unparse(filteredData);
    console.log("CSV converted successfully:", csv); 
    const blob = new Blob([csv], { type: 'text/csv' });
    console.log("Blob created successfully:", blob); 
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'stats.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };
  const downloadTeamCSV = () => {
    console.log("Downloading CSV...");
    const allData = [...teams]
    const filteredData = allData.map(item => {
      const { _id, createdAt, updatedAt, __v, teamPlayers, ...rest } = item;
      return rest; 
    })
    const csv = Papa.unparse(filteredData);
    console.log("CSV converted successfully:", csv); 
    const blob = new Blob([csv], { type: 'text/csv' });
    console.log("Blob created successfully:", blob); 
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'stats.csv';
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
            {teams.map((team) => (
              <div className={styles.team} key={team._id}>
                {team.teamName}
              </div>
            ))}
          </div>
          <div className={`${styles.teamRow} border`}>
            {teams.map((team) => (
              <div className={styles.team} key={team._id}>
                {team.wins}
              </div>
            ))}
          </div>
          <div className={`${styles.teamRow} border`}>
            {teams.map((team) => (
              <div className={styles.team} key={team._id}>
                {team.loss}
              </div>
            ))}
          </div>
          <div className={`${styles.teamRow} border`}>
            {teams.map((team) => (
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
              {getRankDifference(player.rank,player.seasonRankStart) }
            </div>
          ))}
        </div>
      </div>
        <button onClick={downloadPlayerCSV}>Download Player CSV</button>
    </>
  )
}

export default AdminFullStatPage
