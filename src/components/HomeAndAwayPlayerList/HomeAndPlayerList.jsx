

const HomeAndAwayPlayerList = (props) => {
  console.log(props);
  
  return (
    <>
      <div>
        {props.table ? (
          <>
            <h2>
            Match : {props.match}

            </h2>
            <div>
              <h3>Home Team: {props.table.homeTeam?.teamName}</h3>
              <select
                value={props.homePlayer?._id || ""}
                onChange={(e) => {
                  const selectedPlayer = props.homePlayers.find(
                    (player) => player._id === e.target.value
                  );
                  props.setPlayerForMatch(selectedPlayer, "home", props.match);
                }}
              >
                <option value="" disabled>
                  Select a player
                </option>
                {props.homePlayers
                  .filter((player) => player && player._id)
                  .map((player) => (
                    <option key={player._id} value={player._id}>
                      {player.name} (Rank: {player.rank})
                    </option>
                  ))}
              </select>
            </div>
            <div>
              <h3>Away Team: {props.table.awayTeam?.teamName}</h3>
              <select
                value={props.awayPlayer?._id || ""}
                onChange={(e) => {
                  const selectedPlayer = props.awayPlayers.find(
                    (player) => player._id === e.target.value
                  );
                  props.setPlayerForMatch(selectedPlayer,"away", props.match);
                }}
              >
                <option value="" disabled>
                  Select a player
                </option>
                {props.awayPlayers
                  .filter((player) => player && player._id)
                  .map((player) => (
                    <option key={player._id} value={player._id}>
                      {player.name} (Rank: {player.rank})
                    </option>
                  ))}
              </select>
            </div>
          </>
        ) : (
          <>No teams to display</>
        )}
        {props.homePlayer !== null && props.awayPlayer !== null &&
        <>
          <button>Submit Match</button>
        </>
        
        
        
        }
      </div>
    </>
  );

}

export default HomeAndAwayPlayerList
