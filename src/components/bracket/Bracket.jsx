import * as gameServices from "../../services/gameService"
import BracketView from "./BracketView"
import { useState, useEffect } from "react"

const Bracket = (props) => {
  const [matches, setMatches] = useState()
  const [rerender, setRerender] = useState(false);

  useEffect(() => {
    const getRounds = async () => {
      let data = await gameServices.SplitIntoMatches(props.rounds)
      setMatches(data)
    }
    getRounds()
  }, [props.gameObj.rounds, props.count])

  useEffect(() => {
    console.log('*',props.count)
  }, [props.count]);

  return (
    <>
      {matches?.map((matchInfo, idx) => (
        <div
          className="bracket green-felt"
          style={{ width: "350px" }}
          key={idx}
        >
          <BracketView
            count={props.count}
            setCount={props.setCount}
            setTwoPlayerMatch={props.setTwoPlayerMatch}
            roundIndex={props.rounds}
            setMatchDetails={props.setMatchDetails}
            gameObj={props.gameObj}
            handleUpdateMatch={props.handleUpdateMatch}
            user={props.user}
            match={matchInfo}
            key={idx}
            id={idx}
            roundId={props.roundId}
            rerender={rerender}
            setRerender={setRerender}
          />
        </div>
      ))}
    </>
  )
}

export default Bracket
