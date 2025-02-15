import { useLocation } from "react-router-dom"
import * as tableService from "../../services/tableService"
import * as playerService from "../../services/playerService"
import * as matchService from "../../services/matchService"
import { useState, useEffect } from "react"
import HomeAndAwayPlayerList from "../../components/HomeAndAwayPlayerList/HomeAndPlayerList"
import SingleMatch from "../../components/SingleMatch/SingleMatch"

const StartMatch = (props) => {

  const location = useLocation()
  const queryString = location.search
  const params = new URLSearchParams(queryString)
  const tableId = params.get("tableId")
  const home = "home"
  const away = "away"

  useEffect(() => {
  }, [tableId])

  const [currentMatch, setCurrentMatch] = useState()
  const [table, setTable] = useState(null)
  const [homePlayers, setHomePlayers] = useState([])
  const [awayPlayers, setAwayPlayers] = useState([])
  const [awayOrHome, setAwayOrHome] = useState(null)
  const [matchPlayers, setMatchPlayers] = useState({
    match1Home: null,
    match1Away: null,
    match2Home: null,
    match2Away: null,
    match3Home: null,
    match3Away: null,
  })

  useEffect(() => {
    const determineTeam = () => {
      if (homePlayers.some((player) => player.profile === props.profile._id)) {
        setAwayOrHome("HOME")
      } else if (
        awayPlayers.some((player) => player.profile === props.profile._id)
      ) {
        setAwayOrHome("AWAY")
      } else {
        if (props.profile.accessLevel === 90) setAwayOrHome("ADMIN")
        else setAwayOrHome("NONE")
      }
    }

    determineTeam()
  }, [homePlayers, awayPlayers, props.profile._id])

  useEffect(() => {
    if (tableId) {
      tableService
        .findOne(tableId)
        .then((data) => {
          setTable(data)

          if (data.homeTeam?.teamPlayers) {
            Promise.all(
              data.homeTeam.teamPlayers.map((playerId) =>
                playerService
                  .findOne(playerId)
                  .then((player) => ({ ...player }))
              )
            )
              .then((players) => players.sort((a, b) => b.rank - a.rank))
              .then(setHomePlayers)
          }

          if (data.awayTeam?.teamPlayers) {
            Promise.all(
              data.awayTeam.teamPlayers.map((playerId) =>
                playerService
                  .findOne(playerId)
                  .then((player) => ({ ...player }))
              )
            )
              .then((players) => players.sort((a, b) => b.rank - a.rank))
              .then(setAwayPlayers)
          }
        })
        .catch((error) => {
          console.error("Error fetching table data:", error)
        })
    }
  }, [tableId])

  console.log(currentMatch);
  

  const setPlayerForMatch = (playerObj, teamid, match) => {
    setMatchPlayers((prevMatchPlayers) => {
      const updatedMatchPlayers = { ...prevMatchPlayers }

      if (match === 1) {
        updatedMatchPlayers[teamid === "home" ? "match1Home" : "match1Away"] =
          playerObj
      } else if (match === 2) {
        updatedMatchPlayers[teamid === "home" ? "match2Home" : "match2Away"] =
          playerObj
      } else if (match === 3) {
        updatedMatchPlayers[teamid === "home" ? "match3Home" : "match3Away"] =
          playerObj
      }

      console.log("Updated matchPlayers:", updatedMatchPlayers)
      return updatedMatchPlayers
    })
  }

  const submitPlayersToMatch = async (match) => {
    const updatedMatch = await matchService.create({
      ...match,
      player1: matchPlayers.match1Home,
      player2: matchPlayers.match1Away,
      submitted: true,
    })

    setCurrentMatch(updatedMatch)

    if (match === 1 && table.homeMatch1 !== "null") {
      if (awayOrHome === "HOME") {
        await tableService.update({
          ...table,
          homeMatch1: updatedMatch._id,
        })
      }
      if (awayOrHome === "AWAY") {
        await tableService.update({
          ...table,
          awayMatch1: updatedMatch._id,
        })
      }
    }
  }

        // await playerStatsService.adjustPlayerStats(data)
        // await teamStatsService.adjustTeamStats(
        //   data,
        //   props.homeTeam,
        //   props.awayTeam
        // )

  return (
    <>
      {awayOrHome}
      <div className="">
        {currentMatch?.submitted !== "null" && (
          <SingleMatch
            currentProfile={props.profile}
            homeTeam={currentMatch?.homeTeam}
            awayTeam={currentMatch?.awayTeam}
            player1={currentMatch?.homeMatch3?.player1}
            player2={currentMatch?.homeMatch3?.player2}
            player1Wins={currentMatch?.homeMatch1?.player1Wins}
            player2Wins={currentMatch?.homeMatch1?.player2Wins}
            currentMatch={currentMatch?.homeMatch3}
            profile={props.profile}
            mth="1"
            Key="1"
          />
        )}
        {currentMatch?.submitted == "null" && (
          <div className="bracket">
            <HomeAndAwayPlayerList
              submitPlayersToMatch={submitPlayersToMatch}
              homePlayer={matchPlayers.match1Home}
              awayPlayer={matchPlayers.match1Away}
              awayOrHome={awayOrHome}
              setPlayerForMatch={setPlayerForMatch}
              home={home}
              away={away}
              homePlayers={homePlayers}
              awayPlayers={awayPlayers}
              profile={props.profile}
              table={table}
              match={1}
              submitted={currentMatch?.submitted}
            />
          </div>
        )}
      </div>
    </>
  )
}

export default StartMatch
