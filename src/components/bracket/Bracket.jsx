import SingleMatch from './SingleMatch'
import * as gameServices from '../../services/gameServices'
import { useState, useEffect } from 'react'
const Bracket = (props) => {
  const [matches, setMatches] = useState()
  
  useEffect(() => {
    const getRounds = async()=>{
      let data = await gameServices.SplitIntoMatches(props.rounds)
      setMatches(data)
    }
    getRounds()
  }, [])

  return (
    <>
      {matches?.map((match, idx) => (
        <SingleMatch
          setMatchDetails={props.setMatchDetails}
          gameObj={props.gameObj}
          handleUpdateMatch={props.handleUpdateMatch}
          user={props.user}
          match={match}
          key={idx}
          roundId={props.roundId}
        />
      ))}
    </>
  )
}

export default Bracket