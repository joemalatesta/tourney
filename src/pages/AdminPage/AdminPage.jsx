import { useState } from "react"
import { NavLink } from "react-router-dom"

import AdminCreate from "../../components/Create/AdminCreate"
import Approvals from "../../components/Approvals/UserApprovals"
import EditSchedule from "../../components/EditSchedule/EditSchedule"

const AdminPage = ({profiles, handleUpdateProfiles, handleDeleteSchedule, profile}) => {
  const [viewCreate, setViewCreate] = useState(false)

  const handleShowCreate = () => {
    setViewCreate(!viewCreate)
  }

  return (
    <>
      <div className="fWrap">
        <NavLink className="bracket" to="/view-schedule">Schedule</NavLink>
        <NavLink className="bracket" to="/season-match">Match</NavLink>
        <NavLink className="bracket" to="/view-teams">View Teams</NavLink>
        <NavLink className="bracket" to="/view-tournaments">View Tournaments</NavLink>
        <NavLink className="bracket" to="/player-management">Player Management</NavLink>
        <NavLink className="bracket" to="/match-approval">Match Approval</NavLink>
        <NavLink className="bracket" to="/profiles">Profiles</NavLink>
        <div style={{color: 'antiquewhite'}} onClick={handleShowCreate} className="bracket">Create</div>
        
      </div>
      <br/>
        {viewCreate === true &&
          <AdminCreate/>
        }<br/>
        <br/>
      <Approvals profiles={profiles} handleUpdateProfiles={handleUpdateProfiles}/>
      <br/>
      <EditSchedule handleDeleteSchedule={handleDeleteSchedule} profile={profile}/>
    </>
  )
}

export default AdminPage
