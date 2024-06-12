const EditTeam = (props) => {
  // for future plans
  console.log(props)
  return (
    <>
      <h1>this is the teams edit page</h1>
      <h2>{props?.teams?.map(el =>
        <div key={el._id} className="bracket" style={{width: 350}}>
          {el.teamName}<br/> Wins:{el.wins}<br/>  Losses: {el.loss}<br/> Win %: {isNaN(((el.wins / (el.wins + el.loss)) * 100).toFixed(2)) ? "0.00" : ((el.wins / (el.wins + el.loss)) * 100).toFixed(2)} 
        </div>
      )}</h2>
    </>
  )
}

export default EditTeam
