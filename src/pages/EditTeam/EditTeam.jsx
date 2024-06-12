const EditTeam = (props) => {
  // for future plans
  console.log(props)
  return (
    <>
      <h1>this is the teams edit page</h1>
      <h2>{props?.teams?.map(el =>
        <li key={el._id}>
          {el.teamName} Wins:{el.wins} losses: {el.loss}
        </li>
      )}</h2>
    </>
  )
}

export default EditTeam
