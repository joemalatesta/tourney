import { useState, useEffect } from 'react'
import * as teamService from '../../services/teamService'
import Team from '../../components/Team/Team'
import TeamPlayers from '../../components/TeamPlayers/TeamPlayers'

const SeasonMatch = () => {
  const [teams, setTeams] = useState([])
  const [team1, setTeam1] = useState(null)
  const [team2, setTeam2] = useState(null)


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
      setTeams(teams.filter((el) => el._id !== team._id))
    }
    if(title === 'Team 2')
    setTeam2(team)
    setTeams(teams.filter((el) => el._id !== team._id))  
    console.log(team);
  }

  return (
    <>
    <h1 style={{color:'red'}}>{team1==null ? "Add a Team" : team1.teamName} vs. {team2==null ? "Add a Team" : team2.teamName}</h1>
    <div className='flex space-between'>

      <div className='flex-direction'>
        <Team
          title='Team 1'
          teams={teams}
          handleChooseTeam={handleChooseTeam}
          />
        <TeamPlayers
          team={team1}
        />
      
      </div>
      <div className='flex-direction'>
        <Team
          title='Team 2'
          teams={teams}
          handleChooseTeam={handleChooseTeam}
          />
          <TeamPlayers
            team={team2}
          />
      </div>
          </div>
    </>
  )
}
 
export default SeasonMatch