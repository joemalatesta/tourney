import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

import * as authService from "../../services/authService"
import * as styles from "./Signup.module.css"

const Signup = ({ handleAuthEvt }) => {
  const navigate = useNavigate()

  const [message, setMessage] = useState("")
  const [formData, setFormData] = useState({
    name: `${Math.random()}`,
    firstName: "",
    lastName: "",
    email: "",
    email2: "",
    password: "",
    passwordConf: "",
  })

  const [isSubmitted, setIsSubmitted] = useState(false)

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
      setIsSubmitted(true)
      await authService.signup(formData)
      handleAuthEvt()
      navigate("/")
    } catch (err) {
      console.log(err)
      setMessage(err.message)
      setIsSubmitted(false)
    }
  }

  const { name, firstName, lastName, email, email2, password, passwordConf } =
    formData

  const isFormInvalid = () => {
    return !(name && email && email2 && password && password === passwordConf)
  }

  return (
    <main className={styles.greenFelt}>
      <h1 className={styles.center}>Sign Up</h1>
      <p className={styles.center}>{message}</p>
      <form
        autoComplete="off"
        className={styles.center}
        onSubmit={handleSubmit}
      >
        <div>
          <label>
            User Name
            <div>
              <input
                type="text"
                value={email}
                name="email"
                onChange={handleChange}
              />
            </div>
          </label>
          <br />
          <label>
            First Name
            <div>
              <input
                type="text"
                value={firstName}
                name="firstName"
                onChange={handleChange}
              />
            </div>
          </label>
          <br />
          <label>
            Last Name
            <div>
              <input
                type="text"
                value={lastName}
                name="lastName"
                onChange={handleChange}
              />
            </div>
          </label>
          <br />
          <label>
            Email
            <div>
              <input
                type="text"
                value={email2}
                name="email2"
                onChange={handleChange}
              />
            </div>
          </label>
          <br />
          <label>
            Password
            <div>
              <input
                type="password"
                value={password}
                name="password"
                onChange={handleChange}
              />
            </div>
          </label>
          <br />
          <label>
            Confirm Password
            <div>
              <input
                type="password"
                value={passwordConf}
                name="passwordConf"
                onChange={handleChange}
              />
            </div>
          </label>
          <br />
          <div className={styles.center}>
            <button disabled={isFormInvalid() || isSubmitted}>
              {!isSubmitted ? "Sign Up" : "🚀 Sending..."}
            </button>
            <br />
          </div>
          <br />
          <Link to="/">Cancel</Link>
          <br />
        </div>
      </form>
    </main>
  )
}

export default Signup
