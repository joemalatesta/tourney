import { NavLink } from "react-router-dom"
import * as styles from "./ScorekeeperNavBar.module.css"

const ScorekeeperNavBar = ({ user, handleLogout }) => {
  return (
    <>
      <nav className={styles.redFelt}>
        <div className={styles.navBar}>
          <NavLink to="/">Welcome {user.name}</NavLink>
          <NavLink to="/view-schedule">Schedule</NavLink>
          <NavLink to="/season-match">Season Match</NavLink>
          <NavLink to="/view-teams">View Teams</NavLink>
          <NavLink to="/auth/change-password">Change Password</NavLink>
          <NavLink to="" onClick={handleLogout}>
            LOG OUT
          </NavLink>
        </div>
      </nav>
    </>
  )
}

export default ScorekeeperNavBar