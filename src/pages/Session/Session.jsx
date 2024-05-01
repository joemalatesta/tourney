import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import * as sessionService from "../../services/sessionService"

const Session = () => {
  const navigate = useNavigate()
  const [sessions, setSessions] = useState()

  useEffect(() => {
    const getSessions = async () => {
      const data = await sessionService.index()
      setSessions(data)
    }
    getSessions()
  }, [])

  const handleNavigate = (session) => {
    const state = {
      sessionId: session._id,
    }
    const queryString = new URLSearchParams(state).toString()
    navigate(`/viewSession?${queryString}`)
  }
  return (
    <>
      {sessions?.map((session, idx) => (
        <li onClick={() => handleNavigate(session)} key={idx}>{session.date}</li>
      ))}
    </>
  )
}

export default Session
