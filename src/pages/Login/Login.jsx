import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

import * as styles from "./Login.module.css"
import * as authService from "../../services/authService"

const LoginPage = ({ handleAuthEvt }) => {
  const navigate = useNavigate()

  const [message, setMessage] = useState("")
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const handleChange = (evt) => {
    setMessage("")
    setFormData({ ...formData, [evt.target.name]: evt.target.value })
  }

  const handleSubmit = async (evt) => {
    evt.preventDefault()
    try {
      if (!import.meta.env.VITE_BACK_END_SERVER_URL) {
        throw new Error("No VITE_BACK_END_SERVER_URL in front-end .env")
      }
      await authService.login(formData)
      handleAuthEvt()
      navigate("/")
    } catch (err) {
      console.log(err)
      setMessage(err.message)
    }
  }

  const { email, password } = formData

  const isFormInvalid = () => {
    return !(email && password)
  }

  return (
    <div className={styles.center}>
      <main className={`${styles.w500} ${styles.greenFelt}`}>
        <h1 className={styles.center}>Log In</h1>
        <p className={styles.center}>{message}</p>
        <form autoComplete="off" onSubmit={handleSubmit}>
          <label className={styles.center}>
            Email
            <input
              type="text"
              value={email}
              name="email"
              onChange={handleChange}
            />
          </label>
          <br />
          <label className={styles.center}>
            Password:
            <input
              type="password"
              value={password}
              name="password"
              onChange={handleChange}
            />
          </label>
          <br />
          <div className={styles.center}>
            <Link to="/">Cancel</Link>
            <button disabled={isFormInvalid()}>Log In</button>
          </div>
        </form>
      </main>
    </div>
  )
}

export default LoginPage
