import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"
import * as tableService from "../../services/tableService"
import * as matchService from "../../services/matchService"
import TeamPlayers from "../../components/TeamPlayers/TeamPlayers"
import SingleMatch from "../../components/SingleMatch/SingleMatch"

const ViewOneSession = (props) => {
  const [currentMatch, setCurrentMatch] = useState()
  const location = useLocation()
  const queryString = location.search
  const params = new URLSearchParams(queryString)
  const tableId = params.get("tableId")
  const [match1, setMatch1] = useState(null)
  const [match2, setMatch2] = useState(null)
  const [match3, setMatch3] = useState(null)
  const [player1, setPlayer1] = useState(null)
  const [player2, setPlayer2] = useState(null)
  const [toggleSetMatch, setToggleSetMatch] = useState(true)

  useEffect(() => {
    const getSession = async () => {
      const data = await tableService.findOne(tableId)
      setCurrentMatch(data)
    }
    getSession()
  }, [tableId])

  useEffect(() => {
    const getUpdatedMatch = async () => {
      const data = await matchService.findOne(currentMatch?._id)
      setCurrentMatch(data)
    }
    getUpdatedMatch
  }, [currentMatch])

  const handleUpdateMatch = async () => {
    const data = await matchService.findOne(currentMatch?._id)
    setCurrentMatch(data)
  }

  useEffect(() => {
    const setToggle = () => {
      if (
        currentMatch?.match1 !== null &&
        currentMatch?.match1.completed === false
      ) {
        setToggleSetMatch(false)
      } else if (
        currentMatch?.match2 !== null &&
        currentMatch?.match2.completed === false
      ) {
        setToggleSetMatch(false)
      } else if (
        currentMatch?.match3 !== null &&
        currentMatch?.match3.completed === false
      ) {
        setToggleSetMatch(false)
      }
    }
    setToggle()
  }, [toggleSetMatch])

  useEffect(() => {
    const getMatchesIfAvail = async () => {
      if (currentMatch?.match1 == null) return
      else {
        await setMatch1([
          currentMatch?.match1?.player1,
          currentMatch?.match1?.player2,
        ])
      }
      if (currentMatch?.match2 == null) return
      else {
        setMatch2([
          currentMatch?.match2?.player1,
          currentMatch?.match2?.player2,
        ])
      }
      if (currentMatch?.match3 == null) return
      else {
        setMatch3([
          currentMatch?.match3?.player1,
          currentMatch?.match3?.player2,
        ])
      }
    }
    getMatchesIfAvail()
  }, [currentMatch])

  useEffect(() => {}, [match1, match2, match3])

  const getSession = async () => {
    const data = await tableService.findOne(tableId)
    setCurrentMatch(data)
  }

  const handleCancel = async (mth) => {
    if (mth === "1") {
      setMatch1(null)
      await tableService.update({ ...currentMatch, match1: null })
      await matchService.deleteOne(currentMatch?.match1?._id)
      getSession()
    }
    if (mth === "2") {
      setMatch2(null)
      await tableService.update({ ...currentMatch, match2: null })
      await matchService.deleteOne(currentMatch?.match2?._id)
      getSession()
    }
    if (mth === "3") {
      setMatch3(null)
      await tableService.update({ ...currentMatch, match3: null })
      await matchService.deleteOne(currentMatch?.match3?._id)
      getSession()
    }
  }

  const handleChoosePlayer = (player, title) => {
    if (title === "Home") {
      setPlayer1(player)
    }
    if (title === "Away") {
      setPlayer2(player)
    }
  }
  const handleSetPlayers = async () => {
    setToggleSetMatch(!toggleSetMatch)
    if (player1 !== null && player2 !== null) {
      if (match1 === null) {
        await setMatch1([player1, player2])
        const createdMatch = await matchService.create({
          player1: player1,
          player2: player2,
        })
        await tableService.update({ ...currentMatch, match1: createdMatch._id })
        getSession()
      }
      if (match2 === null && match1 !== null) {
        await setMatch2([player1, player2])
        const createdMatch = await matchService.create({
          player1: player1,
          player2: player2,
        })
        await tableService.update({ ...currentMatch, match2: createdMatch._id })
        getSession()
      }
      if (match3 === null && match1 !== null && match2 !== null) {
        await setMatch3([player1, player2])
        const createdMatch = await matchService.create({
          player1: player1,
          player2: player2,
        })
        await tableService.update({ ...currentMatch, match3: createdMatch._id })
        getSession()
      }
      await handleSubmitMatch()
    }
  }

  const handleSubmitMatch = async () => {}

  const handleFinishMatch = () => {
    console.log('the match was submitted here they are', currentMatch.match1, currentMatch.match2, currentMatch.match3);
  }

  const allMatchesPlayed = (currentMatch?.match1?.completed === true && currentMatch?.match2?.completed === true && currentMatch?.match3?.completed === true)

  return (
    <>
      <div className="row center space-around">
        <div className="bracket">
          <h2>{currentMatch?.homeTeam.teamName}</h2>
          <div className="w325">
            <TeamPlayers
              team={currentMatch?.homeTeam}
              matchPlayer={player1}
              title="Home"
              handleChoosePlayer={handleChoosePlayer}
            />
          </div>
        </div>
        {(match1 === null || match2 === null || match3 === null) && (
          <button onClick={() => handleSetPlayers()}>Set Match</button>
        )}

        {allMatchesPlayed && 
          <button onClick={handleFinishMatch}>SUBMIT MATCHES?</button>
        }

        <div className="bracket">
          <h2>{currentMatch?.awayTeam.teamName}</h2>
          <div className="w325">
            <TeamPlayers
              team={currentMatch?.awayTeam}
              matchPlayer={player2}
              title="Away"
              handleChoosePlayer={handleChoosePlayer}
            />
          </div>
        </div>
      </div>

      {match3 !== null && (
        <>
          <h2 className="center">Match 3</h2>
          <SingleMatch
            player1={currentMatch?.match3?.player1}
            player2={currentMatch?.match3?.player2}
            handleUpdateMatch={handleUpdateMatch}
            player1Wins={currentMatch.match3?.player1Wins}
            player2Wins={currentMatch.match3?.player2Wins}
            currentMatch={currentMatch.match3}
            profile={props.profile}
            handleCancel={handleCancel}
            match={match3}
            mth="3"
            key="3"
          />
        </>
      )}
      {match2 !== null && (
        <>
          <h2 className="center">Match 2</h2>
          <SingleMatch
            player1={currentMatch?.match2?.player1}
            player2={currentMatch?.match2?.player2}
            handleUpdateMatch={handleUpdateMatch}
            player1Wins={currentMatch.match2?.player1Wins}
            player2Wins={currentMatch.match2?.player2Wins}
            p
            currentMatch={currentMatch.match2}
            profile={props.profile}
            handleCancel={handleCancel}
            match={match2}
            mth="2"
            key="2"
          />
        </>
      )}
      {match1 !== null && (
        <>
          <h2 className="center">Match 1</h2>
          <SingleMatch
            player1={currentMatch?.match1?.player1}
            player2={currentMatch?.match1?.player2}
            handleUpdateMatch={handleUpdateMatch}
            player1Wins={currentMatch?.match1?.player1Wins}
            player2Wins={currentMatch?.match1?.player2Wins}
            currentMatch={currentMatch?.match1}
            profile={props.profile}
            handleCancel={handleCancel}
            match={match1}
            mth="1"
            Key="1"
          />
        </>
      )}
    </>
  )
}

export default ViewOneSession
