import { useState } from "react"
import { NavLink } from "react-router-dom"

import AdminCreate from "../../components/Create/AdminCreate"
import Approvals from "../../components/Approvals/UserApprovals"
import EditSchedule from "../../components/EditSchedule/EditSchedule"

import * as playerService from '../../services/playerService'

const AdminPage = ({
  players,
  profiles,
  handleUpdateProfiles,
  handleDeleteSchedule,
  profile,
}) => {
  const [viewCreate, setViewCreate] = useState(false)

  const handleShowCreate = () => {
    setViewCreate(!viewCreate)
  }

  const resetPlayerStats = async () => {
    for (const player of players) {
      if (player && player._id) {
        try {
          const data = {...player,
            matchLoss : 0,
            matchWin : 0,
            matchesPlayed : 0
          }
          await playerService.update(data)
          console.log(`Player ${player.id} updated successfully.`);
        } catch (error) {
          console.error(`Error updating player ${player.id}:`, error);
        }
      } else {
        console.error("Invalid player object:", player);
      }
    }
    console.log("Players reset:", players);
  };
  

  return (
    <>
      <div className="fWrap">
        <NavLink className="bracket" to="/view-schedule">
          Schedule
        </NavLink>
        <NavLink className="bracket" to="/season-match">
          Match
        </NavLink>
        <NavLink className="bracket" to="/view-teams">
          View Teams
        </NavLink>
        <NavLink className="bracket" to="/view-tournaments">
          View Tournaments
        </NavLink>
        <NavLink className="bracket" to="/player-management">
          Player Management
        </NavLink>
        <NavLink className="bracket" to="/match-approval">
          Match Approval
        </NavLink>
        <NavLink className="bracket" to="/profiles">
          Profiles
        </NavLink>
        <div
          style={{ color: "antiquewhite" }}
          onClick={handleShowCreate}
          className="bracket"
        >
          Create
        </div>
      </div>
      <br />
      {viewCreate === true && <AdminCreate />}
      <br />
      <br />
      <Approvals
        profiles={profiles}
        handleUpdateProfiles={handleUpdateProfiles}
      />
      <br />
      <EditSchedule
        handleDeleteSchedule={handleDeleteSchedule}
        profile={profile}
      />
      <div className="bracket center column">
        <div>
          <h1 className="bracket center">DANGER ZONE</h1>
        </div>
        <br />
        <div>
          <p>
            To reset all players league stats back to 0. (games played, wins,
            loss) (rank will remain!) Press this button 
            <button onClick={()=> resetPlayerStats() } >ARE YOU SURE?</button>
          </p>
        </div>
      </div>
    </>
  )
}

export default AdminPage
