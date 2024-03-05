import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

import TeamPlayers from "../../components/TeamPlayers/TeamPlayers"

const Match = (props) => {
  const navigate = useNavigate()
  const [team1, setTeam1] = useState(null)
  const [team2, setTeam2] = useState(null)
  const [player1, setPlayer1] = useState(null)
  const [player2, setPlayer2] = useState(null)
  const [match, setMatch] = useState([])
  const [match1, setMatch1] = useState(null)
  const [match2, setMatch2] = useState(null)
  const [match3, setMatch3] = useState(null)

  useEffect(() => {
    const getTeamData = () => {
      setTeam1(props.viewMatch.homeTeam)
      setTeam2(props.viewMatch.visitor)
    }
    getTeamData()
  }, [props.viewMatch.homeTeam, props.viewMatch.visitor])

  useEffect(() => {}, [match])

  const handleChoosePlayer = (player, title) => {
    if (title === "Team 1") {
      setPlayer1(player)
    }
    if (title === "Team 2") {
      setPlayer2(player)
    }
  }

  const handleViewSingleMatch = (players) => {
    if (players === null) return
    props.setTwoPlayerMatch(players)
    navigate("/match-view")
  }

  const handleSetPlayers = () => {
    if (player1 !== null && player2 !== null) {
      if (match1 === null) setMatch1([player1, player2])
      if (match2 === null && match1 !== null) setMatch2([player1, player2])
      if (match3 === null && match1 !== null && match2 !== null)
        setMatch3([player1, player2])
      setMatch([player1, player2])
      setPlayer1(null)
      setPlayer2(null)
    }
  }

  let color = player1 == null || player2 == null ? "red" : "green"

  return (
    <>
      <h1 className="center">Match </h1>
      <div className="row space-between">
        <div className="bracket">
          <h1>{team1?.teamName}</h1>
          <div className="w355">
            <TeamPlayers
              matchPlayer={player1}
              title="Team 1"
              team={team1}
              handleChoosePlayer={handleChoosePlayer}
            />
          </div>
        </div>
        {match3 === null && (
          <button
            style={{ backgroundColor: `${color}` }}
            onClick={() => handleSetPlayers()}
          >
            Set Players
          </button>
        )}
        <div className="bracket">
          <h1>{team2?.teamName}</h1>
          <div className="w355">
            <TeamPlayers
              matchPlayer={player2}
              title="Team 2"
              team={team2}
              handleChoosePlayer={handleChoosePlayer}
            />
          </div>
        </div>
      </div>
      <div className="center">
        <div className="bracket" onClick={() => handleViewSingleMatch(match1)}>
          Match
          {match1?.map((player) => (
            <li key={player._id}>{player.name}</li>
          ))}
        </div>
        {/* <div className="bracket" onClick={() => handleViewSingleMatch(match2)}>
            Match 2
            {match2?.map((player) => (
              <li key={player._id}>{player.name}</li>
            ))}
          </div>

          <div className="bracket" onClick={() => handleViewSingleMatch(match3)}>
            Match 3
            {match3?.map((player) => (
              <li key={player._id}>{player.name}</li>
            ))}
          </div> */}
      </div>
    </>
  )
}

export default Match
