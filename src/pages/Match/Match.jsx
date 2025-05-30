import { useState, useEffect } from "react"

import MatchView from "../../pages/MatchView/MatchView"

import TeamPlayers from "../../components/TeamPlayers/TeamPlayers"
import * as triMatchService from "../../services/triMatchService"

const Match = (props) => {
  const [finalSubmit, setFinalSubmit] = useState(false)
  const [team1, setTeam1] = useState(null)
  const [team2, setTeam2] = useState(null)
  const [player1, setPlayer1] = useState(null)
  const [player2, setPlayer2] = useState(null)
  const [match] = useState([])
  const [match1, setMatch1] = useState(null)
  const [match2, setMatch2] = useState(null)
  const [match3, setMatch3] = useState(null)
  const [showButton, setShowButton] = useState(false)
  const [completeMatch, setCompleteMatch] = useState({
    match1: "",
    match2: "",
    match3: "",
    isSubmitted: "",
    submittedBy: `${props.profile.firstName} ${props.profile.lastName}`,
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

  const finalSubmitForApprovalButton = async () => {
    console.log(completeMatch)
    await triMatchService.create(completeMatch)
    setFinalSubmit(!finalSubmit)
  }

  const handleCancel = (mth) => {
    console.log(mth, "************************")

    if (mth === "1") setMatch1(null)
    if (mth === "2") setMatch2(null)
    if (mth === "3") setMatch3(null)
  }

  return (
    <>
      <div className="bracket">
        <h1 className="center">Match </h1>

        <p className="center">Pick players here for match play.</p>
        <p className="center">
          Press the green center button to confirm names scroll down to view the
          match.
          <br />
        </p>
        <p className="center">
          After you validate the match you can choose your next match players.
        </p>
        <p className="center">
          When all 3 matches have been played press the final{" "}
        </p>
        <p className="center">
          match complete the match and submit your scores.
        </p>
      </div>

      <div className="row center space-around">
        <div className="bracket">
          <h2>{team1?.teamName}</h2>
          <div className="w325">
            <TeamPlayers
              matchPlayer={player1}
              title="Team 1"
              team={team1}
              handleChoosePlayer={handleChoosePlayer}
            />
          </div>
        </div>
        <div className="bracket">
          <h2>{team2?.teamName}</h2>
          <div className="w325">
            <TeamPlayers
              matchPlayer={player2}
              title="Team 2"
              team={team2}
              handleChoosePlayer={handleChoosePlayer}
            />
          </div>
        </div>
      </div>
      {showButton === true && finalSubmit === false && (
        <>
          <div className="center">
            <h1> Match is Complete</h1>
            <br />
          </div>

          <div className="center">
            <button
              style={{ width: "100px", height: "100px" }}
              onClick={finalSubmitForApprovalButton}
            >
              Approve the Match
            </button>
          </div>
        </>
      )}
      {match3 !== null && (
        <>
          <h1 className="center">Match 3</h1>
          <MatchView
            mth="3"
            handleCancel={handleCancel}
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
          <h1 className="center">Match 2</h1>
          <MatchView
            mth="2"
            handleCancel={handleCancel}
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
          <h1 className="center">Match 1</h1>
          <MatchView
            mth="1"
            handleCancel={handleCancel}
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
