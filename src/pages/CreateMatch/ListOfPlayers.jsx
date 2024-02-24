const ListOfPlayers = (props) => {
  console.log(props);
  let sortedPlayers

  if(props.players.length > 0){
    sortedPlayers = props?.players?.slice().sort((a, b) => a?.name.localeCompare(b?.name))
  }



  return (
    <div className="green-felt bracket">
      <h2>{props.title}</h2>
      {props.title === 'Assigned to Team' && 
        <>
          <h3>Team Captain</h3>
          {props.captain === null ? 'Add Captain' : props.captain.name}
        </>
      }
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
            {player.name} - {player.rank}  {props.title === 'Assigned to Team' && <button onClick={()=>props.addCaptain(player)}>Add as Captain</button>}
          </div>
        ))}
      </ul>
    </div>
  )
}

export default ListOfPlayers
