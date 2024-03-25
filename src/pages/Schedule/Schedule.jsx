import { useState, useEffect } from "react";
import ViewScheduleDate from "../../components/ViewScheduleDate/ViewScheduleDate";
import * as scheduleService from "../../services/scheduleService";

const Schedule = (props) => {
  const [schedule, setSchedule] = useState([]);
  const [view, setView] = useState(null);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const fetchSchedule = async () => {
      const data = await scheduleService.index();
      setSchedule(data);
    };
    fetchSchedule();
  }, []);

  const handleShow = (sched) => {
    setView(
      <ViewScheduleDate
        setViewMatch={props.setViewMatch}
        match={sched}
        setMatchId={props.setMatchId}
      />
    );
  };

  const handleSelect = (schedId) => {
    setSelected(schedId);
  };

  return (
    <>
      <div className="bracket flex fWrap padding">
        {schedule.length === 0 && <h1>Nothing scheduled yet</h1>}
        {schedule.map((sched) => (
          <div
            onClick={() => {
              handleShow(sched);
              handleSelect(sched._id);
            }}
            className={`flex center round-border padding ${selected === sched._id ? 'selected' : ''}`}
            key={sched._id}
          >
            <div className="center flex">{sched.name}</div>
            <div className="row center fWrap padding"></div>
          </div>
        ))}
      </div>
      <div className="fWrap">{view}</div>
    </>
  );
};

export default Schedule;
