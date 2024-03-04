import { useNavigate } from "react-router-dom"

const ViewScheduleDate = ({match, setViewMatch}) => {
  const navigate= useNavigate()
  console.log(match)


  const handleViewMatch = (match) => {
    setViewMatch(match)
    console.log(match)
    navigate("/match")
  }

  return (
    <>
          {match?.matches.map((match, idx) => (
        <div onClick={()=>handleViewMatch(match)} className="bracket" key={idx}>
          <h2>Table : {match.usedTable}</h2>
          <li>Home Team : {match.homeTeam.teamName}</li>
          <li>Visitor : {match.visitor.teamName}</li>
        </div>
      ))}
    </>
  )
}
 
export default ViewScheduleDate