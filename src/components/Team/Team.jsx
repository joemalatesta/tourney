const Team = ({teams, handleChooseTeam, title, team}) => {
  return ( 
    <>
<h1>{title}</h1>
      {team === null ?
        teams.map(team=>
        <div key={team._id}>
        <h2 onClick={()=>handleChooseTeam(team, title)}>{team.teamName}</h2>
        </div>
        )
:
          <h1>{team.teamName}</h1>
    }


    </>
  )
}
 
export default Team