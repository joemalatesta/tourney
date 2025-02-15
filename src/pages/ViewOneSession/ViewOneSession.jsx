import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"
import * as tableService from "../../services/tableService"
import * as teamService from "../../services/teamService"
import * as matchService from "../../services/matchService"
import * as playerService from "../../services/playerService"
import TeamPlayers from "../../components/TeamPlayers/TeamPlayers"
import SingleMatch from "../../components/SingleMatch/SingleMatch"
import CompletedMatch from "../../components/CompletedMatch/CompletedMatch"

const ViewOneSession = (props) => {
  const [currentMatch, setCurrentMatch] = useState()
  const location = useLocation()
  const queryString = location.search
  const params = new URLSearchParams(queryString)
  const tableId = params.get("tableId")
  const [match1Away, setMatch1Away] = useState(null)
  const [match2Away, setMatch2Away] = useState(null)
  const [match3Away, setMatch3Away] = useState(null)
  const [match1Home, setMatch1Home] = useState(null)
  const [match2Home, setMatch2Home] = useState(null)
  const [match3Home, setMatch3Home] = useState(null)
  const [player1, setPlayer1] = useState(null)
  const [player2, setPlayer2] = useState(null)
  const [toggleSetMatch, setToggleSetMatch] = useState(true)
  const [homeTeamPlayers, setHomeTeamPlayers] = useState([])
  const [awayTeamPlayers, setAwayTeamPlayers] = useState([])
  const [currentProfile, setCurrentProfile] = useState("")
  const [currentMatchData, setCurrentMatchData] = useState()

  useEffect(() => {
    const getPlayerInfo = async () => {
      const homeData = await teamService.findOne(currentMatch?.homeTeam?._id)
      const awayData = await teamService.findOne(currentMatch?.awayTeam?._id)
      setHomeTeamPlayers(homeData)
      setAwayTeamPlayers(awayData)
    }
    getPlayerInfo()
    setCurrentMatchData(currentMatch)
  }, [currentMatch])

  const isProfileInTeamPlayers = (team, profileId) => {
    return team?.teamPlayers?.some((player) => player.profile === profileId)
  }

  useEffect(() => {
    if (currentMatch) {
      const isInHomeTeam = isProfileInTeamPlayers(
        homeTeamPlayers,
        props.profile?._id
      )
      const isInAwayTeam = isProfileInTeamPlayers(
        awayTeamPlayers,
        props.profile?._id
      )

      if (isInHomeTeam) {
        setCurrentProfile("HOME")
      } else if (isInAwayTeam) {
        setCurrentProfile("AWAY")
      } else if (props.profile?.accessLevel !== 90) {
        setCurrentProfile("NONE")
      } else {
        setCurrentProfile("ADMIN")
      }
    }
  }, [currentMatch, props.profile, homeTeamPlayers, awayTeamPlayers])

  useEffect(() => {
    const getSession = async () => {
      const data = await tableService.findOne(tableId)
      setCurrentMatch(data)
    }
    getSession()
  }, [tableId])

  // useEffect(() => {
  //   const getUpdatedMatch = async () => {
  //     if (currentMatch?._id) {
  //       const data = await matchService.findOne(currentMatch?._id)
  //       setCurrentMatch(data)
  //     }
  //   }
  //   getUpdatedMatch()
  // }, [currentMatch])

  useEffect(() => {
    const setToggle = () => {
      if (
        currentMatch?.match1 !== null &&
        currentMatch?.match1?.completed === false
      ) {
        setToggleSetMatch(false)
      } else if (
        currentMatch?.match2 !== null &&
        currentMatch?.match2?.completed === false
      ) {
        setToggleSetMatch(false)
      } else if (
        currentMatch?.match3 !== null &&
        currentMatch?.match3?.completed === false
      ) {
        setToggleSetMatch(false)
      }
    }
    setToggle()
  }, [toggleSetMatch, currentMatch])

  useEffect(() => {
    if (currentProfile === "HOME") {
      const getMatchesIfAvail = async () => {
        if (currentMatch?.homeMatch1 == null) return
        else {
          await setMatch1Home([
            currentMatch?.homeMatch1?.player1,
            currentMatch?.homeMatch1?.player2,
          ])
        }
        if (currentMatch?.homeMatch2 == null) return
        else {
          setMatch2Home([
            currentMatch?.homeMatch2?.player1,
            currentMatch?.homeMatch2?.player2,
          ])
        }
        if (currentMatch?.homeMatch3 == null) return
        else {
          setMatch3Home([
            currentMatch?.homeMatch3?.player1,
            currentMatch?.homeMatch3?.player2,
          ])
        }
      }
      getMatchesIfAvail()
    }
    if (currentProfile === "AWAY") {
      const getMatchesIfAvail = async () => {
        if (currentMatch?.awayMatch1 == null) return
        else {
          await setMatch1Away([
            currentMatch?.awayMatch1?.player1,
            currentMatch?.awayMatch1?.player2,
          ])
        }
        if (currentMatch?.awayMatch2 == null) return
        else {
          setMatch2Away([
            currentMatch?.awayMatch2?.player1,
            currentMatch?.awayMatch2?.player2,
          ])
        }
        if (currentMatch?.awayMatch3 == null) return
        else {
          setMatch3Away([
            currentMatch?.awayMatch3?.player1,
            currentMatch?.awayMatch3?.player2,
          ])
        }
      }
      getMatchesIfAvail()
    }
  }, [currentMatch, currentProfile])

  const getSession = async () => {
    const data = await tableService.findOne(tableId)
    setCurrentMatch(data)
  }

  const handleCancel = async (mth) => {
    if (currentProfile === "HOME") {
      if (mth === "1") {
        setMatch1Home(null)
        await tableService.update({ ...currentMatch, homeMatch1: null })
        await matchService.deleteOne(currentMatch?.homeMatch1?._id)
        getSession()
      }
      if (mth === "2") {
        setMatch2Home(null)
        await tableService.update({ ...currentMatch, homeMatch2: null })
        await matchService.deleteOne(currentMatch?.homeMatch2?._id)
        getSession()
      }
      if (mth === "3") {
        setMatch3Home(null)
        await tableService.update({ ...currentMatch, homeMatch3: null })
        await matchService.deleteOne(currentMatch?.homeMatch3?._id)
        getSession()
      }
    }
    if (currentProfile === "AWAY") {
      if (mth === "1") {
        setMatch1Away(null)
        await tableService.update({ ...currentMatch, awayMatch1: null })
        await matchService.deleteOne(currentMatch?.awayMatch1?._id)
        getSession()
      }
      if (mth === "2") {
        setMatch2Away(null)
        await tableService.update({ ...currentMatch, awayMatch2: null })
        await matchService.deleteOne(currentMatch?.awayMatch2?._id)
        getSession()
      }
      if (mth === "3") {
        setMatch3Away(null)
        await tableService.update({ ...currentMatch, awayMatch3: null })
        await matchService.deleteOne(currentMatch?.awayMatch3?._id)
        getSession()
      }
    }
  }

  const handleChoosePlayer = async (player, title) => {
    let chosenPlayer = await playerService.findOne(player)

    if (title === "Home") {
      setPlayer1(chosenPlayer)
    }
    if (title === "Away") {
      setPlayer2(chosenPlayer)
    }
  }
  const handleSetPlayers = async () => {
    setToggleSetMatch(!toggleSetMatch)
    if (currentProfile === "HOME") {
      if (player1 !== null && player2 !== null) {
        if (match1Home === null) {
          await setMatch1Home([player1, player2])
          const createdMatch = await matchService.create({
            player1: player1,
            player2: player2,
          })
          await tableService.update({
            ...currentMatch,
            homeMatch1: createdMatch._id,
          })
          getSession()
        }
        if (match2Home === null && match1Home !== null) {
          await setMatch2Home([player1, player2])
          const createdMatch = await matchService.create({
            player1: player1,
            player2: player2,
          })
          await tableService.update({
            ...currentMatch,
            homeMatch2: createdMatch._id,
          })
          getSession()
        }
        if (match3Home === null && match1Home !== null && match2Home !== null) {
          await setMatch3Home([player1, player2])
          const createdMatch = await matchService.create({
            player1: player1,
            player2: player2,
          })
          await tableService.update({
            ...currentMatch,
            homeMatch3: createdMatch._id,
          })
          getSession()
        }
        await handleSubmitMatch()
      }
    }
    if (currentProfile === "AWAY") {
      if (player1 !== null && player2 !== null) {
        if (match1Away === null) {
          await setMatch1Away([player1, player2])
          const createdMatch = await matchService.create({
            player1: player1,
            player2: player2,
          })
          await tableService.update({
            ...currentMatch,
            awayMatch1: createdMatch._id,
          })
          getSession()
        }
        if (match2Away === null && match1Away !== null) {
          await setMatch2Away([player1, player2])
          const createdMatch = await matchService.create({
            player1: player1,
            player2: player2,
          })
          await tableService.update({
            ...currentMatch,
            awayMatch2: createdMatch._id,
          })
          getSession()
        }
        if (match3Away === null && match1Away !== null && match2Away !== null) {
          await setMatch3Away([player1, player2])
          const createdMatch = await matchService.create({
            player1: player1,
            player2: player2,
          })
          await tableService.update({
            ...currentMatch,
            awayMatch3: createdMatch._id,
          })
          getSession()
        }
        await handleSubmitMatch()
      }
    }
  }

  const handleSubmitMatch = async () => {}

  const handleSetAdmin = (el) => {
    if (el === "home") setCurrentProfile("HOME")
    if (el === "away") setCurrentProfile("AWAY")
    if (el === "none") setCurrentProfile("NONE")  
  }

  const handleUpdateMatch = async () => {
    if (!currentMatch?._id) return

    try {
      const data = await matchService.findOne(currentMatch._id)
      setCurrentMatch(data)

      if (
        data?.match1Completed !== true ||
        data?.match2Completed !== true ||
        data?.match3Completed !== true
      ) {
        setTimeout(handleUpdateMatch, 5000) 
      }
    } catch (error) {
      console.error("Error updating match:", error)
    }
  }

  let passedMatch1 = currentMatch?.awayMatch1 == null ? currentMatch?.homeMatch1 : currentMatch?.awayMatch1
  let passedMatch2 = currentMatch?.awayMatch2 == null ? currentMatch?.homeMatch2 : currentMatch?.awayMatch2
  let passedMatch3 = currentMatch?.awayMatch3 == null ? currentMatch?.homeMatch3 : currentMatch?.awayMatch3

  return (
    <>
      <div className="row center space-around">
        <div className="bracket">
          <h2>{currentMatch?.homeTeam?.teamName}</h2>
          <div className="w325">
            <TeamPlayers
              adjustedTeam={homeTeamPlayers}
              team={currentMatch?.homeTeam}
              matchPlayer={player1}
              title="Home"
              handleChoosePlayer={handleChoosePlayer}
            />
            {currentProfile === "ADMIN" && (
              <button onClick={() => handleSetAdmin("home")}>
                Admin for HOME Team
              </button>
            )}
                    {currentProfile === "ADMIN" && (
              <button onClick={() => handleSetAdmin("none")}>
                None
              </button>
            )}
          </div>
        </div>
        {(match1Away === null || match2Away === null || match3Away === null) &&
          (match1Home === null || match2Home === null || match3Home === null) &&
          currentProfile !== "NONE" && (
            <button onClick={() => handleSetPlayers()}>Set Match</button>
          )}

        <div className="bracket">
          <h2>{currentMatch?.awayTeam?.teamName}</h2>
          <div className="w325">
            <TeamPlayers
              adjustedTeam={awayTeamPlayers}
              team={currentMatch?.awayTeam}
              matchPlayer={player2}
              title="Away"
              handleChoosePlayer={handleChoosePlayer}
            />
            {currentProfile === "ADMIN" && (
              <button onClick={() => handleSetAdmin("away")}>
                Admin for AWAY Team
              </button>
            )}
            {currentProfile === "ADMIN" && (
              <button onClick={() => handleSetAdmin("none")}>
                None
              </button>
            )}
          </div>
        </div>
      </div>

      {match3Home !== null && currentMatch?.match3Completed !== true && (
        <>
          <h2 className="center bracket w300">Home Team Match 3</h2>
          <SingleMatch
            tableId={currentMatch}
            currentProfile={currentProfile}
            homeTeam={currentMatch?.homeTeam}
            awayTeam={currentMatch?.awayTeam}
            player1={currentMatch?.homeMatch3?.player1}
            player2={currentMatch?.homeMatch3?.player2}
            handleUpdateMatch={handleUpdateMatch}
            player1Wins={currentMatch?.homeMatch3?.player1Wins}
            player2Wins={currentMatch?.homeMatch3?.player2Wins}
            currentMatch={currentMatch?.homeMatch3}
            currentMatchData={currentMatchData}
            profile={props.profile}
            handleCancel={handleCancel}
            match={match3Home}
            mth="3"
            Key="3"
          />
        </>
      )}
      {match3Away !== null &&
        currentProfile === "AWAY" &&
        currentMatch?.match3Completed !== true && (
          <>
            <h2 className="center bracket w300">Away Team Match 3</h2>
            {currentProfile === "AWAY" && (
              <SingleMatch
                tableId={currentMatch}
                currentProfile={currentProfile}
                homeTeam={currentMatch?.homeTeam}
                awayTeam={currentMatch?.awayTeam}
                player1={currentMatch?.awayMatch3?.player1}
                player2={currentMatch?.awayMatch3?.player2}
                handleUpdateMatch={handleUpdateMatch}
                player1Wins={currentMatch?.awayMatch3?.player1Wins}
                player2Wins={currentMatch?.awayMatch3?.player2Wins}
                currentMatch={currentMatch?.awayMatch3}
                currentMatchData={currentMatchData}
                profile={props.profile}
                handleCancel={handleCancel}
                match={match3Away}
                mth="3"
                Key="3"
              />
            )}
          </>
        )}
      {match2Home !== null && currentMatch?.match2Completed != true && (
        <>
          <h2 className="center bracket w300 ">Home Team Match 2</h2>
          <SingleMatch
            tableId={currentMatch}
            currentProfile={currentProfile}
            homeTeam={currentMatch?.homeTeam}
            awayTeam={currentMatch?.awayTeam}
            player1={currentMatch?.homeMatch2?.player1}
            player2={currentMatch?.homeMatch2?.player2}
            handleUpdateMatch={handleUpdateMatch}
            player1Wins={currentMatch?.homeMatch2?.player1Wins}
            player2Wins={currentMatch?.homeMatch2?.player2Wins}
            currentMatch={currentMatch?.homeMatch2}
            currentMatchData={currentMatchData}
            profile={props.profile}
            handleCancel={handleCancel}
            match={match2Home}
            mth="2"
            Key="2"
          />
        </>
      )}
      {match2Away !== null &&
        currentProfile === "AWAY" &&
        currentMatch?.match2Completed != true && (
          <>
            <h2 className="center bracket w300 ">Away Team Match 2</h2>
            {currentProfile === "AWAY" && (
              <SingleMatch
                tableId={currentMatch}
                currentProfile={currentProfile}
                homeTeam={currentMatch?.homeTeam}
                awayTeam={currentMatch?.awayTeam}
                player1={currentMatch?.awayMatch2?.player1}
                player2={currentMatch?.awayMatch2?.player2}
                handleUpdateMatch={handleUpdateMatch}
                player1Wins={currentMatch?.awayMatch2?.player1Wins}
                player2Wins={currentMatch?.awayMatch2?.player2Wins}
                currentMatch={currentMatch?.awayMatch2}
                currentMatchData={currentMatchData}
                profile={props.profile}
                handleCancel={handleCancel}
                match={match2Away}
                mth="2"
                Key="2"
              />
            )}
          </>
        )}
      {match1Home !== null &&
        currentMatch?.match1 !== true &&
        currentMatch?.match1Completed !== true && (
          <>
            <h2 className="center bracket w300 ">Home Team Match 1</h2>
            {currentProfile === "HOME" && (
              <SingleMatch
                tableId={currentMatch}
                currentProfile={currentProfile}
                homeTeam={currentMatch?.homeTeam}
                awayTeam={currentMatch?.awayTeam}
                player1={currentMatch?.homeMatch1?.player1}
                player2={currentMatch?.homeMatch1?.player2}
                handleUpdateMatch={handleUpdateMatch}
                player1Wins={currentMatch?.homeMatch1?.player1Wins}
                player2Wins={currentMatch?.homeMatch1?.player2Wins}
                currentMatch={currentMatch?.homeMatch1}
                currentMatchData={currentMatchData}
                profile={props.profile}
                handleCancel={handleCancel}
                match={match1Home}
                mth="1"
                Key="1"
              />
            )}
          </>
        )}
      {match1Away !== null &&
        currentProfile === "AWAY" &&
        currentMatch?.match1Completed !== true && (
          <>
            <h2 className="center bracket w300 ">Away Team Match 1</h2>
            {currentProfile === "AWAY" && (
              <SingleMatch
                tableId={currentMatch}
                currentProfile={currentProfile}
                homeTeam={currentMatch?.homeTeam}
                awayTeam={currentMatch?.awayTeam}
                player1={currentMatch?.awayMatch1?.player1}
                player2={currentMatch?.awayMatch1?.player2}
                handleUpdateMatch={handleUpdateMatch}
                player1Wins={currentMatch?.awayMatch1?.player1Wins}
                player2Wins={currentMatch?.awayMatch1?.player2Wins}
                currentMatch={currentMatch?.awayMatch1}
                currentMatchData={currentMatchData}
                profile={props.profile}
                handleCancel={handleCancel}
                match={match1Away}
                mth="1"
                Key="1"
              />
            )}
          </>
        )}

      {!currentMatch?.match1Completed && currentProfile === "NONE" &&
      <>
        <div className="bracket">
          Match 1 has not been completed.
        </div>
      </>
      }  
      {!currentMatch?.match2Completed && currentProfile === "NONE" &&
      <>
        <div className="bracket">
          Match 2 has not been completed.
        </div>
      </>
      }  
      {!currentMatch?.match3Completed && currentProfile === "NONE" &&
      <>
        <div className="bracket">
          Match 3 has not been completed.
        </div>
      </>
      }  

      {currentMatch?.match1Completed && (
        <>
          <div className="bracket">
            MATCH 1
            <CompletedMatch currentMatch={passedMatch1} />
          </div>
        </>
      )}
      {currentMatch?.match2Completed && (
        <>
          <div className="bracket">
            MATCH 2
            <CompletedMatch currentMatch={passedMatch2} />
          </div>
        </>
      )}
      {currentMatch?.match3Completed && (
        <>
          <div className="bracket">
            MATCH 3
            <CompletedMatch currentMatch={passedMatch3} />
          </div>
        </>
      )}
    </>
  )
}

export default ViewOneSession
