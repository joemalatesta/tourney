import SingleMatch from './SingleMatch';
import * as gameServices from '../../services/gameServices'
const Bracket = (props) => {
  console.log(props.gameObj);
  let round = gameServices.SplitIntoMatches(props.gameObj.matchPlayers)
  console.log(round);
  return (
    <>
      {round?.map((match, idx) => (
        <SingleMatch
          match={match}
          key={idx}
        />
      ))}
    </>
  )
}

export default Bracket