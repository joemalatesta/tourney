import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"

import MatchLayout from "../../components/MatchLayout/MatchLayout"
import ShowRace from "../../components/ShowRace/ShowRace"

import * as tableService from "../../services/tableService"
import * as matchService from "../../services/matchService"
import * as playerStatService from "../../services/playerStatsService"
import * as teamStatService from "../../services/teamStatsService"
import { confetti }  from "../../services/confetti"

const ViewOneSession = ({ profile, players, teams }) => {
  const [sessionInfo, setSessionInfo] = useState(null)
  const [chosenHomePlayer, setChosenHomePlayer] = useState(null)
  const [chosenAwayPlayer, setChosenAwayPlayer] = useState(null)
  const [currentProfile, setCurrentProfile] = useState("")
  const [savingMatch, setSavingMatch] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [submittingStats, setSubmittingStats] = useState(false)

  const { search } = useLocation()
  const tableId = new URLSearchParams(search).get("tableId")

  const refreshTable = async () => {
    if (!tableId) return

    const latestTable = await tableService.findOne(tableId)

    if (latestTable && !latestTable.message) {
      setSessionInfo(latestTable)
    }

    return latestTable
  }


  useEffect(() => {
    let cancelled = false

    const fetchTable = async () => {
      if (!tableId) return

      try {
        const table = await tableService.findOne(tableId)

        if (!cancelled) {
          setSessionInfo(table)
        }
      } catch (error) {
        console.error("Error fetching table:", error)
      }
    }

    fetchTable()

    return () => {
      cancelled = true
    }
  }, [tableId])

  useEffect(() => {
    if (!profile || !sessionInfo?.homeTeam || !sessionInfo?.awayTeam) {
      setCurrentProfile("")
      return
    }

    const isPlayerInTeam = (team) => {
      const teamPlayerIds = (team.teamPlayers || []).map((player) =>
        String(
          typeof player === "object" && player !== null ? player._id : player,
        ),
      )

      return (players || []).some((player) => {
        const playerProfileId = player.profile?._id ?? player.profile

        return (
          teamPlayerIds.includes(String(player._id)) &&
          playerProfileId != null &&
          String(playerProfileId) === String(profile._id)
        )
      })
    }

    if (isPlayerInTeam(sessionInfo.homeTeam)) {
      setCurrentProfile("HOME")
    } else if (isPlayerInTeam(sessionInfo.awayTeam)) {
      setCurrentProfile("AWAY")
    } else {
      setCurrentProfile(Number(profile.accessLevel) === 90 ? "ADMIN" : "NONE")
    }
  }, [profile, sessionInfo, players])

  const getPlayersForTeam = (teamId) => {
    const homeTeam = sessionInfo?.homeTeam
    const awayTeam = sessionInfo?.awayTeam

    const team =
      String(teamId) === String(homeTeam?._id)
        ? homeTeam
        : String(teamId) === String(awayTeam?._id)
          ? awayTeam
          : null

    if (!team) return []

    const teamPlayerIds = (team.teamPlayers || []).map((player) =>
      String(
        typeof player === "object" && player !== null ? player._id : player,
      ),
    )

    return (players || []).filter((player) =>
      teamPlayerIds.includes(String(player._id)),
    )
  }

  const matches = [
    sessionInfo?.match1,
    sessionInfo?.match2,
    sessionInfo?.match3,
  ]

  const allMatchesFilled = matches.every(Boolean)

  const handleSetPlayers = async () => {
    
    if (
      !chosenHomePlayer ||
      !chosenAwayPlayer ||
      savingMatch ||
      allMatchesFilled
    ) {
      return
    }

    if (currentProfile !== "HOME" && currentProfile !== "AWAY") {
      setErrorMessage("Only a member of either team can create a match.")
      return
    }

    const availableIndex = matches.findIndex((match) => !match)

    if (availableIndex === -1) {
      setErrorMessage("All 3 matches are already set.")
      return
    }

    const matchField = `match${availableIndex + 1}`

    setSavingMatch(true)
    setErrorMessage("")

    try {
      // Refresh first so we don't knowingly overwrite an occupied slot.
      const latestTable = await tableService.findOne(tableId)

      if (!latestTable) {
        throw new Error("Could not reload the table.")
      }

      if (latestTable[matchField]) {
        setSessionInfo(latestTable)
        setErrorMessage(
          `Match ${availableIndex + 1} has already been created. The table has been refreshed.`,
        )
        return
      }

      const newMatch = await matchService.create({
        player1: chosenHomePlayer,
        player2: chosenAwayPlayer,
      })

      if (!newMatch?._id) {
        throw new Error(
          newMatch?.error || newMatch?.err || "Match creation failed.",
        )
      }

      const updatedTable = await tableService.update({
        ...latestTable,
        [matchField]: newMatch._id,
      })

      if (!updatedTable || updatedTable.err || updatedTable.error) {
        throw new Error(
          updatedTable?.err ||
            updatedTable?.error ||
            "The table could not be updated.",
        )
      }

      // Reload so match1/match2/match3 are populated match objects.
      await refreshTable()

      setChosenHomePlayer(null)
      setChosenAwayPlayer(null)
    } catch (error) {
      console.error("Error creating match:", error)
      setErrorMessage(error.message || "Could not create the match.")
      await refreshTable()
    } finally {
      setSavingMatch(false)
    }
    confetti.start(2000)
  }

  if (!sessionInfo) {
    return <div>Loading table...</div>
  }
  const handleStatsUpdate = async () => {
    // Prevent another submission from this page.
    if (submittingStats || sessionInfo.approval === true) {
      return
    }

    setSubmittingStats(true)
    setErrorMessage("")

    try {
      // Reload the latest database record before submitting.
      const latestTable = await tableService.findOne(tableId)

      if (!latestTable || latestTable.message) {
        throw new Error("Could not reload the table.")
      }

      // Prevent submitting matches that another admin has approved.
      if (latestTable.approval === true) {
        setSessionInfo(latestTable)
        setErrorMessage("These matches have already been submitted.")
        return
      }

      // Claim approval in the database first to prevent duplicate submissions.
      const approvedTable = await tableService.update({
        ...latestTable,
        approval: true,
      })

      if (!approvedTable || approvedTable.err || approvedTable.error) {
        throw new Error(
          approvedTable?.err ||
            approvedTable?.error ||
            "Could not approve these matches.",
        )
      }

      setSessionInfo((previous) => ({
        ...previous,
        approval: true,
      }))

      // Update player and team statistics.
      await playerStatService.adjustPlayerStats(latestTable)
      await teamStatService.adjustTeamStats(latestTable)

      // Refresh the table from the database.
      await refreshTable()
    } catch (error) {
      console.error("Error submitting matches:", error)

      setErrorMessage(error.message || "Could not submit the matches.")

      await refreshTable()
    } finally {
      setSubmittingStats(false)
    }
  }

  return (
    <>
      <h2 className="center">Table number {sessionInfo.tableNumber}</h2>

      <div className="row center space-around">
        {/* Home team */}
        <div className="bracket center column w500">
          <h3 className="center">{sessionInfo.homeTeam?.teamName}</h3>

          <div className="w325 green-felt margin">
            {getPlayersForTeam(sessionInfo.homeTeam?._id).map((player) => (
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

        {/* Match creation controls */}
        <div className="bracket w100">
          {sessionInfo.approval == true ? (
            <div className="bracket blue-felt">
              <h2>MATCH COMPLETED</h2>
            </div>
          ) : (
            <div>
              {currentProfile === "HOME" || currentProfile === "AWAY"  ? (
                <>
                  {}
                  {!chosenHomePlayer || !chosenAwayPlayer ? (
                    <div className="bracket">
                      Choose one player from each team
                    </div>
                  ) : allMatchesFilled ? (
                    <div className="bracket" style={{ color: "red" }}>
                      All 3 matches are already set
                    </div>
                  ) : (
                    profile.accessLevel > 30 &&
                    <button
                      className="bracket"
                      style={{ color: "green" }}
                      onClick={handleSetPlayers}
                      disabled={savingMatch}
                    >
                      {savingMatch ? "CREATING MATCH..." : "CREATE MATCH"}
                    </button>

                     
                  )}
                </>
              ) : (
                <div className="bracket">
                  Sign in as a Captain of either team to create a match.
                </div>
              )}

              {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

              <ShowRace
                info={sessionInfo}
                player1={chosenHomePlayer}
                player2={chosenAwayPlayer}
              />
            </div>
          )}
        </div>
        {/* Away team */}
        <div className="bracket center column w500">
          <h3 className="center">{sessionInfo.awayTeam?.teamName}</h3>

          <div className="w325 green-felt margin">
            {getPlayersForTeam(sessionInfo.awayTeam?._id).map((player) => (
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

      <MatchLayout
        players={players}
        teams={teams}
        profile={profile}
        homePlayer={chosenHomePlayer}
        awayPlayer={chosenAwayPlayer}
        sessionInfo={sessionInfo}
        currentProfile={currentProfile}
        handleUpdateMatch={refreshTable}
      />
      {Number(profile?.accessLevel) === 90 &&
        sessionInfo.match1Completed === true &&
        sessionInfo.match2Completed === true &&
        sessionInfo.match3Completed === true &&
        sessionInfo.approval !== true && (
          <button onClick={handleStatsUpdate} disabled={submittingStats}>
            {submittingStats ? "SUBMITTING MATCHES..." : "SUBMIT MATCHES"}
          </button>
        )}
      {Number(profile?.accessLevel) != 90 &&
        sessionInfo.match1Completed === true &&
        sessionInfo.match2Completed === true &&
        sessionInfo.match3Completed === true &&
        sessionInfo.approval !== true && (
          <div className="bracket red-felt">
            <h2>Turn table fees to ADMIN for team scores to be updated</h2>
          </div>
        )}

      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    </>
  )
}

export default ViewOneSession
