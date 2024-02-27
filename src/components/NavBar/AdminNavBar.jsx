import { NavLink } from "react-router-dom"
import * as styles from './AdminNavBar.module.css'

const AdminNavBar = ({user, handleLogout}) => {
  return (
    <>
    <nav className={styles.redFelt}>

       <div className={styles.navBar}>
          <NavLink to="/">Welcome {user.name}</NavLink>
          <NavLink to="/player-management">Player Management</NavLink>
          <NavLink to='/season-match'>Season Match</NavLink>
          <NavLink to="/create-team">Create Team</NavLink>
          <NavLink to="/view-teams">View Teams</NavLink>
          <NavLink to="/add-players-to-match">Create Match</NavLink>
          <NavLink to="/view-tournaments">View Tournaments</NavLink>
          <NavLink to="/auth/change-password">Change Password</NavLink>
          <NavLink to="" onClick={handleLogout}>
            LOG OUT
          </NavLink>
        </div>
    </nav>
    </>
  )
}
 
export default AdminNavBar