import { NavLink } from "react-router-dom"
import * as styles from "./NavBar.module.css"

const NavBar = ({ user, handleLogout }) => {
  return (
    <nav className={styles.redFelt}>
      {user ? (
        <div className={styles.navBar}>
          <NavLink to="/">Welcome {user.name}</NavLink>
          <NavLink to="/view-tournaments">View Tournaments</NavLink>
          <NavLink to="/view-teams">View Teams</NavLink>
          <NavLink to="/auth/change-password">Change Password</NavLink>
          <NavLink to="" onClick={handleLogout}>
            LOG OUT
          </NavLink>
        </div>
      ) : (
        <div className={styles.navBar}>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/view-tournaments">View Tournaments</NavLink>
          <NavLink to="/view-teams">View Teams</NavLink>
          <NavLink to="/auth/login">Log In</NavLink>
          <NavLink to="/auth/signup">Sign Up</NavLink>
        </div>
      )}
    </nav>
  )
}

export default NavBar
