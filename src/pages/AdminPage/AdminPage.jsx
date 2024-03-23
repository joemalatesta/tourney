import { useState } from "react"
import { NavLink } from "react-router-dom"
import { playerData } from "../../../public/playerData.js"

import AdminCreate from "../../components/Create/AdminCreate"
import Approvals from "../../components/Approvals/UserApprovals"
import EditSchedule from "../../components/EditSchedule/EditSchedule"

import * as playerService from "../../services/playerService"
import * as teamService from "../../services/teamService"

const AdminPage = ({
  players,
  profiles,
  handleUpdateProfiles,
  handleDeleteSchedule,
  profile,
  teams,
}) => {
  const [viewCreate, setViewCreate] = useState(false)

  const handleShowCreate = () => {
    setViewCreate(!viewCreate)
  }

  const resetPlayerStats = async () => {
    for (const player of players) {
      if (player && player._id) {
        try {
          const data = {
            ...player,
            matchLoss: 0,
            matchWin: 0,
            matchesPlayed: 0,
          }
          await playerService.update(data)
          console.log(`Player ${player.id} updated successfully.`)
        } catch (error) {
          console.error(`Error updating player ${player.id}:`, error)
        }
      } else {
        console.error("Invalid player object:", player)
      }
    }
    console.log("Players reset:", players)
  }
  const resetTeamStats = async () => {
    for (const team of teams) {
      if (team && team._id) {
        try {
          const data = {
            ...team,
            loss: 0,
            wins: 0,
          }
          await teamService.update(data)
          console.log(`Team updated successfully.`)
        } catch (error) {
          console.error(`Error updating team ${team.id}:`, error)
        }
      } else {
        console.error("Invalid team object:", team)
      }
    }
    console.log("Teams reset:", teams)
  }

  const seedPeopleStats = async () => {
    try {
      for (const player of playerData) {
        await playerService.create(player)
      }
      console.log("Player data seeded successfully")
    } catch (error) {
      console.error("Error seeding player data:", error)
    }
  }

  return (
    <>
      <div className="fWrap">
        <NavLink className="bracket" to="/view-schedule">
          Schedule
        </NavLink>
        {/* <NavLink className="bracket" to="/season-match">
          Match
        </NavLink> */}
        <NavLink className="bracket" to="/view-teams">
          View Teams
        </NavLink>
        {/* <NavLink className="bracket" to="/view-tournaments">
          View Tournaments
        </NavLink> */}
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
      <div className="bracket center column">
        <h1 className="center">DANGER ZONE</h1>
        <h2>End of Season Maintenance</h2>
        <div>
          <EditSchedule
            handleDeleteSchedule={handleDeleteSchedule}
            profile={profile}
          />
        </div>
        <br />
        <div>
          <p className="bracket">
            To reset all players league stats back to 0. (games played, wins,
            loss) (rank will remain!) Press this button
            <button onClick={() => resetPlayerStats()}>ARE YOU SURE?</button>
          </p>
          <p className="bracket">
            To reset all Team league stats back to 0. (games played, wins, loss)
            Press this button
            <button onClick={() => resetTeamStats()}>ARE YOU SURE?</button>
          </p>
          <p className="bracket">
            Use this to seed the players data
            <button onClick={() => seedPeopleStats()}>Seed People</button>
          </p>
        </div>
      </div>
    </>
  )
}

export default AdminPage
