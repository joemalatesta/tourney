import { useState } from "react"

// import * as scheduleService from '../../services/scheduleService'

const CreateSchedule = (props) => {
  const [enteredDate, setEnteredDate] = useState('')
  const [homeTeam, setHomeTeam] = useState(null)
  const [visitor, setVisitor] = useState(null)
  const [table, setTable] = useState([1,2,3,4])
  const [matches, setMatches] = useState([])
  const [adjustedTeams, setAdjustedTeams] = useState(props.teams)
  const [usedTable, setUsedTable] = useState()


  const handleChangeDate = (event) => {
    setEnteredDate(event.target.value)
  }

  const handleChangeTable = (evt) => {
    setUsedTable(evt.target.value)
  }

  const handleSelectTeam = (team) => {
    if (homeTeam === null) setHomeTeam(team)
    if (visitor === null && homeTeam !== null) setVisitor(team)
    setAdjustedTeams(adjustedTeams.filter((el) => el._id !== team._id))
  }

  const handleSubmitMatch = () => {
    if(matches.length < 5){
      console.log(usedTable);
      setMatches([...matches, {homeTeam, visitor, usedTable}])
      setTable(table.filter((el) => el !== parseInt(usedTable))
      )
    }
    setHomeTeam(null)
    setVisitor(null)
    setUsedTable(null)
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
      <h2>table: {usedTable}</h2>

      <button onClick={()=> handleSubmitMatch()}>submit match</button>

      <div
        type="text"
        id="table"
        name="table"
        value={usedTable}
        onChange={handleChangeTable}
        required
      >
        Choose the table -
        <select name="table" id="table">
          <option value="">pick a table</option>
          {table.map(num => (
            <option key={num} value={num}>{num}</option> 
          ))}
        </select>
      </div>
      <h2>
        Pick the {visitor === null && homeTeam !== null ? "Visitor" : "Home"}{" "}
        Team:
      </h2>
      {adjustedTeams.map((team) => (
        <ul style={{ color: "white" }} key={team._id}>
          <li onClick={() => handleSelectTeam(team)}>{team.teamName}</li>
        </ul>
      ))}
      <p>
        need to have the rank of the player(at the time the match is being
        played)
      </p>
      <p>need to have Bye team</p>
    </div>
  )
}

export default CreateSchedule
