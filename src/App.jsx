// npm modules
import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'

// pages
import Signup from './pages/Signup/Signup'
import Login from './pages/Login/Login'
import Landing from './pages/Landing/Landing'
import Profiles from './pages/Profiles/Profiles'
import ChangePassword from './pages/ChangePassword/ChangePassword'
import EditPlayer from './pages/EditPlayers/EditPlayer'
import ViewTournaments from './pages/ViewTournaments/ViewTournaments'
import CreateMatch from './pages/AddPlayerToMatch/CreateMatch'
import Brackets from './pages/Brackets/Brackets'

// components
import NavBar from './components/NavBar/NavBar'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'

// services
import * as authService from './services/authService'
import * as playerService from './services/playerService'
import * as matchService from './services/matchService'
// styles
import './App.css'



function App() {
  const navigate = useNavigate()
  const [playMatch, setPlayMatch] = useState(false)
  const [players, setPlayers] = useState([])
  const [user, setUser] = useState(authService.getUser())
  const [tourneyMatch, setTourneyMatch] = useState()
  const [singleMatch, setSingleMatch] = useState()


  useEffect(() => {
    const fetchPlayers = async () => {
      const data = await playerService.index()
      setPlayers(data)
    }
    fetchPlayers()
  }, []);

  useEffect(() => {
    const getMatch = async () => {
      console.log(singleMatch);
    }
    getMatch()
  }, [singleMatch]);

  useEffect(() => {
    const fetchMatch = async () => {
      const data = await matchService.index()
      setTourneyMatch(data)
    }
    fetchMatch()
  }, []);

  const handleLogout = () => {
    authService.logout()
    setUser(null)
    navigate('/')
  }

  const handleAuthEvt = () => {
    setUser(authService.getUser())
  }
  
  const handleAddPlayer = async (newPlayerData) => {
    const newPlayer = await playerService.create(newPlayerData)
    setPlayers([...players, newPlayer])
  }

  const handleDeletePlayer = async id => {
    const deletedPlayer = await playerService.deleteOne(id)
    setPlayers(players.filter(player => player._id !== deletedPlayer._id))
  }

  const handleAddMatch = async (newMatchData) => {
    const newMatch = await matchService.create(newMatchData)
    setTourneyMatch([...tourneyMatch, newMatch])
  }

  const handleDeleteMatch = async id => {
    const deletedMatch = await matchService.deleteOne(id)
    setTourneyMatch(tourneyMatch.filter(match=> match._id !== deletedMatch._id))
  }
  
  const isDisabled = () => {
    setPlayMatch(!playMatch)
  }

  const handleUpdateMatch = async (matchData) => {
    console.log();
    const updatedMatch = await matchService.update(matchData)
    setTourneyMatch([...tourneyMatch, updatedMatch])
  }
  

  return (
    <>
      <NavBar playMatch={playMatch} user={user} handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Landing user={user} players={players}/>} />
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
          path="/add-player"
          element={    
          <ProtectedRoute user={user}>
              <EditPlayer 
                players={players}
                playMatch={playMatch} 
                isDisabled={isDisabled} 
                handleAddPlayer={handleAddPlayer} 
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
  
      </Routes>
    </>
  )
}

export default App
