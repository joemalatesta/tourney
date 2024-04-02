import { useState, useEffect } from "react"
import { Routes, Route, useNavigate } from "react-router-dom"

import AdminPage from "./pages/AdminPage/AdminPage"
import Brackets from "./pages/Brackets/Brackets"
import ChangePassword from "./pages/ChangePassword/ChangePassword"
import CreateMatch from "./pages/CreateMatch/CreateMatch"
import CreateSchedule from "./pages/CreateSchedule/CreateSchedule"
import CreateTeam from "./pages/CreateTeam/CreateTeam"
import EditPlayer from "./pages/EditPlayers/EditPlayer"
import Landing from "./pages/Landing/Landing"
import Login from "./pages/Login/Login"
import Match from "./pages/Match/Match"
import MatchApproval from "./pages/MatchApproval/MatchApproval"
import MatchView from "./pages/MatchView/MatchView"
import Profiles from "./pages/Profiles/Profiles"
import Schedule from "./pages/Schedule/Schedule"
import SeasonMatch from "./pages/SeasonMatch/SeasonMatch"
import Signup from "./pages/Signup/Signup"
import ViewTeam from "./pages/ViewTeam/ViewTeam"
import ViewTeams from "./pages/ViewTeams/ViewTeams"
import ViewTournaments from "./pages/ViewTournaments/ViewTournaments"

import NavBar from "./components/NavBar/NavBar"
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute"

import * as authService from "./services/authService"
import * as matchService from "./services/matchService"
import * as playerService from "./services/playerService"
import * as profileService from "./services/profileService"
import * as scheduleService from "./services/scheduleService"
import * as teamService from "./services/teamService"

import "./App.css"
import TriMatchView from "./pages/TriMatchView/TriMatchView"
import AdminFullStatPage from "./pages/AdminFullStatPage/AdminFullStatPage"

function App() {
  const navigate = useNavigate()
  const [playMatch, setPlayMatch] = useState(false)
  const [players, setPlayers] = useState([])
  const [user, setUser] = useState(authService.getUser())
  const [tourneyMatch, setTourneyMatch] = useState()
  const [singleMatch, setSingleMatch] = useState()
  const [twoPlayerMatch, setTwoPlayerMatch] = useState()
  const [teams, setTeams] = useState()
  const [team, setTeam] = useState({})
  const [viewMatch, setViewMatch] = useState()
  const [profile, setProfile] = useState(null)
  const [profiles, setProfiles] = useState(null)
  const [matchId, setMatchId] = useState(null)
  const [matchInProgress, setMatchInProgress] = useState([])
  const [triMatch, setTriMatch] = useState()

  useEffect(() => {
    const fetchProfile = async () => {
      const data = await profileService.findOne(user?.profile)
      setProfile(data)
    }
    fetchProfile()
  }, [user])

  useEffect(() => {
    if (user) {
      const fetchProfiles = async () => {
        const data = await profileService.getAllProfiles()
        setProfiles(data)
      }
      fetchProfiles()
    }
  }, [user])

  useEffect(() => {
    const fetchPlayers = async () => {
      const data = await playerService.index()
      setPlayers(data)
    }
    fetchPlayers()
  }, [user])

  useEffect(() => {
    const fetchTeams = async () => {
      const data = await teamService.index()
      setTeams(data)
    }
    fetchTeams()
  }, [team])

  useEffect(() => {}, [profiles])

  useEffect(() => {
    const getTwoPlayerMatchData = async () => {
      const data = await twoPlayerMatch
      setTwoPlayerMatch(data)
    }
    getTwoPlayerMatchData()
  }, [twoPlayerMatch])

  useEffect(() => {}, [singleMatch])

  useEffect(() => {
    const fetchMatch = async () => {
      const data = await matchService.index()
      setTourneyMatch(data)
    }
    fetchMatch()
  }, [])

  const handleLogout = () => {
    authService.logout()
    setUser(null)
    navigate("/")
  }

  const handleAuthEvt = () => {
    setUser(authService.getUser())
  }

  const handleAddPlayer = async (newPlayerData) => {
    const newPlayer = await playerService.create(newPlayerData)
    setPlayers([...players, newPlayer])
  }

  const handleEditPlayer = async (editedPlayerData) => {
    const editedPlayer = await playerService.update(editedPlayerData)
    setPlayers((prevPlayers) => {
      return prevPlayers.map((player) =>
        player._id === editedPlayer._id ? editedPlayer : player
      )
    })
  }

  const fetchPlayers = async () => {
    const data = await playerService.index()
    setPlayers(data)
  }

  const fetchTeams = async () => {
    const data = await teamService.index()
    setTeams(data)
  }

  const handleEditTeam = async (editedTeamData) => {
    try {
      const updatedTeam = await teamService.update(editedTeamData)
      setTeams((prevTeams) => {
        return prevTeams.map((team) =>
          team._id === updatedTeam._id
            ? { ...team, wins: updatedTeam.wins, losses: updatedTeam.losses }
            : team
        )
      })
      console.log("Team updated successfully:", updatedTeam)
    } catch (error) {
      console.error("Error updating team:", error)
    }

    await fetchTeams()
    await fetchPlayers()
  }

  const handleDeletePlayer = async (id) => {
    const deletedPlayer = await playerService.deleteOne(id)
    setPlayers(players.filter((player) => player._id !== deletedPlayer._id))
  }

  const handleAddMatch = async (newMatchData) => {
    const newMatch = await matchService.create(newMatchData)
    setTourneyMatch([...tourneyMatch, newMatch])
  }

  const handleAddTeam = async (newTeamData) => {
    const newTeam = await teamService.create(newTeamData)
    newTeam
  }

  const handleDeleteTeam = async (id) => {
    const deletedTeam = await teamService.deleteOne(id)
    setTeams(teams.filter((team) => team._id !== deletedTeam._id))
    navigate("view-teams")
    console.log(deletedTeam)
  }

  const handleDeleteSchedule = async (id) => {
    const deletedDate = await scheduleService.deleteOne(id)
    setTeams(teams.filter((team) => team._id !== deletedDate._id))
    navigate("view-schedule")
    console.log(deletedDate)
  }

  const handleDeleteMatch = async (id) => {
    const deletedMatch = await matchService.deleteOne(id)
    setTourneyMatch(
      tourneyMatch.filter((match) => match._id !== deletedMatch._id)
    )
  }

  const isDisabled = () => {
    setPlayMatch(!playMatch)
  }

  const handleUpdateMatch = async (matchData) => {
    const updatedMatch = await matchService.update(matchData)
    setTourneyMatch([...tourneyMatch, updatedMatch])
  }

  const handleUpdateProfiles = async (profileData) => {
    const updatedProfile = await profileService.update(profileData)
    setProfiles(
      profiles.filter((profile) => profile._id !== updatedProfile._id)
    )
  }

  return (
    <>
      <NavBar user={user} profile={profile} handleLogout={handleLogout} />
      <br />
      <Routes>
        <Route
          path="/"
          element={<Landing profile={profile} user={user} players={players} />}
        />
        <Route
          path="/profiles"
          element={
            <ProtectedRoute profile={profile} user={user}>
              <Profiles />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute access="90" profile={profile} user={user}>
              <AdminPage
                teams={teams}
                handleEditTeam={handleEditTeam}
                players={players}
                profile={profile}
                profiles={profiles}
                user={user}
                handleUpdateProfiles={handleUpdateProfiles}
                handleDeleteSchedule={handleDeleteSchedule}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/auth/signup"
          element={<Signup handleAuthEvt={handleAuthEvt} />}
        />
        <Route
          path="/auth/login"
          element={<Login handleAuthEvt={handleAuthEvt} />}
        />
        <Route
          disable={isDisabled}
          path="/player-management"
          element={
            <ProtectedRoute access="70" profile={profile} user={user}>
              <EditPlayer
                profile={profile}
                players={players}
                playMatch={playMatch}
                isDisabled={isDisabled}
                handleAddPlayer={handleAddPlayer}
                handleEditPlayer={handleEditPlayer}
                handleDeletePlayer={handleDeletePlayer}
              />
            </ProtectedRoute>
          }
        />
        <Route
          disable={isDisabled}
          path="/add-players-to-match"
          element={
            <ProtectedRoute access="90" profile={profile} user={user}>
              <CreateMatch
                profile={profile}
                playMatch={playMatch}
                isDisabled={isDisabled}
                handleAddMatch={handleAddMatch}
                players={players}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/auth/change-password"
          element={
            <ProtectedRoute user={user}>
              <ChangePassword handleAuthEvt={handleAuthEvt} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/brackets"
          element={
            <ProtectedRoute access="30" profile={profile} user={user}>
              <Brackets
                profile={profile}
                gameObj={singleMatch}
                user={user}
                handleUpdateMatch={handleUpdateMatch}
                setTwoPlayerMatch={setTwoPlayerMatch}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/match-view"
          element={
            <ProtectedRoute access="30" profile={profile} user={user}>
              <MatchView
                matchId={matchId}
                setMatchDate={setMatchId}
                profile={profile}
                match={twoPlayerMatch}
                user={user}
                handleUpdateMatch={handleUpdateMatch}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/view-tournaments"
          element={
            <ProtectedRoute access="30" profile={profile} user={user}>
              <ViewTournaments
                profile={profile}
                tourneyMatch={tourneyMatch}
                setTourneyMatch={setTourneyMatch}
                user={user}
                handleDeleteMatch={handleDeleteMatch}
                setSingleMatch={setSingleMatch}
              />
            </ProtectedRoute>
          }
        />
        <Route
          disable={isDisabled}
          path="/create-team"
          element={
            <ProtectedRoute access="90" profile={profile} user={user}>
              <CreateTeam
                profile={profile}
                players={players}
                handleEditTeam={handleEditTeam}
                handleAddTeam={handleAddTeam}
              />
            </ProtectedRoute>
          }
        />
        <Route
          disable={isDisabled}
          path="/view-teams"
          element={
            <ProtectedRoute access="30" profile={profile} user={user}>
              <ViewTeams
                profile={profile}
                user={user}
                teams={teams}
                setTeams={setTeams}
                setTeam={setTeam}
              />
            </ProtectedRoute>
          }
        />
        <Route
          disable={isDisabled}
          path="/view-team"
          element={
            <ProtectedRoute access="30" profile={profile} user={user}>
              <ViewTeam
                profile={profile}
                team={team}
                user={user}
                handleDeleteTeam={handleDeleteTeam}
                teams={teams}
                setTeams={setTeams}
                setTeam={setTeam}
              />
            </ProtectedRoute>
          }
        />
        <Route
          disable={isDisabled}
          path="/season-match"
          element={
            <ProtectedRoute access="40" profile={profile} user={user}>
              <SeasonMatch
                profile={profile}
                setTwoPlayerMatch={setTwoPlayerMatch}
              />
            </ProtectedRoute>
          }
        />
        <Route
          disable={isDisabled}
          path="/view-schedule"
          element={
            <ProtectedRoute access="30" profile={profile} user={user}>
              <Schedule
                setMatchId={setMatchId}
                profile={profile}
                viewMatch={viewMatch}
                setViewMatch={setViewMatch}
                user={user}
              />
            </ProtectedRoute>
          }
        />
        <Route
          disable={isDisabled}
          path="/create-schedule"
          element={
            <ProtectedRoute access="90" profile={profile} user={user}>
              <CreateSchedule
                profile={profile}
                teams={teams}
                players={players}
                handleEditTeam={handleEditTeam}
                handleAddTeam={handleAddTeam}
              />
            </ProtectedRoute>
          }
        />
        <Route
          disable={isDisabled}
          path="/match"
          element={
            <ProtectedRoute access="30" profile={profile} user={user}>
              <Match
                setTriMatch={setTriMatch}
                matchInProgress={matchInProgress}
                setMatchInProgress={setMatchInProgress}
                matchId={matchId}
                profile={profile}
                teams={teams}
                viewMatch={viewMatch}
                setTwoPlayerMatch={setTwoPlayerMatch}
              />
            </ProtectedRoute>
          }
        />
        <Route
          disable={isDisabled}
          path="/match-approval"
          element={
            <ProtectedRoute access="70" profile={profile} user={user}>
              <MatchApproval
                handleEditTeam={handleEditTeam}
                profile={profile}
                teams={teams}
              />
            </ProtectedRoute>
          }
        />
        <Route
          disable={isDisabled}
          path="/tri-match-view"
          element={
            <ProtectedRoute access="30" profile={profile} user={user}>
              <TriMatchView
                profile={profile}
                matchId={matchId}
                triMatch={triMatch}
              />
            </ProtectedRoute>
          }
        />
        <Route
          disable={isDisabled}
          path="/admin-stats-page"
          element={
            <ProtectedRoute access="80" profile={profile} user={user}>
              <AdminFullStatPage
                profile={profile}
                players={players}
                teams={teams}
              />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  )
}

export default App
