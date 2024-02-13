import * as gameServices from "../../services/gameService"
import BracketView from "./BracketView"
import { useState, useEffect } from "react"

const Bracket = (props) => {
  const [matches, setMatches] = useState()

  useEffect(() => {
    const getRounds = async () => {
      let data = await gameServices.SplitIntoMatches(props.rounds)
      setMatches(data)
    }
    getRounds()
  }, [])

  return (
    <>
      {matches?.map((matchInfo, idx) => (
        <div
          className="bracket green-felt"
          style={{ width: "350px" }}
          key={idx}
        >
          <BracketView
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
          />
        </div>
      ))}
    </>
  )
}

export default Bracket
