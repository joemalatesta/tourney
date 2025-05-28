import { NavLink } from "react-router-dom"

const AdminCreate = () => {
  return (
    <>
      <NavLink className="bracket" to="/create-team">
        Create Team
      </NavLink>
      <NavLink className="bracket" to="/create-session">
        Create Session
      </NavLink>
    </>
  )
}

export default AdminCreate
