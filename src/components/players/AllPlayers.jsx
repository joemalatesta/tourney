import { useState } from 'react';

const AllPlayers = (props) => {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [playerToDelete, setPlayerToDelete] = useState(null);

  const handleChange = (player) => {
    props.changeTitle();
    const updatedPlayer = {
      ...player,
      name: player.name,
      rank: player.rank,
    };
    props.setFormData(updatedPlayer);
  };

  const handleDelete = (player) => {
    props.handleDeletePlayer(player._id);
  };

  const areYouSure = (player) => {
    setConfirmDelete(true);
    setPlayerToDelete(player);
  };

  const confirmDeleteAction = () => {
    handleDelete(playerToDelete);
    setConfirmDelete(false);
    setPlayerToDelete(null);
  };

  const cancelDeleteAction = () => {
    setConfirmDelete(false);
    setPlayerToDelete(null);
  };
  
  return (
    <div className="bracket flex" style={{ flexDirection: "column", width: '90%',justifyContent:'center', alignItems:'center' }}>
      {confirmDelete && (
        <div className='red-felt' >
          <p>Are you sure you want to delete {playerToDelete?.name}?</p>
          <button onClick={confirmDeleteAction}>Yes</button>
          <button onClick={cancelDeleteAction}>No</button>
        </div>
      )}
      {props?.players?.map((player) => (
        <div className="flex bracket 33" style={{ flexDirection: 'column', alignItems:'baseline', width:'300px'}} key={player._id}>
          <div className="flex">
            <div className="flex">
              <button onClick={() => areYouSure(player)}>Delete</button>
            </div>
            <div className="flex">
              <button onClick={() => handleChange(player)}>Edit</button>
            </div>
            <div className="flex">
              ----------{player.name} : {player.rank}
            </div>
          </div>
          <div className="flex end"></div>
        </div>
      ))}
    </div>
  );
};

export default AllPlayers;
