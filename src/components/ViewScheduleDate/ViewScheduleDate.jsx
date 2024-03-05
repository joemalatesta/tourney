import { useNavigate } from "react-router-dom"

const ViewScheduleDate = ({ match, setViewMatch }) => {
  const navigate = useNavigate()

  const handleViewMatch = (match) => {
    setViewMatch(match)
    navigate("/match")
  }

  return (
    <>
      {match?.matches.map((match, idx) => (
        <div
          className="bracket w300 "
          onClick={() => handleViewMatch(match)}
          key={idx}
        >
          <h2>Table : {match.usedTable}</h2>
          <li>Home Team : {match.homeTeam.teamName}</li>
          <li>Visitor : {match.visitor.teamName}</li>
        </div>
      ))}
      <br />
    </>
  )
}

export default ViewScheduleDate
