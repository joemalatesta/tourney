// npm modules
import { useState, useEffect } from "react"
import { Routes, Route, useNavigate } from "react-router-dom"

// pages
import Signup from "./pages/Signup/Signup"
import Login from "./pages/Login/Login"
import Landing from "./pages/Landing/Landing"
import Profiles from "./pages/Profiles/Profiles"
import ChangePassword from "./pages/ChangePassword/ChangePassword"
import EditPlayer from "./pages/EditPlayers/EditPlayer"
import ViewTournaments from "./pages/ViewTournaments/ViewTournaments"
import CreateMatch from "./pages/CreateMatch/CreateMatch"
import Brackets from "./pages/Brackets/Brackets"
import MatchView from "./pages/MatchView/MatchView"
import CreateTeam from "./pages/CreateTeam/CreateTeam"
import ViewTeams from "./pages/ViewTeams/ViewTeams"
import ViewTeam from "./pages/ViewTeam/ViewTeam"
import SeasonMatch from "./pages/SeasonMatch/SeasonMatch"

// components
import NavBar from "./components/NavBar/NavBar"
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute"

// services
import * as authService from "./services/authService"
import * as playerService from "./services/playerService"
import * as matchService from "./services/matchService"
import * as teamService from "./services/teamService"

// styles
import "./App.css"
import AdminNavBar from "./components/NavBar/AdminNavBar"

function App() {
  const navigate = useNavigate()
  const [playMatch, setPlayMatch] = useState(false)
  const [players, setPlayers] = useState([])
  const [user, setUser] = useState(authService.getUser())
  const [tourneyMatch, setTourneyMatch] = useState()
  const [singleMatch, setSingleMatch] = useState()
  const [twoPlayerMatch, setTwoPlayerMatch] = useState()
  const [team, setTeam] = useState({})

  useEffect(() => {
    const fetchPlayers = async () => {
      const data = await playerService.index()
      setPlayers(data)
    }
    fetchPlayers()
  }, [])

  useEffect(() => {
    const getTwoPlayerMatchData = async () => {
      const data = await twoPlayerMatch
      setTwoPlayerMatch(data)
    }
    getTwoPlayerMatchData()
  }, [twoPlayerMatch])

  useEffect(() => {
    const getMatch = async () => {
      // console.log(singleMatch);
    }
    getMatch()
  }, [singleMatch])

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

  return (
    <>
      {user?.name === "Admin" ? (
        <AdminNavBar user={user} handleLogout={handleLogout} />
      ) : (
        <NavBar user={user} handleLogout={handleLogout} />
      )}
      <Routes>
        <Route path="/" element={<Landing user={user} players={players} />} />
        <Route
          path="/profiles"
          element={
            <ProtectedRoute user={user}>
              <Profiles />
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
            <ProtectedRoute user={user}>
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
            <ProtectedRoute user={user}>
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
            <ProtectedRoute user={user}>
              <ChangePassword handleAuthEvt={handleAuthEvt} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/brackets"
          element={
            <Brackets
              gameObj={singleMatch}
              user={user}
              handleUpdateMatch={handleUpdateMatch}
              setTwoPlayerMatch={setTwoPlayerMatch}
            />
          }
        />
        <Route
          path="/match-view"
          element={
            <MatchView
              match={twoPlayerMatch}
              user={user}
              handleUpdateMatch={handleUpdateMatch}
            />
          }
        />
        <Route
          path="/view-tournaments"
          element={
            <ViewTournaments
              tourneyMatch={tourneyMatch}
              setTourneyMatch={setTourneyMatch}
              user={user}
              handleDeleteMatch={handleDeleteMatch}
              setSingleMatch={setSingleMatch}
            />
          }
        />
        <Route
          disable={isDisabled}
          path="/create-team"
          element={
            <ProtectedRoute user={user}>
              <CreateTeam players={players} handleAddTeam={handleAddTeam} />
            </ProtectedRoute>
          }
        />
        <Route
          disable={isDisabled}
          path="/view-teams"
          element={<ViewTeams setTeam={setTeam} />}
        />
        <Route
          disable={isDisabled}
          path="/view-team"
          element={
            <ProtectedRoute user={user}>
              <ViewTeam team={team} />
            </ProtectedRoute>
          }
        />
        <Route
          disable={isDisabled}
          path="/season-match"
          element={<SeasonMatch setTwoPlayerMatch={setTwoPlayerMatch} />}
        />
      </Routes>
    </>
  )
}

export default App
