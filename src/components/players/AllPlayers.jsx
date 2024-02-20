import { useState } from "react"

const AllPlayers = (props) => {
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [playerToDelete, setPlayerToDelete] = useState(null)

  const handleChange = (player) => {
    props.changeTitle()
    const updatedPlayer = {
      ...player,
      name: player.name,
      rank: player.rank,
    }
    props.setFormData(updatedPlayer)
  }

  const handleDelete = (player) => {
    props.handleDeletePlayer(player._id)
  }

  const areYouSure = (player) => {
    setConfirmDelete(true)
    setPlayerToDelete(player)
  }

  const confirmDeleteAction = () => {
    handleDelete(playerToDelete)
    setConfirmDelete(false)
    setPlayerToDelete(null)
  }

  const cancelDeleteAction = () => {
    setConfirmDelete(false)
    setPlayerToDelete(null)
  }

  const sortedPlayers = props?.players
    ?.slice()
    .sort((a, b) => a.name.localeCompare(b.name))

  return (
    <div
      className="bracket"
      style={{
        flexDirection: "column",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {confirmDelete && (
        <div className="blue-felt">
          <p>Are you sure you want to delete {playerToDelete?.name}?</p>
          <button onClick={confirmDeleteAction}>Yes</button>
          <button onClick={cancelDeleteAction}>No</button>
        </div>
      )}
      {sortedPlayers?.map((player) => (
        <div
          className="flex"
          style={{
            flexDirection: "column",
            alignItems: "baseline",
          }}
          key={player._id}
        >
          <div className="flex" style={{ width: "300px" }}>
            <div className="flex">
              <button onClick={() => areYouSure(player)}>Delete</button>
            </div>
            <div className="flex">
              <button onClick={() => handleChange(player)}>Edit</button>
            </div>
            <div className="flex" style={{ width: "300px" }}>
              --{player.name} : {player.rank}
            </div>
          </div>
          <div className="flex end"></div>
        </div>
      ))}
    </div>
  )
}

export default AllPlayers
