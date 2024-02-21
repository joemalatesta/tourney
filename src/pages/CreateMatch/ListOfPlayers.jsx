const ListOfPlayers = (props) => {
  const sortedPlayers = props?.players
    ?.slice()
    .sort((a, b) => a.name.localeCompare(b.name))

  return (
    <div className="green-felt bracket">
      <h2>{props.title}</h2>
      <p>{sortedPlayers.length} Number of available players</p>
      <ul>
        {sortedPlayers?.map((player) => (
          <div key={player._id}>
            {props.handleAdd ? (
              <button onClick={() => props.handleAdd(player)}> ADD </button>
            ) : (
              <button onClick={() => props.handleRemove(player)}>
                {" "}
                REMOVE{" "}
              </button>
            )}
            {player.name} - {player.rank}
          </div>
        ))}
      </ul>
    </div>
  )
}

export default ListOfPlayers
