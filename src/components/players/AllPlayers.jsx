const AllPlayers = (props) => {

  const handleChange = (player) => {
    console.log(player)
    props.changeTitle()
    const updatedPlayer = {
      ...player,
      name: player.name, 
      rank: player.rank, 
    }
    props.setFormData(updatedPlayer)
  }

  const handleDelete = (player) =>{
    props.handleDeletePlayer(player._id)
  }
  return (
    <div className="bracket ">
      {props?.players?.map((player) => (
        <div className="flex bracket " key={player._id}>
          <div className="">
           {player.name} : {player.rank}
           <div className="center">
            <button onClick={() => handleChange(player)}>Edit</button>
            <button onClick={() => handleDelete(player)}>Delete</button>
           </div>
          </div>
          <div className="flex end">
          </div>
        </div>
      ))}
    </div>
  )
}

export default AllPlayers
