import { useNavigate } from "react-router-dom"
// import * as playerService from '../../services/playerService'
import * as matchService from '../../services/matchService'
// import * as gameService from '../../services/gameServices'
import { useEffect, useState } from "react";

const ViewTournaments = ({user, setTourneyMatch, tourneyMatch, setSingleMatch}) => {
  const navigate = useNavigate()
  const [tourney, setTourney] = useState()
  
  const handleGetMatch = async (game) => {
    await setSingleMatch(game)
    // let playerObj = await Promise.all(game.matchPlayers.map(player =>
    //   playerService.findOne(player)
    //   ));
    //   await setSingleMatch(gameService.addByePlayers(playerObj))
    //   console.log(game, playerObj);

      navigate('/bracket-layout')
  }
 
  useEffect(() => {
    const fetchMatches = async () => {
      const data = await matchService.index()
      setTourney(data)
    }
    fetchMatches()
  }, [tourneyMatch]);

  const handleDeleteMatch = async id => {
    const deletedMatch = await matchService.deleteOne(id)
    setTourneyMatch(tourneyMatch.filter(match=> match._id !== deletedMatch._id))
  }

  
  return (
    <div className="bracket width  center">
      <div className="match-bracket width green-felt">
        {tourney?.map(game => (
          <div key={game._id}>
            <button onClick={()=>handleGetMatch(game)}>{ game.name } : {game.gameType}</button>
            {user?.name==="Admin" &&
              <button onClick={()=>handleDeleteMatch(game._id)}>delete match</button>
            }
          </div>
          )
        )}  
      </div>
    </div>
  )
}
 
export default ViewTournaments