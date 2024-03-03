import { useState } from "react"

// import * as scheduleService from '../../services/scheduleService'

const CreateSchedule = (props) => {
  const [enteredDate, setEnteredDate] = useState('')
  const [homeTeam, setHomeTeam] = useState(null)
  const [visitor, setVisitor] = useState(null)
  const [table, setTable] = useState(null)
  const [matches, setMatches] = useState([])
  const [usedTeams, setUsedTeams] = useState([])

  // const [formData, setFormData] = useState({
  //   homeTeam: { homeTeam },
  //   visitor: { visitor },
  //   table: { table },
  // })

  const handleChangeDate = (event) => {
    setEnteredDate(event.target.value)
  }

  const handleChangeTable = (evt) => {
    setTable(evt.target.value)
  }

  const handleSelectTeam = (team) => {
    if (homeTeam === null) setHomeTeam(team)
    if (visitor === null && homeTeam !== null) setVisitor(team)
  }

  const handleSubmitMatch = () => {
    if(matches.length < 5){
      setMatches([...matches, {homeTeam, visitor, table}])
    }
    setHomeTeam(null)
    setVisitor(null)
    setTable(null)
  }

  console.log(matches);
  return (
    <div className="bracket">
      <h1>Create Match Here</h1>
      <h2>
        {enteredDate === null ? (
          <div>
            <label>Date</label>
            <input
              type="date"
              value={enteredDate}
              onChange={handleChangeDate}
            />
          </div>
        ) : (
          enteredDate
        )}
      </h2>
      <h2>Home - {homeTeam === null ? "Pick a team" : homeTeam?.teamName}</h2>
      <h2>Visitors - {visitor === null ? "Pick a team" : visitor?.teamName}</h2>
      <h2>table: {table}</h2>

      <button onClick={()=> handleSubmitMatch()}>submit match</button>

      <h2>
        Pick the {visitor === null && homeTeam !== null ? "Visitor" : "Home"}{" "}
        Team:
      </h2>
      {props?.teams?.map((team) => (
        <ul style={{ color: "white" }} key={team._id}>
          <li onClick={() => handleSelectTeam(team)}>{team.teamName}</li>
        </ul>
      ))}
      <div
        type="text"
        id="table"
        name="table"
        value={table}
        onChange={handleChangeTable}
        required
      >
        Choose the table -
        <select name="table" id="table">
          <option value="">pick a table</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>
      </div>
      <p>
        need to have the rank of the player(at the time the match is being
        played)
      </p>
      <p>need to have Bye team</p>
    </div>
  )
}

export default CreateSchedule
