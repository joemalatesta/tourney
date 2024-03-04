import { useState } from "react"

import * as scheduleService from '../../services/scheduleService'

const CreateSchedule = (props) => {
  const [date, setDate] = useState("")
  const [homeTeam, setHomeTeam] = useState(null)
  const [visitor, setVisitor] = useState(null)
  const [table, setTable] = useState([1, 2, 3, 4])
  const [matches, setMatches] = useState([])
  const [adjustedTeams, setAdjustedTeams] = useState(props.teams)
  const [usedTable, setUsedTable] = useState()
  const [byeTeam, setByeTeam] = useState('')
  const [disabled, setDisabled] = useState(false)

  const handleChangeDate = (event) => {
    setDate(event.target.value)
  }

  const handleChangeTable = (evt) => {
    setUsedTable(evt.target.value)
  }

  const handleSelectTeam = (team) => {
    if (homeTeam === null) setHomeTeam(team)
    if (visitor === null && homeTeam !== null){
      setVisitor(team) 
      setDisabled(true)
    } 
    setAdjustedTeams(adjustedTeams.filter((el) => el._id !== team._id))
    
  }

  const handleSubmitMatch = () => {
    if (matches.length < 4) {
      setMatches([...matches, { homeTeam, visitor, usedTable }])
      setTable(table.filter((el) => el !== parseInt(usedTable)))
      setHomeTeam(null)
      setVisitor(null)
      setUsedTable(null)
    }
    if (adjustedTeams.length === 1) {
      setByeTeam(adjustedTeams[0])
    }
    setDisabled(false)
  }

  const completedForm = (date !== '' && matches.length == 4 && byeTeam !== '')

  const handleSubmitToSchedule = () => {
    scheduleService.create({
      name: date,
      matches: matches,
      bye: byeTeam
    })
    console.log(matches, byeTeam, date);
  }

  return (
    <div className="bracket">
      <h1>Create Match Here</h1>
      <h2>
      {date === "" ? (
  <div>
    <label>Date</label>
    <input
      type="date"
      value={date}
      onChange={handleChangeDate}
    />
  </div>
) : (
  <span>{new Date(date).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: '2-digit' })}</span>
)}
      </h2>
      {matches.length < 4 && (
        <>
          <h2>
            Home - {homeTeam === null ? "Pick a team" : homeTeam?.teamName}
          </h2>
          <h2>
            Visitors - {visitor === null ? "Pick a team" : visitor?.teamName}
          </h2>

          <h2>table: {usedTable}</h2>
        </>
      )}
      {matches.length < 4 && (
        <>
        <button onClick={() => handleSubmitMatch()}>submit match</button>
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
              {table.map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </div>
          <h2>
            Pick the{" "}
            {visitor === null && homeTeam !== null ? "Visitor" : "Home"} Team:
          </h2>
          {adjustedTeams?.map((team) => (
            <ul style={{ color: "white" }} key={team._id}>
              <button disabled={disabled} onClick={() => handleSelectTeam(team)}>{team.teamName}</button>
            </ul>
          ))}
        </>
      )}

      {matches?.map((match, idx) => (
        <div className="bracket" key={idx}>
          <h2>Table : {match.usedTable}</h2>
          <li>Home Team : {match.homeTeam.teamName}</li>
          <li>Visitor : {match.visitor.teamName}</li>
        </div>
      ))}
      <h1>Bye</h1><h2>{byeTeam?.teamName}</h2>
      {completedForm &&
        <button onClick={()=>handleSubmitToSchedule()}>Submit to Schedule</button> 
      }
    </div>
  )
}

export default CreateSchedule
