import { NavLink } from "react-router-dom"

const AdminPage = () => {

  return (
    <div className="fWrap">
      <NavLink className='bracket' to="/view-schedule">Schedule</NavLink>
      <NavLink className='bracket' to="/create-schedule">Create New Schedule</NavLink>
      <NavLink className='bracket' to="/season-match">Match</NavLink>
      <NavLink className='bracket' to="/player-management">Player Management</NavLink>
      <NavLink className='bracket' to="/create-team">Create Team</NavLink>
      <NavLink className='bracket' to="/view-teams">View Teams</NavLink>
      <NavLink className='bracket' to="/add-players-to-match">Create Tournament</NavLink>
      <NavLink className='bracket' to="/view-tournaments">View Tournaments</NavLink>
      <NavLink className='bracket' to="/auth/change-password">Change Password</NavLink>
      <NavLink className='bracket' to="/profiles">Profiles</NavLink>
    </div>
  )
}

export default AdminPage
