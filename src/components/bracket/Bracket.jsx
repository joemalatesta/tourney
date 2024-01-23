import SingleMatch from './SingleMatch';
import * as gameServices from '../../services/gameServices'
const Bracket = (props) => {
  let round = gameServices.SplitIntoMatches(props.gameObj.matchPlayers)

  return (
    <>
      {round?.map((match, idx) => (
        <SingleMatch
          user={props.user}
          match={match}
          key={idx}
        />
      ))}
    </>
  )
}

export default Bracket