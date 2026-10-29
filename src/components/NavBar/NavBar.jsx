
import { useState, useEffect } from "react"
import { NavLink, useLocation } from "react-router-dom"
import * as styles from "./NavBar.module.css"

const NavBar = ({ user, handleLogout, profile }) => {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  let links = []

  if (profile?.accessLevel === 90) {
    links = [
      { to: "/", label: `Welcome ${profile.firstName}` },
      { to: "/session", label: "Schedule" },
      { to: "/scroll-wheel", label: "Race Finder" },
      { to: "/view-teams", label: "View Teams" },
      { to: "/admin", label: "Admin Page" },
      { to: "/auth/change-password", label: "Change Password" },
      { to: "/adjust-profile", label: "Profile" },
    ]
  } else if (profile?.accessLevel === 70) {
    links = [
      { to: "/", label: `Welcome ${profile.firstName}` },
      { to: "/scroll-wheel", label: "Race Finder" },
      { to: "/session", label: "Schedule" },
      { to: "/player-management", label: "Player Management" },
      { to: "/view-teams", label: "View Teams" },
      { to: "/scroll-wheel", label: "Race Finder" },
      { to: "/match-approval", label: "Match Approval" },
      { to: "/adjust-profile", label: "Profile" },
      { to: "/auth/change-password", label: "Change Password" },
    ]
  } else if (
    profile?.accessLevel >= 40 &&
    profile.accessLevel < 70
  ) {
    links = [
      { to: "/", label: `Welcome ${profile.firstName}` },
      { to: "/session", label: "Schedule" },
      { to: "/scroll-wheel", label: "Race Finder" },
      { to: "/view-teams", label: "View Teams" },
      { to: "/admin-stats-page", label: "Player and Team Stats" },
      { to: "/adjust-profile", label: "Profile" },
      { to: "/auth/change-password", label: "Change Password" },
    ]
  } else if (
    profile?.accessLevel > 10 &&
    profile.accessLevel < 40
  ) {
    links = [
      { to: "/", label: `Welcome ${profile.firstName}` },
      { to: "/session", label: "Schedule" },
      { to: "/scroll-wheel", label: "Race Finder" },
      { to: "/view-teams", label: "View Teams" },
      { to: "/auth/change-password", label: "Change Password" },
      { to: "/adjust-profile", label: "Profile" },
    ]
  } else if (profile?.accessLevel === 10) {
    links = [
      { to: "/", label: `Welcome ${profile.firstName}` },
      { to: "/auth/change-password", label: "Change Password" },
      { to: "/adjust-profile", label: "Profile" },
    ]
  } else if (!user) {
    links = [
      { to: "/", label: "Home" },
      { to: "/auth/login", label: "Log In" },
      { to: "/auth/signup", label: "Sign Up" },
    ]
  }

  const handleLinkClick = (to) => {
    setMenuOpen(false)

    if (to === "#logout") {
      handleLogout()
    }
  }

  return (
    <nav className={styles.redFelt}>
      <button
        type="button"
        className={styles.menuButton}
        onClick={() => setMenuOpen((open) => !open)}
        aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={menuOpen}
        aria-controls="main-navigation"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <div
        id="main-navigation"
        className={`${styles.navBar} ${
          menuOpen ? styles.menuOpen : ""
        }`}
      >
        {links.map((link, index) => (
          <NavLink
            key={`${link.to}-${index}`}
            to={link.to}
            onClick={() => handleLinkClick(link.to)}
          >
            {link.label}
          </NavLink>
        ))}

        {(user || profile) && (
          <NavLink
            to="/"
            onClick={(event) => {
              event.preventDefault()
              setMenuOpen(false)
              handleLogout()
            }}
          >
            LOG OUT
          </NavLink>
        )}
      </div>
    </nav>
  )
}

export default NavBar
