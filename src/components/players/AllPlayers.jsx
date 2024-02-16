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
  return (
    <div className="bracket ">
      {props?.players?.map((player) => (
        <div key={player._id}>
          {player.name} : {player.rank}
          <button onClick={() => handleChange(player)}>Edit</button>
        </div>
      ))}
    </div>
  )
}

export default AllPlayers
