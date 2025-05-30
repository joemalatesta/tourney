import { NavLink } from "react-router-dom"
import * as styles from "./NavBar.module.css"

const NavBar = ({ user, handleLogout, profile }) => {
  return (
    <nav className={styles.redFelt}>
      {profile?.accessLevel === 90 && (
        <div className={styles.navBar}>
          <NavLink to="/">Welcome {profile.firstName}</NavLink>
          <NavLink to="/session">Schedule</NavLink>
          <NavLink to="/scroll-wheel">Race Finder</NavLink>
          <NavLink to="/view-teams">View Teams</NavLink>
          <NavLink to="/admin">Admin Page</NavLink>
          <NavLink to="/auth/change-password">Change Password</NavLink>
          <NavLink to="" onClick={handleLogout}>
            LOG OUT
          </NavLink>
        </div>
      )}

      {profile?.accessLevel === 70 && (
        <div className={styles.navBar}>
          <NavLink to="/">Welcome {profile.firstName}</NavLink>
          <NavLink to="/scroll-wheel">Race Finder</NavLink>
          <NavLink to="/session">Schedule</NavLink>
          <NavLink to="/player-management">Player Management</NavLink>
          <NavLink to="/view-teams">View Teams</NavLink>
          <NavLink to="/scroll-wheel">Race Finder</NavLink>
          <NavLink to="/match-approval">Match Approval</NavLink>
          <NavLink to="/auth/change-password">Change Password</NavLink>
          <NavLink to="" onClick={handleLogout}>
            LOG OUT
          </NavLink>
        </div>
      )}

      {profile?.accessLevel >= 50 && profile.accessLevel < 70 && (
        <div className={styles.navBar}>
          <NavLink to="/">Welcome {profile.firstName} </NavLink>
          <NavLink to="/session">Schedule</NavLink>
          <NavLink to="/scroll-wheel">Race Finder</NavLink>
          <NavLink to="/view-teams">View Teams</NavLink>
          <NavLink to="/admin-stats-page">Player and Team Stats</NavLink>
          <NavLink to="/auth/change-password">Change Password</NavLink>
          <NavLink to="" onClick={handleLogout}>
            LOG OUT
          </NavLink>
        </div>
      )}

      {profile?.accessLevel > 10 && profile?.accessLevel < 50 && (
        <div className={styles.navBar}>
          <NavLink to="/">Welcome {profile.firstName} </NavLink>
          <NavLink to="/scroll-wheel">Race Finder</NavLink>
          <NavLink to="/view-teams">View Teams</NavLink>
          <NavLink to="/auth/change-password">Change Password</NavLink>
          <NavLink to="" onClick={handleLogout}>
            LOG OUT
          </NavLink>
        </div>
      )}

      {profile?.accessLevel === 10 && (
        <div className={styles.navBar}>
          <NavLink to="/">Welcome {profile.firstName} </NavLink>
          <NavLink to="/auth/change-password">Change Password</NavLink>
          <NavLink to="" onClick={handleLogout}>
            LOG OUT
          </NavLink>
        </div>
      )}

      {!user && (
        <div className={styles.navBar}>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/auth/login">Log In</NavLink>
          <NavLink to="/auth/signup">Sign Up</NavLink>
        </div>
      )}
    </nav>
  )
}

export default NavBar
