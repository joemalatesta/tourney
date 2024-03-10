import { NavLink } from "react-router-dom"

import Approvals from "../../components/Approvals/UserApprovals"
import EditSchedule from "../../components/EditSchedule/EditSchedule"

const AdminPage = ({profiles, handleUpdateProfiles, handleDeleteSchedule, profile}) => {
  
  return (
    <>
      <div className="fWrap">
        <NavLink className="bracket" to="/view-schedule">Schedule</NavLink>
        <NavLink className="bracket" to="/create-schedule">Create New Schedule</NavLink>
        <NavLink className="bracket" to="/season-match">Match</NavLink>
        <NavLink className="bracket" to="/player-management">Player Management</NavLink>
        <NavLink className="bracket" to="/create-team">Create Team</NavLink>
        <NavLink className="bracket" to="/view-teams">View Teams</NavLink>
        <NavLink className="bracket" to="/add-players-to-match">Create Tournament</NavLink>
        <NavLink className="bracket" to="/view-tournaments">View Tournaments</NavLink>
        <NavLink className="bracket" to="/profiles">Profiles</NavLink>
        <NavLink className="bracket" to="/match-approval">Match Approval</NavLink>
      </div>
      <Approvals profiles={profiles} handleUpdateProfiles={handleUpdateProfiles}/>
      <br/>
      <EditSchedule handleDeleteSchedule={handleDeleteSchedule} profile={profile}/>
    </>
  )
}

export default AdminPage
