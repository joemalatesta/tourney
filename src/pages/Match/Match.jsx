import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

import TeamPlayers from "../../components/TeamPlayers/TeamPlayers"
import MatchHandler from "../../components/MatchHandler/MatchHandler"

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
  const [completeMatch, setCompleteMatch] = useState({
    match1: "",
    match2: "",
    match3: "",
  })
  

  useEffect(() => {
    if(match1 !== null && match2 !== null && match3 !== null) setCompleteMatch({match1, match2, match3})
  }, [match1,match2,match3])

  useEffect(() => {
    if(match1 !== null && match2 !== null && match3 !== null) props.setTriMatch(completeMatch)
  }, [completeMatch]);


  console.log('This is the complete match',completeMatch);

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
    // navigate("/match-view")
    navigate('/tri-match-view')
  }

  const handleSetPlayers = () => {
    if (player1 !== null && player2 !== null) {
      if (match1 === null) setMatch1([player1, player2])
      if (match2 === null && match1 !== null) setMatch2([player1, player2])
      if (match3 === null && match1 !== null && match2 !== null) setMatch3([player1, player2])
      setMatch([player1, player2])
      setPlayer1(null)
      setPlayer2(null)
    }
  }

  let color = player1 == null || player2 == null ? "red" : "green"

  return (
    <>
      <div className="bracket">
        <h1 className="center">Match </h1>

        <p className="center">Pick players here for match play.</p>
        <p className="center">
          Then press center button to confirm names then a second time to view
          match race
        </p>
      </div>

      <div className="row center space-around">
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
        {match1 === null && (
          <button
            className="bracket"
            style={{ backgroundColor: `${color}` }}
            onClick={() => handleSetPlayers()}
          >
            {color === "red" ? "Choose Players For Match" : "Match 1"}
          </button>
        )}
      <MatchHandler
        match1={match1}
        match2={match2}
        match3={match3}
        handleViewSingleMatch={handleViewSingleMatch}
        handleSetPlayers={handleSetPlayers}
        color={color}
      />
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
    </>
  )
}

export default Match
