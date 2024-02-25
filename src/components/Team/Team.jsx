const Team = ({teams, handleChooseTeam, title}) => {
  return ( 
    <>
    <h1>{title}</h1>
         {teams.map(team=>
        <div key={team._id}>
          <h2 onClick={()=>handleChooseTeam(team, title)}>{team.teamName}</h2>
        </div>
      )}

    </>
  )
}
 
export default Team
