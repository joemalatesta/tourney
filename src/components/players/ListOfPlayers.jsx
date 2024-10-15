import * as styles from "./Player.module.css"

const ListOfPlayers = (props) => {
  let sortedPlayers

  if (props.players.length > 0) {
    sortedPlayers = props?.players
      ?.slice()
      .sort((a, b) => a?.name.localeCompare(b?.name))
  }

  return (
    <div>
      <h2 className={styles.bracket}>{props.title}</h2>
      {props.title === "Assigned to Team" && (
        <p>
          Team Captain :{" "}
          {props.captain === null ? "Add Captain" : props.captain.name}
        </p>
      )}
      <ul>
        {props.players.map((player) => (
          <div key={player._id}>
            {props.handleAdd ? (
              <button onClick={() => props.handleAdd(player)}> + </button>
            ) : (
              <button onClick={() => props.handleRemove(player)}> X </button>
            )}
            {player.name} - {player.rank}{" "}
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
