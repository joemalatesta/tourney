import { useState, useEffect } from "react"

import BracketView from "./BracketView"

import * as gameServices from "../../services/gameService"

import styles from "./Bracket.module.css"

const Bracket = (props) => {
  const [matches, setMatches] = useState()
  const [rerender, setRerender] = useState(false)

  useEffect(() => {
    const getRounds = async () => {
      let data = await gameServices.SplitIntoMatches(props.rounds)
      setMatches(data)
    }
    getRounds()
  }, [
    props.gameObj.rounds,
    props.gameObj.loserRounds,
    props.count,
    props.rounds,
  ])

  useEffect(() => {}, [props.count])

  return (
    <>
      {matches?.map((matchInfo, idx) => (
        <div className={`${styles.bracket} ${styles.greenFelt}`} key={idx}>
          <BracketView
            profile={props.profile}
            isWinnerBracket={props.isWinnerBracket}
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
