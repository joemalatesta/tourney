import { NavLink } from "react-router-dom"
import * as styles from "./NavBar.module.css"

const NavBar = ({ user, handleLogout, profile }) => {
  console.log(profile)
  return (
    <nav className={styles.redFelt}>
      {profile?.accessLevel === 90 && (
        <div className={styles.navBar}>
          <NavLink to="/">Welcome {profile.firstName}</NavLink>
          <NavLink to="/admin">Admin Page</NavLink>
          <NavLink to="" onClick={handleLogout}>
            LOG OUT
          </NavLink>
        </div>
      )}

      {profile?.accessLevel === 10 && (
        <nav>
          <NavLink to="" onClick={handleLogout}>
            LOG OUT
          </NavLink>
        </nav>
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

// ? (
//   <div className={styles.navBar}>
//     <NavLink to="/">Welcome {user.name}</NavLink>
//     <NavLink to="/view-teams">View Teams</NavLink>
//     <NavLink to="/view-schedule">Schedule</NavLink>
//     <NavLink to="/auth/change-password">Change Password</NavLink>
//     <NavLink to="" onClick={handleLogout}>
//       LOG OUT
//     </NavLink>
//   </div>
// ) : (

// )}
