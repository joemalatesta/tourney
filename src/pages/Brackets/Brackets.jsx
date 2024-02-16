import BracketLayout from "../../components/bracket/BracketLayout"
import { useState, useEffect } from "react"

const Brackets = ({ gameObj, user, handleUpdateMatch, setTwoPlayerMatch }) => {
  const [matchDetails, setMatchDetails] = useState(gameObj)

  useEffect(() => {
    const getCurrentMatchDetails = () => {
      let data = gameObj
      setMatchDetails(data)
    }
    getCurrentMatchDetails()
  }, [gameObj, matchDetails])

  return (
    <>
      <BracketLayout
        matchDetails={matchDetails}
        setMatchDetails={setMatchDetails}
        setTwoPlayerMatch={setTwoPlayerMatch}
        user={user}
        gameObj={gameObj}
        handleUpdateMatch={handleUpdateMatch}
      />
    </>
  )
}

export default Brackets
