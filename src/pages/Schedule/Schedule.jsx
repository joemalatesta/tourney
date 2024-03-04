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
              {sched.name}
            </li>
          ))}
    </div>
       
    </>
  )
}
 
export default Schedule