import * as styles from "./Player.module.css"

const ListOfPlayers = (props) => {
  let captainId = props.captain

  function getPlayerNameById(players, id) {
    const player = players.find((p) => p._id === id)
    if (!player) return null
    return `${player.nameFirst} ${player.nameLast}`
  }

  let captain = getPlayerNameById(props.players, captainId)

  return (
    <div>
      <h2 className={styles.bracket}>{props.title}</h2>
      {props.title === "Assigned to Team" && (
        <p>Team Captain : {props.captain === null ? "Add Captain" : captain}</p>
      )}
      <ul>
        {props.players.map((player) => (
          <div key={player._id}>
            {props.handleAdd ? (
              <button onClick={() => props.handleAdd(player)}> + </button>
            ) : (
              <button onClick={() => props.handleRemove(player)}> X </button>
            )}
            {player.nameFirst} {player.nameLast} - {player.rank}{" "}
            {props.title === "Assigned to Team" && (
              <button onClick={() => props.addCaptain(player)}>Captain</button>
            )}
          </div>
        ))}
      </ul>
    </div>
  )
}

export default ListOfPlayers
