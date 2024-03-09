import { useState, useEffect } from "react"

import BracketLayout from "../../components/bracket/BracketLayout"

const Brackets = ({
  gameObj,
  user,
  handleUpdateMatch,
  setTwoPlayerMatch,
  profile,
}) => {
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
        profile={profile}
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
