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
import * as teamService from "./services/teamService"
import * as profileService from './services/profileService'

import "./App.css"

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

  useEffect(() => {
    const fetchProfile = async () => {
      const data = await profileService.findOne(user?.profile)
      setProfile(data)
    }
    fetchProfile()
  }, [user]);

  useEffect(() => {
    const fetchProfiles = async () => {
      const data = await profileService.getAllProfiles()
      setProfiles(data)
    }
    fetchProfiles()
  }, [user])

  useEffect(() => {
    const fetchPlayers = async () => {
      const data = await playerService.index()
      setPlayers(data)
    }
    fetchPlayers()
  }, [])

  useEffect(() => {
    const fetchTeams = async () => {
      const data = await teamService.index()
      setTeams(data)
    }
    fetchTeams()
  }, [])

  useEffect(() => { }, [profiles]);

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

  const handleEditTeam = async (editedTeamData) => {
    const editedTeam = await teamService.update(editedTeamData)
    setPlayers((prevPlayers) => {
      return prevPlayers.map((player) =>
        player._id === editedTeam._id ? editedTeam : player
      )
    })
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
    setProfiles(profiles.filter((profile) => profile._id !== updatedProfile._id))
  }

  return (
    <>
      <NavBar user={user} profile={profile} handleLogout={handleLogout} />
      <br />
      <Routes>
        <Route path="/" element={<Landing profile={profile} user={user} players={players} />} />
        <Route
          path="/profiles"
          element={
            <ProtectedRoute user={user}>
              <Profiles />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute profile={profile} user={user}>
              <AdminPage profiles={profiles} user={user} handleUpdateProfiles={handleUpdateProfiles}/>
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
            <ProtectedRoute profile={profile} user={user}>
              <EditPlayer
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
            <ProtectedRoute profile={profile} user={user}>
              <CreateMatch
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
            <ProtectedRoute profile={profile} user={user}>
              <ChangePassword handleAuthEvt={handleAuthEvt} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/brackets"
          element={
            <ProtectedRoute profile={profile} user={user}>
              <Brackets
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
            <ProtectedRoute profile={profile} user={user}>
              <MatchView
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
            <ProtectedRoute profile={profile} user={user}>
              <ViewTournaments
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
            <ProtectedRoute profile={profile} user={user}>
              <CreateTeam
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
            <ProtectedRoute profile={profile} user={user}>
              <ViewTeams
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
            <ProtectedRoute profile={profile} user={user}>
              <ViewTeam
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
            <ProtectedRoute profile={profile} user={user}>
              <SeasonMatch setTwoPlayerMatch={setTwoPlayerMatch} />
            </ProtectedRoute>
          }
        />
        <Route
          disable={isDisabled}
          path="/view-schedule"
          element={
            <ProtectedRoute profile={profile} user={user}>
              <Schedule
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
            <ProtectedRoute profile={profile} user={user}>
              <CreateSchedule
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
            <ProtectedRoute profile={profile} user={user}>
              <Match
                teams={teams}
                viewMatch={viewMatch}
                setTwoPlayerMatch={setTwoPlayerMatch}
              />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  )
}

export default App
