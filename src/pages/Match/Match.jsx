import { useState, useEffect } from "react"

import MatchView from "../../pages/MatchView/MatchView"

import TeamPlayers from "../../components/TeamPlayers/TeamPlayers"
import MatchHandler from "../../components/MatchHandler/MatchHandler"

import * as triMatchService from '../../services/triMatchService'

const Match = (props) => {
  console.log(props);
  const [team1, setTeam1] = useState(null)
  const [team2, setTeam2] = useState(null)
  const [player1, setPlayer1] = useState(null)
  const [player2, setPlayer2] = useState(null)
  const [match, setMatch] = useState([])
  const [match1, setMatch1] = useState(null)
  const [match2, setMatch2] = useState(null)
  const [match3, setMatch3] = useState(null)
  const [showButton, setShowButton] = useState(false)
  const [completeMatch, setCompleteMatch] = useState({
    date: props?.matchId?.name,
    homeTeam: team1,
    visitingTeam: team2,
    match1: "",
    match2: "",
    match3: "",
    submittedBy: `${props.profile.firstName} ${props.profile.lastName}`
  })

  useEffect(() => {
    setCompleteMatch((prevMatch) => ({
      ...prevMatch,
      homeTeam: team1,
      visitingTeam: team2,
    }))
  }, [team1, team2])

  useEffect(() => {
    const getTeamData = () => {
      setTeam1(props.viewMatch.homeTeam)
      setTeam2(props.viewMatch.visitor)
    }
    getTeamData()
  }, [props?.viewMatch?.homeTeam, props?.viewMatch?.visitor])

  useEffect(() => {}, [match])

  const handleChoosePlayer = (player, title) => {
    if (title === "Team 1") {
      setPlayer1(player)
    }
    if (title === "Team 2") {
      setPlayer2(player)
    }
  }

  console.log(team1)
  console.log(team2)

  const handleSetPlayers = async () => {
    if (player1 !== null && player2 !== null) {
      if (match1 === null) {
        await setMatch1([player1, player2])
      }
      if (match2 === null && match1 !== null) {
        await setMatch2([player1, player2])
      }
      if (match3 === null && match1 !== null && match2 !== null) {
        await setMatch3([player1, player2])
      }
      setMatch([player1, player2])
      setPlayer1(null)
      setPlayer2(null)
    }
  }

  const finalSubmitForApprovalButton = async () => {
    console.log(completeMatch)
    await triMatchService.create(completeMatch)
      console.log("hi there")
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
          <h2>{team1?.teamName}</h2>
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
          handleSetPlayers={handleSetPlayers}
          color={color}
        />
        <div className="bracket">
          <h2>{team2?.teamName}</h2>
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
      { showButton === true && 
        <button onClick={ finalSubmitForApprovalButton }>Approve the Match</button>
      }
      {match3 !== null && (
        <>
          {}
          <h1>Match 3</h1>
          <MatchView
            setShowButton={setShowButton}
            match1={match1}
            match2={match2}
            match3={match3}
            showButton={showButton}
            setCompleteMatch={setCompleteMatch}
            completeMatch={completeMatch}
            matchNumber={3}
            match={match3}
            matchId={props.matchId}
            profile={props.profile}
          />
        </>
      )}
      {match2 !== null && (
        <>
          <h1>Match 2</h1>
          <MatchView
               match1={match1}
               match2={match2}
               match3={match3}
               showButton={showButton}
            setCompleteMatch={setCompleteMatch}
            completeMatch={completeMatch}
            matchNumber={2}
            match={match2}
            matchId={props.matchId}
            profile={props.profile}
          />
        </>
      )}
      {match1 !== null && (
        <>
          <h1>Match 1</h1>
          <MatchView
             match1={match1}
             match2={match2}
             match3={match3}
             showButton={showButton}
            setCompleteMatch={setCompleteMatch}
            completeMatch={completeMatch}
            matchNumber={1}
            match={match1}
            matchId={props.matchId}
            profile={props.profile}
          />
        </>
      )}
    </>
  )
}

export default Match
