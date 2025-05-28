import { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"

import * as sessionService from "../../services/sessionService"

const Session = () => {
  const navigate = useNavigate()
  const [sessions, setSessions] = useState()
  const [selected, setSelected] = useState(null)
  const [flippingItemId, setFlippingItemId] = useState(null)
  const [view, setView] = useState(null)
  const location = useLocation()
  const queryString = location.search
  const params = new URLSearchParams(queryString)
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

  const handleShow = (sched) => {
    setView(
      <>
        <div className="center w700 fWrap ">
          <div
            className="bracket center column"
            onClick={() => handleShowMatch(sched.table1)}
          >
            <div className="center bracket ">Table 1</div>
            <div className="center bracket w300 ">
              {sched.table1.homeTeam.teamName} <br />
              vs
              <br /> {sched.table1.awayTeam.teamName}
            </div>
            <br />
          </div>
          <div
            className="bracket center column"
            onClick={() => handleShowMatch(sched.table2)}
          >
            <div className="center bracket ">Table 2</div>
            <div className="center bracket w300 ">
              {sched.table2.homeTeam.teamName} <br />
              vs
              <br /> {sched.table2.awayTeam.teamName}
            </div>
            <br />
          </div>
          <div
            className="flex bracket center column"
            onClick={() => handleShowMatch(sched.table3)}
          >
            <div className="flex center bracket ">Table 3</div>
            <div className="center bracket w300">
              {sched.table3.homeTeam.teamName}
              <br />
              vs
              <br />
              {sched.table3.awayTeam.teamName}
              <br />
            </div>

            <br />
          </div>
          <div
            className="bracket center column"
            onClick={() => handleShowMatch(sched.table4)}
          >
            <div className="center bracket ">Table 4</div>
            <div className="center bracket w300 ">
              {sched.table4.homeTeam.teamName} <br />
              vs
              <br /> {sched.table4.awayTeam.teamName}
            </div>
            <br />
          </div>
        </div>
      </>
    )
  }

  const handleSelect = (schedId) => {
    setSelected(schedId)
    setFlippingItemId(schedId)
  }

  return (
    <>
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
                  selected === sched._id ? "selected" : ""
                } ${flippingItemId === sched._id ? "flip" : ""}`}
                key={sched._id}
              >
                <div className="center flex">{sched.date}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="fWrap">{view}</div>
      </>
    </>
  )
}

export default Session
