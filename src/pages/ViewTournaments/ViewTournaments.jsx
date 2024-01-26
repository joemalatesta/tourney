import { useNavigate } from "react-router-dom"
import * as matchService from '../../services/matchService'
import { useEffect, useState } from "react";

const ViewTournaments = ({user, setTourneyMatch, tourneyMatch, setSingleMatch}) => {
  const navigate = useNavigate()
  const [tourney, setTourney] = useState()
  
  const handleGetMatch = async (game) => {
    await setSingleMatch(game)
    navigate('/brackets')
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