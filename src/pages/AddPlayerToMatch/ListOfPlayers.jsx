const ListOfPlayers = (props) => {
  return (
    <div className="green-felt bracket" style={{width:'275px'}}>
      <h2>{props.title}</h2>
      <ul>
        {props.players?.map((player) => (
          <div key={player._id}>
            {props.handleAddItem ? (
              <button onClick={() => props.handleAddItem(player)}> ADD </button>
            ) : (
              <button onClick={() => props.handleRemoveItem(player)}>
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
