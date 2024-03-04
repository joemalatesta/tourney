import { useState, useEffect } from 'react'

import * as scheduleService from '../../services/scheduleService'


const Schedule = () => {
  const [schedule, setSchedule] = useState()
  
  useEffect(() => {
    const fetchSchedule = async () => {
      const data = await scheduleService.index()
      setSchedule(data)
    }
    fetchSchedule()
  }, [])

  console.log(schedule);

  return (
    <>
    <div className='bracket'>
          {schedule?.map(sched => (
            <li key={sched._id}>
              {<span>{new Date(sched.name).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: '2-digit' })}</span>}
            </li>
          ))}
    </div>
       
    </>
  )
}
 
export default Schedule