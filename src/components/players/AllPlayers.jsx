const AllPlayers = (props) => {
  const handleEditPlayer = (id) => {
    console.log(id)
  }

  return (
    <div className="bracket ">
      {props?.players?.map((player) => (
        <div key={player._id}>
          {player.name} : {player.rank}
          <button onClick={() => handleEditPlayer(player._id)}>
            Edit Player
          </button>
          <button onClick={() => props.handleDeletePlayer(player._id)}>
            {" "}
            Delete
          </button>
        </div>
      ))}
    </div>
  )
}

export default AllPlayers
