const MatchHandler = ({
  match1,
  match2,
  match3,
  handleViewSingleMatch,
  handleSetPlayers,
  color
}) => {
  return (
    <>
        <div className="center">
          {match1 !== null && (
            <div
              className="bracket"
              onClick={() => handleViewSingleMatch(match1)}
            >
              <p style={{ color: "green" }}>Click for Match</p>
              {match1?.map((player) => (
                <li key={player._id}>{player.name}</li>
              ))}
            </div>
          )}
          {match2 === null && (
          <button
            className="bracket"
            style={{ backgroundColor: `${color}` }}
            onClick={() => handleSetPlayers()}
          >
            {color === "red" ? "Choose Players For Match" : "Match 2"}
          </button>
        )}
          {match2 !== null && (
            <div
              className="bracket"
              onClick={() => handleViewSingleMatch(match1)}
            >
              <p style={{ color: "green" }}>Click for Match</p>
              {match2?.map((player) => (
                <li key={player._id}>{player.name}</li>
              ))}
            </div>
          )}
          {match3 === null && (
          <button
            className="bracket"
            style={{ backgroundColor: `${color}` }}
            onClick={() => handleSetPlayers()}
          >
            {color === "red" ? "Choose Players For Match" : "Match 3"}
          </button>
        )}
          {match3 !== null && (
            <div
              className="bracket"
              onClick={() => handleViewSingleMatch(match1)}
            >
              <p style={{ color: "green" }}>Click for Match</p>
              {match2?.map((player) => (
                <li key={player._id}>{player.name}</li>
              ))}
            </div>
          )}
        </div>

    </>
  )
}
 
export default MatchHandler