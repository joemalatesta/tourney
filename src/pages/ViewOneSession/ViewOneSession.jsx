import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"

import MatchLayout from "../../components/MatchLayout/MatchLayout"
import ShowRace from "../../components/ShowRace/ShowRace"

import * as tableService from "../../services/tableService"
import * as teamService from "../../services/teamService"
import * as matchService from "../../services/matchService"
import * as playerService from "../../services/playerService"

const ViewOneSession = ({ profile, players, teams }) => {
  const [currentMatch, setCurrentMatch] = useState()
  const [sessionInfo, setSessionInfo] = useState()
  const [chosenHomePlayer, setChosenHomePlayer] = useState()
  const [chosenAwayPlayer, setChosenAwayPlayer] = useState()
  const [match1, setMatch1] = useState()
  const [match2, setMatch2] = useState()
  const [match3, setMatch3] = useState()
  const [homeTeamPlayers, setHomeTeamPlayers] = useState([])
  const [awayTeamPlayers, setAwayTeamPlayers] = useState([])
  const [currentProfile, setCurrentProfile] = useState("")
  const [toggleSetMatch, setToggleSetMatch] = useState(true)

  const { search } = useLocation()
  const tableId = new URLSearchParams(search).get("tableId")

  useEffect(() => {
    const fetchSessionInfo = async () => {
      const data = await tableService.findOne(tableId)
      setCurrentMatch(data)
      setSessionInfo(data)
    }
    fetchSessionInfo()
  }, [tableId])

  useEffect(() => {
    if (!currentMatch) return

    const fetchTeamPlayers = async () => {
      const [homeData, awayData] = await Promise.all([
        teamService.findOne(currentMatch.homeTeam?._id),
        teamService.findOne(currentMatch.awayTeam?._id),
      ])
      setHomeTeamPlayers(homeData)
      setAwayTeamPlayers(awayData)
    }

    fetchTeamPlayers()
  }, [currentMatch])

  useEffect(() => {
    if (!currentMatch || !profile) return

    const isInTeam = (team, profileId) =>
      team?.teamPlayers?.some((player) => player.profile === profileId)

    if (isInTeam(homeTeamPlayers, profile._id)) {
      setCurrentProfile("HOME")
    } else if (isInTeam(awayTeamPlayers, profile._id)) {
      setCurrentProfile("AWAY")
    } else {
      setCurrentProfile(profile.accessLevel === 90 ? "ADMIN" : "NONE")
    }
  }, [currentMatch, profile, homeTeamPlayers, awayTeamPlayers])

  useEffect(() => {
    if (!currentMatch) return

    const checkIncompleteMatch = () => {
      const { match1, match2, match3 } = currentMatch
      if ([match1, match2, match3].some((m) => m && !m.completed)) {
        setToggleSetMatch(false)
      }
    }

    checkIncompleteMatch()
  }, [currentMatch])

  useEffect(() => {
    if (currentProfile !== "HOME" || !currentMatch) return

    const updateMatches = () => {
      if (currentMatch.Match1)
        setMatch1([currentMatch.Match1.player1, currentMatch.Match1.player2])
      if (currentMatch.Match2)
        setMatch2([currentMatch.Match2.player1, currentMatch.Match2.player2])
      if (currentMatch.Match3)
        setMatch3([currentMatch.Match3.player1, currentMatch.Match3.player2])
    }

    updateMatches()
  }, [currentMatch, currentProfile])

  const getPlayersForTeam = (teamId) => {
    const team =
      teamId === sessionInfo?.homeTeam?._id
        ? sessionInfo.homeTeam
        : teamId === sessionInfo?.awayTeam?._id
        ? sessionInfo.awayTeam
        : null

    if (!team) return []
    return players.filter((player) => team.teamPlayers.includes(player._id))
  }

  const addPlayer = (player, position) => {
    if (position === "home") setChosenHomePlayer(player)
    if (position === "away") setChosenAwayPlayer(player)
  }

  const handleSetPlayers = async () => {
    if (currentProfile !== "HOME" || !chosenHomePlayer || !chosenAwayPlayer)
      return

    setToggleSetMatch(!toggleSetMatch)

    const matches = [match1, match2, match3]
    const matchSetters = [setMatch1, setMatch2, setMatch3]
    const matchKeys = ["match1", "match2", "match3"]

    for (let i = 0; i < matches.length; i++) {
      if (!matches[i]) {
        const newMatch = await matchService.create({
          player1: chosenHomePlayer,
          player2: chosenAwayPlayer,
        })

        await tableService.update({
          ...currentMatch,
          [matchKeys[i]]: newMatch._id,
        })

        matchSetters[i]([chosenHomePlayer, chosenAwayPlayer])
        break
      }
    }
  }

  const startMatch = async () => {
    await matchService.create({
      player1: chosenHomePlayer,
      player2: chosenAwayPlayer,
    })
    console.log(
      `${chosenHomePlayer.nameFirst} is playing ${chosenAwayPlayer.nameFirst}`
    )
    handleSetPlayers()
  }

  return (
    <>
      <h2 className="center">Table number {sessionInfo?.tableNumber}</h2>

      {sessionInfo && (
        <div className="row center space-around">
          <div className="bracket">
            <h3 className="center">{sessionInfo.homeTeam.teamName}</h3>
            <div className="w325 green-felt margin">
              {getPlayersForTeam(sessionInfo.homeTeam._id).map((player) => (
                <div
                  key={player._id}
                  onClick={() => addPlayer(player, "home")}
                  style={
                    chosenHomePlayer?._id === player._id
                      ? { fontSize: "150%", color: "gold" }
                      : {}
                  }
                >
                  {player.nameFirst} {player.nameLast} ({player.rank})
                </div>
              ))}
            </div>
          </div>
          <div>
            {currentProfile === "HOME" ? (
              <button onClick={startMatch}>Add Players</button>
            ) : (
              <div>Home Team will create match</div>
            )}

            <ShowRace 
              info = {sessionInfo}
              player1 = {chosenHomePlayer}
              player2 = {chosenAwayPlayer}
            />
          </div>

          <div className="bracket">
            <h3 className="center">{sessionInfo.awayTeam.teamName}</h3>
            <div className="w325 green-felt margin">
              {getPlayersForTeam(sessionInfo.awayTeam._id).map((player) => (
                <div
                  key={player._id}
                  onClick={() => addPlayer(player, "away")}
                  style={
                    chosenAwayPlayer?._id === player._id
                      ? { fontSize: "150%", color: "gold" }
                      : {}
                  }
                >
                  {player.nameFirst} {player.nameLast} ({player.rank})
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <MatchLayout
        players={players}
        teams={teams}
        profile={profile}
        homePlayer={chosenHomePlayer}
        awayPlayer={chosenAwayPlayer}
        sessionInfo={sessionInfo}
        match1={match1}
        match2={match2}
        match3={match3}
      />
    </>
  )
}

export default ViewOneSession
