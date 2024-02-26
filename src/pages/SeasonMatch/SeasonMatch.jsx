import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import * as teamService from "../../services/teamService"
import Team from "../../components/Team/Team"
import TeamPlayers from "../../components/TeamPlayers/TeamPlayers"

const SeasonMatch = (props) => {
  const navigate = useNavigate()
  const [teams, setTeams] = useState([])
  const [team1, setTeam1] = useState(null)
  const [team2, setTeam2] = useState(null)
  const [player1, setPlayer1] = useState(null)
  const [player2, setPlayer2] = useState(null)
  const [match, setMatch] = useState([])
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [message, setMessage] = useState("")

  useEffect(() => {
    const getTeamData = async () => {
      const data = await teamService.index()
      setTeams(data)
    }
    getTeamData()
  }, [])

  useEffect(() => {}, [match])

  const handleChooseTeam = (team, title) => {
    if (title === "Team 1") {
      setTeam1(team)
      setPlayer1(null)
      setTeams(teams.filter((el) => el._id !== team._id))
    }
    if (title === "Team 2") {
      setTeam2(team)
      setPlayer2(null)
      setTeams(teams.filter((el) => el._id !== team._id))
    }
  }

  const handleChoosePlayer = (player, title) => {
    if (title === "Team 1") {
      setPlayer1(player)
      setMessage("")
    }
    if (title === "Team 2") {
      setPlayer2(player)
      setMessage("")
    }
  }

  const handleViewSingleMatch = () => {
    props.setTwoPlayerMatch(match)
    navigate("/match-view")
  }

  const handleSetPlayers = () => {
    if (player1 !== null && player2 !== null) {
      setMatch([player1, player2])
      setIsSubmitted(true)
    } else {
      setMessage("Please Choose Both Players")
    }
  }

  return (
    <>
      <h1>Match </h1>
      <div className="flex space-between bracket">
        <div className="flex-direction">
          <Team
            title="Team 1"
            team={team1}
            teams={teams}
            handleChooseTeam={handleChooseTeam}
          />
          <div className="bracket">
            <TeamPlayers
              matchPlayer={player1}
              title="Team 1"
              team={team1}
              handleChoosePlayer={handleChoosePlayer}
            />
          </div>
        </div>

        <div className="bracket">
          <h1 style={{ color: "red" }}>
            {team1 == null ? (
              <div style={{ color: "yellow" }}>Add a Team</div>
            ) : (
              <div style={{ color: "yellow" }}>{team1.teamName}</div>
            )}{" "}
            vs.{" "}
            {team2 == null ? (
              <div style={{ color: "yellow" }}>Add a Team</div>
            ) : (
              <div style={{ color: "yellow" }}>{team2.teamName}</div>
            )}
          </h1>
          {player1 !== null ? player1.name : "Awaiting Player"} vs:{" "}
          {player2 !== null ? player2.name : "Awaiting Player"}
          <br />
          <h2>{message}</h2>
          <button hidden={isSubmitted} onClick={() => handleSetPlayers()}>
            Set Players
          </button>
          <button
            hidden={!isSubmitted}
            style={{ backgroundColor: "green" }}
            onClick={() => handleViewSingleMatch()}
          >
            View Match
          </button>
        </div>
        <div className="flex-direction">
          <Team
            title="Team 2"
            team={team2}
            teams={teams}
            handleChooseTeam={handleChooseTeam}
          />
          <div className="bracket">
            <TeamPlayers
              matchPlayer={player2}
              title="Team 2"
              team={team2}
              handleChoosePlayer={handleChoosePlayer}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default SeasonMatch
