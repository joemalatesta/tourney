import { useLocation } from "react-router-dom"
import * as tableService from "../../services/tableService"
import * as playerService from "../../services/playerService"
import { useState, useEffect } from "react"
import HomeAndAwayPlayerList from "../../components/HomeAndAwayPlayerList/HomeAndPlayerList"

const StartMatch = (props) => {
  const location = useLocation()
  const queryString = location.search
  const params = new URLSearchParams(queryString)
  const tableId = params.get("tableId")

  const home = "home"
  const away = "away"

  useEffect(() => {
    console.log("hit tableId useEffect")
  }, [tableId])

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
        if (props.profile.accessLevel === 90) setAwayOrHome("ADMIN")
        else setAwayOrHome("HOME")
      } else if (
        awayPlayers.some((player) => player.profile === props.profile._id)
      ) {
        if (props.profile.accessLevel === 90) setAwayOrHome("ADMIN")
        else setAwayOrHome("AWAY")
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

  const setPlayerForMatch = (playerObj, teamid, match) => {
    console.log(playerObj, match, teamid)
    if (match == 1)
      if (teamid == "home")
        setMatchPlayers({...matchPlayers, match1Home : playerObj})
      else setMatchPlayers({...matchPlayers, match1Away :playerObj})
    if (match == 2)
      if (teamid == "home")
        setMatchPlayers({...matchPlayers, match2Home : playerObj})
      else setMatchPlayers({...matchPlayers, match2Away :playerObj})
    if (match == 3)
      if (teamid == "home")
        setMatchPlayers({...matchPlayers, match3Home : playerObj})
      else setMatchPlayers({...matchPlayers, match3Away :playerObj})
      console.log(matchPlayers)
  }


  return (
    <>
      {awayOrHome}
      <div className="">
        <div className="bracket">
          <HomeAndAwayPlayerList
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
          />
        </div>
        <div className="bracket">
          <HomeAndAwayPlayerList
            homePlayer={matchPlayers.match2Home}
            awayPlayer={matchPlayers.match2Away}
            awayOrHome={awayOrHome}
            setPlayerForMatch={setPlayerForMatch}
            home={home}
            away={away}
            homePlayers={homePlayers}
            awayPlayers={awayPlayers}
            profile={props.profile}
            table={table}
            match={2}
          />
        </div>
        <div className="bracket">
          <HomeAndAwayPlayerList
            homePlayer={matchPlayers.match3Home}
            awayPlayer={matchPlayers.match3Away}
            awayOrHome={awayOrHome}
            setPlayerForMatch={setPlayerForMatch}
            home={home}
            away={away}
            homePlayers={homePlayers}
            awayPlayers={awayPlayers}
            profile={props.profile}
            table={table}
            match={3}
          />
        </div>
      </div>
    </>
  )
}

export default StartMatch