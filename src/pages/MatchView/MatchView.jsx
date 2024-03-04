
import SingleMatch from "../../components/SingleMatch/SingleMatch"

const MatchView = (props) => {

  console.log(props.match);
  return (
    <>
      <SingleMatch
        match={props.match} 
      />
    </>
  )
}

export default MatchView
