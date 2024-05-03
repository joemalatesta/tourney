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

  useEffect(() => {
    const getSession = async () => {
      const data = await tableService.findOne(tableId)
      setCurrentMatch(data)
    }
    getSession()
  }, [tableId])

  useEffect(() => {
    const getMatchesIfAvail = async () => {
      if (currentMatch?.match1 == null) return
      else {
        setMatch1([
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
      getSession()
    }
    if (mth === "2") {
      setMatch2(null)
      await tableService.update({ ...currentMatch, match2: null })
      getSession()
    }
    if (mth === "3") {
      setMatch3(null)
      await tableService.update({ ...currentMatch, match3: null })
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
      if (match2 === null && match1 !== null  ) {
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
      await setPlayer1(null)
      await setPlayer2(null)
    }
  }

  const handleSubmitMatch = async () => {}

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
        {(match1 === null || match2 === null || match3 === null) &&
          <button onClick={() => handleSetPlayers()}>Set Match</button>
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
          Match 3
          <SingleMatch
            profile={props.profile}
            handleCancel={handleCancel}
            match={match3}
            mth="3"
          />
        </>
      )}
      {match2 !== null && (
        <>
          Match 2
          <SingleMatch
            profile={props.profile}
            handleCancel={handleCancel}
            match={match2}
            mth="2"
          />
        </>
      )}
      {match1 !== null && (
        <>
          Match 1
          <SingleMatch
            profile={props.profile}
            handleCancel={handleCancel}
            match={match1}
            mth="1"
          />
        </>
      )}
    </>
  )
}

export default ViewOneSession
