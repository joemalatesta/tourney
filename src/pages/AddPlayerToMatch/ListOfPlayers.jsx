

const ListOfPlayers = (props) => {
  return (
    <div className="green-felt bracket ">
      <h2>{props.title}</h2>
      <ul >
        {props.players?.map(player => (
          <div key={player._id}>
            {player.name} - {player.rank}
            {props.handleAddItem
              ? <button onClick={() => props.handleAddItem(player)}> ADD </button>
              : <button onClick={() => props.handleRemoveItem(player)}> REMOVE </button>
            }
          </div>
        ))}
      </ul>
    </div>
  )
}

export default ListOfPlayers