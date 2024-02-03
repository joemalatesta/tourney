import SingleMatch from "./SingleMatch"
import WinnerCheckbox from "../WinnerCheckbox/WinnerCheckbox"
import * as gameServices from "../../services/gameServices"

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
        <div key={idx}>
          <SingleMatch
            setNewGameObj={props.setNewGameObj}
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
          <WinnerCheckbox />
        </div>
      ))}
    </>
  )
}

export default Bracket
