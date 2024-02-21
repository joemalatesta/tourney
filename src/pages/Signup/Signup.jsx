// npm modules
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

// services
import * as authService from "../../services/authService"

const Signup = ({ handleAuthEvt }) => {
  const navigate = useNavigate()

  const [message, setMessage] = useState("")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
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

  const { name, email, password, passwordConf } = formData

  const isFormInvalid = () => {
    return !(name && email && password && password === passwordConf)
  }

  return (
    <main className="green-felt" style={{ width: "100%" }}>
      <p className="center">{message}</p>
      <h1 className="center">Sign Up</h1>
      <p>{message}</p>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <label className="center">
          Name
          <input type="text" value={name} name="name" onChange={handleChange} />
        </label>
        <br/>
        <label className="center">

          Email
          <input
            type="text"
            value={email}
            name="email"
            onChange={handleChange}
          />
        </label>
        <br/>
        <label className="center">
          Password
          <input
            type="password"
            value={password}
            name="password"
            onChange={handleChange}
          />
        </label>
        <br/>
        <label className="center">
          Confirm Password
          <input
            type="password"
            value={passwordConf}
            name="passwordConf"
            onChange={handleChange}
          />
        </label>
        <div className="center">
          <Link to="/">Cancel</Link>
          <button disabled={isFormInvalid() || isSubmitted}>
            {!isSubmitted ? "Sign Up" : "🚀 Sending..."}
          </button>
        </div>
      </form>
    </main>
  )
}

export default Signup
