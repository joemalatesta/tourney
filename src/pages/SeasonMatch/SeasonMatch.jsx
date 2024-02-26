import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import * as teamService from '../../services/teamService'
import Team from '../../components/Team/Team'
import TeamPlayers from '../../components/TeamPlayers/TeamPlayers'

const SeasonMatch = (props) => {
  const navigate = useNavigate()
  const [teams, setTeams] = useState([])
  const [team1, setTeam1] = useState(null)
  const [team2, setTeam2] = useState(null)
  const [player1, setPlayer1] = useState(null)
  const [player2, setPlayer2] = useState(null)
  const [match, setMatch] = useState([])
  const [isSubmitted, setIsSubmitted] = useState(false)


  useEffect(() => {
    const getTeamData = async () => {
      const data = await teamService.index()
      setTeams(data)
    }
    getTeamData()
  }, []);

  useEffect(() => {
    console.log('refreshed');
  },[match])

  useEffect(() => {
    console.log('refreshed', match);
  }, [match]);

  const handleChooseTeam = (team, title) => {
    if (title === 'Team 1') {
      setTeam1(team);
      setPlayer1(null);
      setTeams(teams.filter((el) => el._id !== team._id));
    }
    if (title === 'Team 2') {
      setTeam2(team);
      setPlayer2(null);
      setTeams(teams.filter((el) => el._id !== team._id));
      console.log(team);
    }
  };

  const handleChoosePlayer = (player, title) => {
    if(title === 'Team 1'){
      setPlayer1(player)
      console.log(player);
    }
    if(title === 'Team 2'){
      setPlayer2(player)
      console.log(player);
    }
  }
  
  const handleViewSingleMatch = () => {
    props.setTwoPlayerMatch(match)
    navigate("/match-view")
  }
  
  console.log(player1, player2);
  console.log(match);

  const handleSetPlayers = () => {
    if (player1 !== null && player2 !== null) {
      setMatch([player1, player2]);
      setIsSubmitted(true)
    }
  };

  return (
    <>
    <h1>Match </h1>
    <div className='flex space-between'>

      <div className='flex-direction'>
        <Team
          title='Team 1'
          teams={teams}
          handleChooseTeam={handleChooseTeam}
          />
        <TeamPlayers
        title='Team 1'
          team={team1}
          handleChoosePlayer={handleChoosePlayer}
        />
      
      </div>

      <div>
    <h1 style={{color:'red'}}>{team1==null ? "Add a Team" : team1.teamName} vs. {team2==null ? "Add a Team" : team2.teamName}</h1>
         {player1 !== null ? player1.name : 'Awaiting Player'} vs: {player2 !== null ? player2.name : 'Awaiting Player'}
         <br/>
         <button onClick={()=>handleSetPlayers()}>Set Players</button>
         <button disabled={!isSubmitted} onClick={()=>handleViewSingleMatch()}>View Match</button>
      </div>
      <div className='flex-direction'>
        <Team
          title='Team 2'
          teams={teams}
          handleChooseTeam={handleChooseTeam}
          />
          <TeamPlayers
          title='Team 2'
            team={team2}
            handleChoosePlayer={handleChoosePlayer}
          />
      </div>
          </div>
    </>
  )
}
 
export default SeasonMatch