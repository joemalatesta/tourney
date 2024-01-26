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
          user={props.user}
          match={match}
          key={idx}
        />
      ))}
    </>
  )
}

export default Bracket