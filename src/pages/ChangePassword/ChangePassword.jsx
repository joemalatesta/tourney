import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

import * as authService from "../../services/authService"
import * as styles from "./ChangePassword.module.css"

const ChangePassword = ({ handleAuthEvt }) => {
  const navigate = useNavigate()
  const [message, setMessage] = useState("")
  const [formData, setFormData] = useState({
    password: "",
    newPassword: "",
    newPasswordConf: "",
  })

  const handleChange = (evt) => {
    setMessage("")
    setFormData({ ...formData, [evt.target.name]: evt.target.value })
  }

  const handleSubmit = async (evt) => {
    evt.preventDefault()
    try {
      await authService.changePassword(formData)
      handleAuthEvt()
      navigate("/")
    } catch (err) {
      setMessage(err.message)
    }
  }

  const { password, newPassword, newPasswordConf } = formData

  const isFormInvalid = () => {
    return !(password && newPassword && newPassword === newPasswordConf)
  }

  return (
    <main className={styles.greenFelt}>
      <h1 className={styles.center}>Change Password</h1>
      <p className={styles.center}>{message}</p>
      <form
        className={styles.center}
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <div className={styles.flex}>
          <label>
            Current Password
            <input
              type="password"
              value={password}
              name="password"
              onChange={handleChange}
            />
          </label>
          <label>
            New Password
            <input
              type="password"
              value={newPassword}
              name="newPassword"
              onChange={handleChange}
            />
          </label>
          <label>
            Confirm New Password
            <input
              type="password"
              value={newPasswordConf}
              name="newPasswordConf"
              onChange={handleChange}
            />
          </label>
          <button disabled={isFormInvalid()}>Change Password</button>
          <Link to="/">Cancel</Link>
        </div>
      </form>
    </main>
  )
}

export default ChangePassword
