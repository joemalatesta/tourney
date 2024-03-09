import { useState, useEffect } from "react"

import * as scheduleService from "../../services/scheduleService"

const EditSchedule = ({ handleDeleteSchedule, profile }) => {
  const [schedules, setSchedules] = useState()
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [dateToDelete, setDateToDelete] = useState(null)

  useEffect(() => {
    const fetchDates = async () => {
      const data = await scheduleService.index()
      setSchedules(data)
    }
    fetchDates()
  }, [])

  const handleDelete = (date) => {
    handleDeleteSchedule(date._id)
  }

  const areYouSure = (player) => {
    setConfirmDelete(true)
    setDateToDelete(player)
  }

  const confirmDeleteAction = () => {
    handleDelete(dateToDelete)
    setConfirmDelete(false)
    setDateToDelete(null)
  }

  const cancelDeleteAction = () => {
    setConfirmDelete(false)
    setDateToDelete(null)
  }

  const deleteDisplay = (
        <div style={{ width: "700px" }}>
          <p>
            Are you sure you want to delete {dateToDelete?.name}?(This action
            cannot be undone!)
          </p>
          <button onClick={confirmDeleteAction}>Yes</button>
          <button onClick={cancelDeleteAction}>No</button>
        </div>)

  console.log(schedules)

  const handlePopUp = (date) => {
    console.log(date)
  }

  return (
    <>
      <h1>Date Maintenance</h1>
      {schedules?.map((date) => (
        <li onClick={() => handlePopUp(date)} key={date._id}>
          {date.name}  <button onClick={() => areYouSure(date)}>Delete</button>
          {date?.name === dateToDelete?.name && confirmDelete &&
              deleteDisplay}
        </li>
      ))}
    </>
  )
}

export default EditSchedule
