import * as styles from "./AdminFullStatPage.module.css"

const AdminFullStatPage = ({ teams, players }) => {

  const getRankDifference = (rank, startRank) => {
    if(rank - startRank > 0 ) return <p style={{color: 'green'}}>{rank - startRank}</p>
    if(rank - startRank < 0 ) return <p style={{color: 'red'}}>{rank - startRank}</p>
    if(rank - startRank === 0) return <p style={{color: 'white'}}>{rank - startRank}</p>
  }

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
    </>
  )
}

export default AdminFullStatPage
