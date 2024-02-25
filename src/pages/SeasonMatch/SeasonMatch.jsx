import { useState, useEffect } from 'react'
import * as teamService from '../../services/teamService'
import Team from '../../components/Team/Team'
import TeamPlayers from '../../components/TeamPlayers/TeamPlayers'

const SeasonMatch = () => {
  const [teams, setTeams] = useState([])
  const [team1, setTeam1] = useState(null)
  const [team2, setTeam2] = useState(null)
  const [player1, setPlayer1] = useState(null)
  const [player2, setPlayer2] = useState(null)

  useEffect(() => {
    const getTeamData = async () => {
      const data = await teamService.index()
      setTeams(data)
    }
    getTeamData()
  }, []);

  const handleChooseTeam = (team,title) => {
    if(title === 'Team 1'){
      setTeam1(team)
      setPlayer1(null)
      setTeams(teams.filter((el) => el._id !== team._id))
    }
    if(title === 'Team 2')
    setTeam2(team)
    setPlayer2(null)
    setTeams(teams.filter((el) => el._id !== team._id))  
    console.log(team);
  }

  const handleChoosePlayer = (player, title) => {
    if(title === 'Team 1'){
      setPlayer1(player)
      console.log(player);
    }
    if(title === 'Team 2'){
      setPlayer2(player)
    }
  }

  return (
    <>
    <h1>Match {player1==null ? "Team 1 Add a Player" : `${player1.name} (${player1.rank})` } vs. {player2==null ? "Team 2 Add a Player" : `${player2.name} (${player2.rank})  ${player2._id === team1.TeamCaptain?'(Captain)':''}`}</h1>
    <h1 style={{color:'red'}}>{team1==null ? "Add a Team" : team1.teamName} vs. {team2==null ? "Add a Team" : team2.teamName}</h1>
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