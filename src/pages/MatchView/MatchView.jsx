import SingleMatch from "../../components/SingleMatch/SingleMatch"

const MatchView = (props) => {

  const handleWinner = (winner) => {
    console.log(winner);
  }


  return (
    <>
      <SingleMatch  
        handleWinner={handleWinner}
        match={props.match} 
        profile={props.profile}
        />
    </>
  )
}

export default MatchView
