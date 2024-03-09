import SingleMatch from "../../components/SingleMatch/SingleMatch"

const MatchView = (props) => {

  return (
    <>
      <SingleMatch 
        matchId={props.matchId} 
        match={props.match} 
        profile={props.profile}
        />
    </>
  )
}

export default MatchView
