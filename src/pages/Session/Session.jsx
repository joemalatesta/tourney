
import { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"

import * as sessionService from "../../services/sessionService"

const Session = ({ profile }) => {
  const navigate = useNavigate()
  const [sessions, setSessions] = useState([])
  const [selected, setSelected] = useState(null)
  const [flippingItemId, setFlippingItemId] = useState(null)
  const [view, setView] = useState(null)
  const [savingSession, setSavingSession] = useState(false)

  const location = useLocation()
  const params = new URLSearchParams(location.search)
  const sessionId = params.get("sessionId")

  useEffect(() => {
    const getSessions = async () => {
      const data = await sessionService.index()
      setSessions(data)
    }
    getSessions()
  }, [])

  const handleShowMatch = (match) => {
    const state = {
      tableId: match._id,
      sessionId: sessionId,
    }

    const queryString = new URLSearchParams(state).toString()
    navigate(`/viewOneSession?${queryString}`)
  }

  // Check whether all four tables are completed and approved
  const canCompleteSession = (sched) => {
    const tables = [
      sched.table1,
      sched.table2,
      sched.table3,
      sched.table4,
    ]

    return tables.every((table) =>
      table &&
      table.match1Completed === true &&
      table.match2Completed === true &&
      table.match3Completed === true &&
      table.approval === true
    )
  }

  // Complete the session
const handleCompleteSession = async (sched) => {
  if (savingSession) return

  try {
    setSavingSession(true)

    const response = await sessionService.update({
      _id: sched._id,
      completed: true,
    })

    console.log("Session update response:", response)

    if (!response || response.error) {
      throw new Error(response?.error || "Session update failed")
    }

    // Refresh sessions from database
    const updatedSessions = await sessionService.index()
    setSessions(updatedSessions)

    // Update currently displayed session
    setView(
      <div className="center">
        Session successfully completed!
      </div>
    )

  } catch (err) {
    console.error("Error completing session:", err)
  } finally {
    setSavingSession(false)
  }
}

  const handleShow = (sched) => {
    setView(
      <>
        <div className="center w700 fWrap">
          {[1, 2, 3, 4].map((number) => {
            const table = sched[`table${number}`]

            return (
              <div
                key={table._id}
                className="bracket center column"
                onClick={() => handleShowMatch(table)}
              >
                <div className="center bracket">
                  Table {number}
                </div>

                <div className="center bracket w300">
                  {table.homeTeam.teamName}
                  <br />
                  vs
                  <br />
                  {table.awayTeam.teamName}
                </div>
                <br />
              </div>
            )
          })}
        </div>

        {profile?.accessLevel === 90 &&
          !sched.completed &&
          canCompleteSession(sched) && (
            <div className="center padding">
              <button
                onClick={() => handleCompleteSession(sched)}
                disabled={savingSession}
              >
                {savingSession
                  ? "Completing Session..."
                  : "Complete Session"}
              </button>
            </div>
          )}

        {sched.completed && (
          <div className="center padding">
            Session Completed
          </div>
        )}
      </>
    )
  }

  const handleSelect = (schedId) => {
    setSelected(schedId)
    setFlippingItemId(schedId)
  }

  return (
    <>
      <div className="bracket flex fWrap padding">
        {sessions?.map((sched) => (
          <div key={sched._id}>
            <div
              onClick={() => {
                handleShow(sched)
                handleSelect(sched._id)
              }}
            className={`flex center round-border padding ${
  sched.completed ? "session-completed" : ""
} ${
  selected === sched._id ? "selected" : ""
} ${flippingItemId === sched._id ? "flip" : ""}`}
            >
              <div className="center flex">
                {sched.date}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="fWrap">{view}</div>
    </>
  )
}

export default Session
