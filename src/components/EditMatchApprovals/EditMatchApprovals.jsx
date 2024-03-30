const EditMatchApprovals = ({ match0, match1 }) => {
  const handleChange = (loserGamesWon) => {
    console.log(loserGamesWon)
  }

  const editScreen = (
    <p>
      {match0.winningPlayer.name !== match1.winningPlayer.name && (
        <>
          Winning Player:
          <br />
          <p onClick={()=> handleChange(match0.winningPlayer)}>{match0.winningPlayer.name}</p><br />
          <p onClick={()=> handleChange(match1.winningPlayer)}>{match1.winningPlayer.name}</p>
        </>
      )}
      {match0.winnerGamesPlayed !== match1.winnerGamesPlayed && (
        <>
          Winner games won:
          <p onClick={()=> handleChange(match0.winnerGamesPlayed)}>{match0.winnerGamesPlayed}</p><br />
          <p onClick={()=> handleChange(match1.winnerGamesPlayed)}>{match1.winnerGamesPlayed}</p>
        </>
      )}
      {match0.losingPlayer.name !== match1.losingPlayer.name && (
        <>
          Losing Player:
          <br />
          <p onClick={() => handleChange(match0.losingPlayer)} >{match0.losingPlayer.name}</p>
          <br />
          <p onClick={() => handleChange(match1.losingPlayer)}>{match1.losingPlayer.name}</p>
          
        </>
      )}
      {match0.loserGamesPlayed !== match1.loserGamesPlayed && (
        <>
          Loser games won:
          <p
            className="center"
            onClick={() => handleChange(match0.loserGamesPlayed)}
          >
            {match0.loserGamesPlayed}
            <br />
          </p>
          <p className="center">or</p>
          <p
            className="center"
            onClick={() => handleChange(match1.loserGamesPlayed)}
          >
            {match1.loserGamesPlayed}
          </p>
        </>
      )}
    </p>
  )

  return <>{editScreen}</>
}

export default EditMatchApprovals
