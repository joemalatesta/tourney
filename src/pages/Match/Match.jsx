import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

import Team from "../../components/Team/Team"
import TeamPlayers from "../../components/TeamPlayers/TeamPlayers"

// import * as teamService from "../../services/teamService"

const Match = (props) => {

  const navigate = useNavigate()
  // const [teams, setTeams] = useState(null)
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
    const getTeamData = () => {
      setTeam1(props.viewMatch.homeTeam)
      setTeam2(props.viewMatch.visitor)
    }
    getTeamData()
  }, []);

  useEffect(() => {}, [match])

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
    navigate('/match-view')
  }

  const handleSetPlayers = () => {
    if (player1 !== null && player2 !== null) {
      if(match1 === null) setMatch1([player1, player2])
      if(match2 === null && match1 !== null) setMatch2([player1, player2])
      if(match3 === null && match1 !== null && match2 !== null) setMatch3([player1, player2])
      setMatch([player1, player2])
      setPlayer1(null)
      setPlayer2(null)
    } else {
      setMessage("Please Choose Both Players")
    }
  }

  return (
    <>
    This is the match
    <h1 >Match </h1>
<div >
  <div >
    <h1>{team1?.teamName}</h1>
    <div >
      <TeamPlayers
        matchPlayer={player1}
        title="Team 1"
        team={team1}
        handleChoosePlayer={handleChoosePlayer}
      />
    </div>
  </div>

  <div>
    <h1 style={{ color: "red" }}>
      {team1 == null ? (
        <div >Add a Team</div>
      ) : (
        <div >{team1.teamName}</div>
      )}{" "}
      vs.{" "}
      {team2 == null ? (
        <div>Add a Team</div>
      ) : (
        <div >{team2.teamName}</div>
      )}
    </h1>
    {player1 !== null ? player1.name : "Awaiting Player"} vs:{" "}
    {player2 !== null ? player2.name : "Awaiting Player"}
    <br />
    <h2>{message}</h2>
    <button  onClick={() => handleSetPlayers()}>
      Set Players
    </button>
    <div onClick={()=>handleViewSingleMatch(match1)} >
      Match 1
      {match1?.map(player=>
        <li key={player._id}>{player.name}</li>
        )}

    </div>
    <div onClick={()=>handleViewSingleMatch(match2)} >

      Match 2
      {match2?.map(player=>
        <li key={player._id}>{player.name}</li>
        )}
        </div>
        
        <div onClick={()=>handleViewSingleMatch(match3)} >

      Match 3
      {match3?.map(player=>
        <li key={player._id}>{player.name}</li>
        )}
        </div>
  </div>
  <div>
        <h1>{team2?.teamName}</h1>
    <div >
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

export default Match

