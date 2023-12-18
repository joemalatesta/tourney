import { useState, useEffect, useRef } from "react"
import ListOfPlayers from "./ListOfPlayers"
import * as playerService from '../../services/playerService'
import * as gameService from '../../services/gameServices'
import { useNavigate } from "react-router-dom"

const CreateMatch = (props) => {
  const navigate = useNavigate()
  const formElement = useRef()
  const [match, setMatch] = useState([])
  const [formData, setFormData] = useState({
    name: '',
    gameType: '',
    matchPlayers: [],
    rounds:[],
  })
  const [players, setPlayers] = useState(props.players)
  
  useEffect(() => {
    const fetchPlayers = async () => {
      const data = await playerService.index()
      setPlayers(data)
    }
    fetchPlayers()
  }, []);

  
  const handleAddItem = (item) => {
    setMatch([item, ...match])
    setPlayers(players.filter(el => el._id !== item._id))
  }
  
  const handleRemoveItem = (item) => {
    setMatch(match.filter(el => el._id !== item._id))
    setPlayers([...players, item])
  }

  const handleChange = evt => {
		setFormData({ ...formData, [evt.target.name]: evt.target.value })
  }

  const handleSubmit = async evt => {
    evt.preventDefault()
    setMatch(gameService.shufflePlayers(match))
    const updatedFormData = { ...formData, matchPlayers: match };
    await props.handleAddMatch(updatedFormData)
    console.log('this is the formdata at submit', updatedFormData);
    navigate('/view-tournaments')
  }

  // const handleGetMatch = async (game) => {

  //   let playerObj = await Promise.all(game.matchPlayers.map(player =>
  //     playerService.findOne(player)
  //     ));
  //     await setSingleMatch(gameService.addByePlayers(playerObj))
  //     console.log(game);
  //     navigate('/bracket-layout')
  // }

  return (
    <main className="center bracket">
      <form autoComplete="off" ref={formElement} onSubmit={handleSubmit}>
        <label className="center">
						Match Name (unique required)
        </label>
        <input  
          className="center"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <label className="center">
          Game Type (8-ball or 9-ball)
        </label>
        <input  
          className="center"
          type="text"
          name="gameType"
          value={formData.gameType}
          onChange={handleChange}
          required
        />
        <button type="submit">Create Match</button>
      </form>
      
      <section className="bracket flex">
        <ListOfPlayers 
          title='Available Players'
          players={players} 
          handleAddItem={handleAddItem}  
        />
        <ListOfPlayers
          title='Players assigned to Match' 
          players={match}
          handleRemoveItem={handleRemoveItem}
        />
      </section>
    </main>
  )
}

export default CreateMatch