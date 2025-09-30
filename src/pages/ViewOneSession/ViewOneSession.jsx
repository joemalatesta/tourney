import { useState, useEffect, useMemo } from "react"
import { useLocation } from "react-router-dom"

import MatchLayout from "../../components/MatchLayout/MatchLayout"
import ShowRace from "../../components/ShowRace/ShowRace"

import * as tableService from "../../services/tableService"
import * as teamService from "../../services/teamService"
import * as matchService from "../../services/matchService"

const ViewOneSession = ({ profile, players, teams }) => {
  const [sessionInfo, setSessionInfo] = useState(null)
  const [chosenHomePlayer, setChosenHomePlayer] = useState(null)
  const [chosenAwayPlayer, setChosenAwayPlayer] = useState(null)
  const [homeTeamData, setHomeTeamData] = useState(null)
  const [awayTeamData, setAwayTeamData] = useState(null)
  const [currentProfile, setCurrentProfile] = useState("")

  const { search } = useLocation()
  const tableId = new URLSearchParams(search).get("tableId")

  useEffect(() => {
    const fetchData = async () => {
      const session = await tableService.findOne(tableId)
      setSessionInfo(session)

      const [homeTeam, awayTeam] = await Promise.all([
        teamService.findOne(session.homeTeam._id),
        teamService.findOne(session.awayTeam._id),
      ])
      setHomeTeamData(homeTeam)
      setAwayTeamData(awayTeam)
    }
    fetchData()
  }, [tableId])

  useEffect(() => {
    if (!profile || !homeTeamData || !awayTeamData) return

    const isPlayerInTeam = (team) =>
      team?.teamPlayers?.some((p) => p.profile === profile._id)

    if (isPlayerInTeam(homeTeamData)) setCurrentProfile("HOME")
    else if (isPlayerInTeam(awayTeamData)) setCurrentProfile("AWAY")
    else setCurrentProfile(profile.accessLevel === 90 ? "ADMIN" : "NONE")
  }, [profile, homeTeamData, awayTeamData])

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

  const matches = useMemo(() => {
    if (!sessionInfo) return []
    return [sessionInfo.match1, sessionInfo.match2, sessionInfo.match3]
  }, [sessionInfo])

  const allMatchesFilled = matches.every(Boolean)

  const handleSetPlayers = async () => {
    if (!chosenHomePlayer || !chosenAwayPlayer || allMatchesFilled) return

    const availableIndex = matches.findIndex((m) => !m)
    if (availableIndex === -1) return

    const newMatch = await matchService.create({
      player1: chosenHomePlayer,
      player2: chosenAwayPlayer,
    })

    const updatedSession = {
      ...sessionInfo,
      [`match${availableIndex + 1}`]: newMatch._id,
    }

    await tableService.update(updatedSession)
    setSessionInfo(updatedSession)
    setChosenHomePlayer(null)
    setChosenAwayPlayer(null)
  }

  return (
    <>
      <h2 className="center">Table number {sessionInfo?.tableNumber}</h2>

      {sessionInfo && (
        <div className="row center space-around">
          {/* Home Team */}
          <div className="bracket">
            <h3 className="center">{sessionInfo.homeTeam.teamName}</h3>
            <div className="w325 green-felt margin">
              {getPlayersForTeam(sessionInfo.homeTeam._id).map((player) => (
                <div
                  key={player._id}
                  onClick={() => setChosenHomePlayer(player)}
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

          {/* Middle Panel */}
          <div>
            {currentProfile === "HOME" ? (
              <>
                {!chosenHomePlayer || !chosenAwayPlayer ? (
                  <div className="bracket" style={{ color: "red" }}>
                    Choose players for match
                  </div>
                ) : allMatchesFilled ? (
                  <div className="bracket" style={{ color: "red" }}>
                    All 3 matches are already set
                  </div>
                ) : (
                  <button
                    className="bracket"
                    style={{ color: "green" }}
                    onClick={handleSetPlayers}
                  >
                    SUBMIT PLAYERS TO MATCH
                  </button>
                )}
              </>
            ) : (
              <div className="bracket">Home Team will create match</div>
            )}
            <br />
            <ShowRace
              info={sessionInfo}
              player1={chosenHomePlayer}
              player2={chosenAwayPlayer}
            />
          </div>

          {/* Away Team */}
          <div className="bracket">
            <h3 className="center">{sessionInfo.awayTeam.teamName}</h3>
            <div className="w325 green-felt margin">
              {getPlayersForTeam(sessionInfo.awayTeam._id).map((player) => (
                <div
                  key={player._id}
                  onClick={() => setChosenAwayPlayer(player)}
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
        currentProfile={currentProfile}
      />
    </>
  )
}

export default ViewOneSession
