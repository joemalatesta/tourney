import { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"

import * as sessionService from "../../services/sessionService"
import * as tableService from "../../services/tableService"

const CreateMatchForSession = (props) => {
  const navigate = useNavigate()
  const location = useLocation()
  const [homeTeam, setHomeTeam] = useState(null)
  const [awayTeam, setAwayTeam] = useState(null)
  const [table, setTable] = useState([1, 2, 3, 4])
  const [adjustedTeams, setAdjustedTeams] = useState(props.teams)
  const [matches, setMatches] = useState([])
  const [usedTable, setUsedTable] = useState()
  const [table1, setTable1] = useState(null)
  const [table2, setTable2] = useState(null)
  const [table3, setTable3] = useState(null)
  const [table4, setTable4] = useState(null)
  const queryString = location.search
  const params = new URLSearchParams(queryString)
  const sessionId = params.get("sessionId")

  const handleSubmitToSchedule = () => {
    const updatedSession = {
      _id: sessionId,
      completed: false,
      table1: table1,
      table2: table2,
      table3: table3,
      table4: table4,
    }
    sessionService.update(updatedSession)
    // navigate("/session")
  }

  const handleSelectTeam = (team) => {
    if (homeTeam === null) setHomeTeam(team)
    if (awayTeam === null && homeTeam !== null) {
      setAwayTeam(team)
    }
    if (homeTeam === null || awayTeam === null)
      setAdjustedTeams(adjustedTeams.filter((el) => el._id !== team._id))
  }

  useEffect(() => {}, [])

  const handleNavigateToSession = () => {
    navigate("/session")
  }

  const handleChangeTable = (evt) => {
    setUsedTable(evt.target.value)
  }

  const handleSubmitMatch = async () => {
    if (matches.length < 4) {
      if (usedTable === "1") {
        const createdTable = await tableService.create({
          homeTeam: homeTeam,
          awayTeam: awayTeam,
          tableNumber: 1,
        })
        setTable1(createdTable)
      }
      if (usedTable === "2") {
        const createdTable = await tableService.create({
          homeTeam: homeTeam,
          awayTeam: awayTeam,
          tableNumber: 2,
        })
        setTable2(createdTable)
      }
      if (usedTable === "3") {
        const createdTable = await tableService.create({
          homeTeam: homeTeam,
          awayTeam: awayTeam,
          tableNumber: 3,
        })
        setTable3(createdTable)
      }
      if (usedTable === "4") {
        const createdTable = await tableService.create({
          homeTeam: homeTeam,
          awayTeam: awayTeam,
          tableNumber: 4,
        })
        setTable4(createdTable)
      }

      setTable(table.filter((el) => el !== parseInt(usedTable)))
      setHomeTeam(null)
      setAwayTeam(null)
      setUsedTable(null)
    }
    await setMatches([...matches])
  }


  const completedForm =
    table1 !== null && table2 !== null && table3 !== null && table4 !== null
  const completedMatch =
    homeTeam !== null && awayTeam !== null && usedTable !== null

  return (
    <>
      {matches?.length < 4 && (
        <>
          <h2>
            Home - {homeTeam === null ? "Pick a team" : homeTeam?.teamName}
          </h2>
          <h2>
            Visitors - {awayTeam === null ? "Pick a team" : awayTeam?.teamName}
          </h2>

          <h2>table: {usedTable}</h2>
        </>
      )}
      {matches?.length < 4 && (
        <>
          <button
            disabled={!completedMatch}
            onClick={() => handleSubmitMatch()}
          >
            submit match
          </button>

          <h2>
            Pick the{" "}
            {awayTeam === null && homeTeam !== null ? " Away" : " Home"} Team:
          </h2>
          {adjustedTeams?.map((team) => (
            <ul style={{ color: "white" }} key={team._id}>
              <button
                disabled={completedForm}
                onClick={() => handleSelectTeam(team)}
              >
                {team.teamName}
              </button>
            </ul>
          ))}
        </>
      )}
      <div>
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
            <option value="table">Pick a Table</option>
            {table.map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>
      </div>
      <br />
      <br />
      <button onClick={handleNavigateToSession}>To Sessions</button>
      {completedForm && (
        <button onClick={() => handleSubmitToSchedule()}>
          Submit to Schedule
        </button>
      )}
      {/* {matches?.map((match, idx) => (
        <div className="bracket" key={idx}>
          <h2>Table : {match.usedTable}</h2>
          <li>Home Team : {match.homeTeam.teamName}</li>
          <li>Visitor : {match.visitor.teamName}</li>
        </div>
      ))} */}
    </>
  )
}

export default CreateMatchForSession
