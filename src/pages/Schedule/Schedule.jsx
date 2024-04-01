import { useState, useEffect } from "react"
import ViewScheduleDate from "../../components/ViewScheduleDate/ViewScheduleDate"
import * as scheduleService from "../../services/scheduleService"

const Schedule = (props) => {
  const [schedule, setSchedule] = useState([])
  const [view, setView] = useState(null)
  const [selected, setSelected] = useState(null)
  const [flippingItemId, setFlippingItemId] = useState(null)

  useEffect(() => {
    const fetchSchedule = async () => {
      const data = await scheduleService.index()
      setSchedule(data)
    }
    fetchSchedule()
  }, [])

  const handleShow = (sched) => {
    setView(
      <>
        <ViewScheduleDate
          setViewMatch={props.setViewMatch}
          match={sched}
          setMatchId={props.setMatchId}
        />
        <br/>
        <div className="bracket center">Bye Team: {sched?.bye?.teamName}</div>
      </>
    )
  }

  const handleSelect = (schedId) => {
    setSelected(schedId)
    setFlippingItemId(schedId)
  }

  return (
    <>
      <div className="bracket flex fWrap padding">
        {schedule.length === 0 && <h1>Nothing scheduled yet</h1>}
        {schedule.map((sched) => (
          sched.completed !== true && 
          <div
            onClick={() => {
              handleShow(sched)
              handleSelect(sched._id)
            }}
            className={`flex center round-border padding ${
              selected === sched._id ? "selected" : ""
            } ${flippingItemId === sched._id ? "flip" : ""}`}
            key={sched._id}
          >
            <div className="center flex">{sched.name}</div>
          </div>
        ))}
      </div>

      <div className="fWrap">{view}</div>
    </>
  )
}

export default Schedule
