import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import * as sessionService from "../../services/sessionService"

const CreateSession = () => {
  const navigate = useNavigate()
  const [completeDate, setCompleteDate] = useState()
  const [dates, setDates] = useState()
  const [date, setDate] = useState("")


  useEffect(() => {
    const getDates = async () => {
      const data = await sessionService.index()
      setDates(data)
    }
    getDates()
  }, [])

  useEffect(() => {}, [dates]);

  const handleSubmitToSchedule = async () => {
    await sessionService.create({
      completed: false,
      date: date,
    })
    const data = await sessionService.index()
    setDates(data)
  }

  const handleChangeDate = (event) => {
    let date = event.target.value
    setCompleteDate(date)
    let cutDate = date.slice(5, 10)
    setDate(cutDate)
  }
  console.log(dates)

  const handleShowDate = (date) => {
    const state = {
      sessionId: date._id,
    }
    const queryString = new URLSearchParams(state).toString()
    navigate(`/createSessionMatch?${queryString}`)
  }

  return (
    <>
      <div>
        <label>Date</label>
        <input type="date" value={completeDate} onChange={handleChangeDate} />
      </div>
      <button onClick={handleSubmitToSchedule}>Submit Date to Session</button>
      <br />
      {dates?.map((singleDate) => (
        <li onClick={()=>handleShowDate(singleDate)} key={singleDate._id}>{singleDate.date}</li>
      ))}
      <br />
    </>
  )
}

export default CreateSession