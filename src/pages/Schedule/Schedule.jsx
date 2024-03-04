import { useState, useEffect } from 'react'

import ViewScheduleDate from '../../components/ViewScheduleDate/ViewScheduleDate'

import * as scheduleService from '../../services/scheduleService'

const Schedule = (props) => {
  const [schedule, setSchedule] = useState([]);

  console.log(props);

  useEffect(() => {
    const fetchSchedule = async () => {
      const data = await scheduleService.index()
      setSchedule(data)
    };
    fetchSchedule();
  }, []);

  const [displayedScheduleId, setDisplayedScheduleId] = useState(null);

  const handleShow = (scheduleId) => {
    setDisplayedScheduleId(scheduleId);
  };

  return (
    <>
      <div >
        {schedule.map((sched) => (
          <div className='row' onClick={() => handleShow(sched._id)} key={sched._id}>
            {sched.name}
            {displayedScheduleId === sched._id && <ViewScheduleDate setViewMatch={props.setViewMatch} match={sched} />}
          </div>
        ))}
      </div>
    </>
  );
};

export default Schedule;
