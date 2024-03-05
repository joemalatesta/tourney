import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

import Team from "../../components/Team/Team"
import TeamPlayers from "../../components/TeamPlayers/TeamPlayers"

import * as teamService from "../../services/teamService"
import * as styles from "./SeasonMatch.module.css"

const SeasonMatch = (props) => {
  const navigate = useNavigate()
  const [teams, setTeams] = useState([])
  const [team1, setTeam1] = useState(null)
  const [team2, setTeam2] = useState(null)
  const [player1, setPlayer1] = useState(null)
  const [player2, setPlayer2] = useState(null)
  const [match, setMatch] = useState([])
  const [message, setMessage] = useState("")
  const [match1, setMatch1] = useState(null)
  const [match2, setMatch2] = useState(null)
  const [match3, setMatch3] = useState(null)

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

  const handleViewSingleMatch = (players) => {
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
    } else {
      setMessage("Please Choose Both Players")
    }
  }

  return (
    <>
      <h1 className={styles.center}>Match </h1>
      <div className={`${styles.spaceAround}`}>
        <div className={styles.bracket}>
          <Team
            title="Team 1"
            team={team1}
            teams={teams}
            handleChooseTeam={handleChooseTeam}
          />
          <div className={`${styles.bracket} ${styles.greenFelt}`}>
            <TeamPlayers
              matchPlayer={player1}
              title="Team 1"
              team={team1}
              handleChoosePlayer={handleChoosePlayer}
            />
          </div>
        </div>

        <div className={styles.bracket}>
          <h1 style={{ color: "red" }}>
            {team1 == null ? (
              <div className={styles.redText}>Add a Team</div>
            ) : (
              <div className={styles.yellowText}>{team1.teamName}</div>
            )}{" "}
            vs.{" "}
            {team2 == null ? (
              <div className={styles.redText}>Add a Team</div>
            ) : (
              <div className={styles.yellowText}>{team2.teamName}</div>
            )}
          </h1>
          {player1 !== null ? player1.name : "Awaiting Player"} vs:{" "}
          {player2 !== null ? player2.name : "Awaiting Player"}
          <br />
          <h2>{message}</h2>
          <button onClick={() => handleSetPlayers()}>Set Players</button>
          <div
            onClick={() => handleViewSingleMatch(match1)}
            className={styles.bracket}
          >
            Match 1
            {match1?.map((player) => (
              <li key={player._id}>{player.name}</li>
            ))}
          </div>
          <div
            onClick={() => handleViewSingleMatch(match2)}
            className={styles.bracket}
          >
            Match 2
            {match2?.map((player) => (
              <li key={player._id}>{player.name}</li>
            ))}
          </div>
          <div
            onClick={() => handleViewSingleMatch(match3)}
            className={styles.bracket}
          >
            Match 3
            {match3?.map((player) => (
              <li key={player._id}>{player.name}</li>
            ))}
          </div>
        </div>
        <div className={styles.bracket}>
          <Team
            title="Team 2"
            team={team2}
            teams={teams}
            handleChooseTeam={handleChooseTeam}
          />
          <div className={`${styles.bracket} ${styles.greenFelt}`}>
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
