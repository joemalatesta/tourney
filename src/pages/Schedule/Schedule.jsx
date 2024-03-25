import { useState, useEffect } from "react"

import ViewScheduleDate from "../../components/ViewScheduleDate/ViewScheduleDate"

import * as scheduleService from "../../services/scheduleService"

const Schedule = (props) => {
  const [schedule, setSchedule] = useState([])

  useEffect(() => {
    const fetchSchedule = async () => {
      const data = await scheduleService.index()
      setSchedule(data)
    }
    fetchSchedule()
  }, [])

  const [displayedScheduleId, setDisplayedScheduleId] = useState(null)

  const handleShow = (scheduleId) => {
    setDisplayedScheduleId(scheduleId)
  }

  return (
    <>
      <div className="bracket">
        {schedule.length === 0 && <h1>Nothing scheduled yet</h1>}
        {schedule.map((sched) => (
          <div
            onClick={() => handleShow(sched._id)}
            className="center"
            key={sched._id}
          >
            {sched.name}
            <div className="row center fWrap">
              {displayedScheduleId === sched._id && (
                <ViewScheduleDate
                  setViewMatch={props.setViewMatch}
                  match={sched}
                  setMatchId={props.setMatchId}
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default Schedule
