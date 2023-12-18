

const AllPlayers = (props) => {


  return ( 
    <div className="bracket ">
      {props?.players?.map(player => (
        <div key={player._id}>
          {player.name} : {player.rank}
          <button onClick={()=> props.handleDeletePlayer(player._id)}> Delete</button>
        </div>
      ))}
    </div>
    );
  }
  
  export default AllPlayers;
  