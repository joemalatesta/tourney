import { NavLink } from "react-router-dom"

const AdminCreate = () => {
  return (
    <>
      <NavLink className="bracket" to="/create-schedule">
        Create New Schedule
      </NavLink>
      <NavLink className="bracket" to="/create-team">
        Create Team
      </NavLink>
      <NavLink className="bracket" to="/add-players-to-match">
        Create Tournament
      </NavLink>
      <NavLink className="bracket" to="/create-session">
        Create Session
      </NavLink>
    </>
  )
}

export default AdminCreate
