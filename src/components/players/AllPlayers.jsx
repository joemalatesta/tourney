import { useState } from "react"

import * as styles from "./AllPlayers.module.css"

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

  const deleteDisplay = (
    <div className={styles.blueFelt} style={{ width: "700px" }}>
      <p>
        Are you sure you want to delete {playerToDelete?.name}?(This action
        cannot be undone!)
      </p>
      <button onClick={confirmDeleteAction}>Yes</button>
      <button onClick={cancelDeleteAction}>No</button>
    </div>
  )

  return (
    <div className={styles.bracket}>
      {sortedPlayers?.map((player) => (
        <div key={player._id}>
          <div style={{ width: "800px", display: "flex" }}>
            <div>
              <button onClick={() => areYouSure(player)}>Delete</button>
            </div>
            <div>
              <button onClick={() => handleChange(player)}>Edit</button>
            </div>
            <div className={styles.w300}>
              --{player.name} : {player.rank}
            </div>
            {player?.name === playerToDelete?.name &&
              confirmDelete &&
              deleteDisplay}
          </div>
        </div>
      ))}
    </div>
  )
}

export default AllPlayers