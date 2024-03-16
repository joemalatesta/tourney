import SingleMatch from "../../components/SingleMatch/SingleMatch"

const MatchView = (props) => {

  return (
    <>
      <SingleMatch 
        setShowButton={props.setShowButton}
         match1={props.match1}
         match2={props.match2}
         match3={props.match3}
         showButton={props.showButton}
        setCompleteMatch={props.setCompleteMatch}
        completeMatch={props.completeMatch}
        number={props.matchNumber}
        matchId={props.matchId} 
        match={props.match} 
        profile={props.profile}
        />
    </>
  )
}

export default MatchView
