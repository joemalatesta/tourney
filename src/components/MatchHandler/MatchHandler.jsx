const MatchHandler = ({ match1, match2, match3, handleSetPlayers, color, completeMatch }) => {

  return (
    <>
      <div className="column $$$">
        <div className="column">
          {match1 === null && (
            <button
            className="bracket"
            style={{ backgroundColor: `${color}` }}
            onClick={() => handleSetPlayers()}
            >
              {color === "red" ? "Choose Players For Match" : "Match 1"}
            </button>
          )}

          {match1 !== null && match2 === null && completeMatch.match1.completed === true && match3 === null && (
            <button
            className="bracket"
            style={{ backgroundColor: `${color}` }}
            onClick={() => handleSetPlayers()}
            >
              {color === "red" ? "Choose Players For Match" : "Match 2"}
            </button>
          )}
          {match1 !== null && match2 !== null && completeMatch.match2.completed === true && match3 === null && (
            <button
            className="bracket"
            style={{ backgroundColor: `${color}` }}
            onClick={() => handleSetPlayers()}
            >
              {color === "red" ? "Choose Players For Match" : "Match 3"}
            </button>
          )}
        </div>

        {match1 !== null && (
          <div className="bracket column">
            {match1?.map((player) => (
              <li key={player._id}>{player.name}</li>
              ))}
          </div>
        )}
        {match2 !== null && (
          <div className="bracket column">
            {match2?.map((player) => (
              <li key={player._id}>{player.name}</li>
              ))}
          </div>
        )}
        {match3 !== null && (
          <div className="bracket column">
            {match3?.map((player) => (
              <li key={player._id}>{player.name}</li>
              ))}
          </div>
        )}
      </div>
      
    </>
  )
}

export default MatchHandler
