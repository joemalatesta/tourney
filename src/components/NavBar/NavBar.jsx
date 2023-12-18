// npm modules
import { NavLink } from 'react-router-dom'

const NavBar = ({ user, handleLogout }) => {
  return (
    <nav className='red-felt'>
      {user ?
        <div className='nav-bar'>
          <NavLink to='/'>Welcome {user.name}</NavLink>
          {user.name === 'Admin' &&
          <>
            <NavLink to="/add-player">Add Player</NavLink>
            <NavLink to="/add-players-to-match">Add players to match</NavLink>
          </>
          }
          <NavLink to='/view-tournaments'>View Tournaments</NavLink>
          <NavLink></NavLink>
          <NavLink></NavLink>
          <NavLink to="/auth/change-password">Change Password</NavLink>
          <NavLink to="" onClick={handleLogout}>LOG OUT</NavLink>
        </div>
      :
        <div className='nav-bar'>
          <NavLink to='/'>Home</NavLink>
          <NavLink to='/view-tournaments'>View Tournaments</NavLink>
          <NavLink></NavLink>
          <NavLink to="/auth/login">Log In</NavLink>
          <NavLink to="/auth/signup">Sign Up</NavLink>
        </div>
      }
    </nav>
  )
}

export default NavBar
