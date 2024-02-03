import { useState } from "react"
import BracketLayout from "../../components/bracket/BracketLayout"

const Brackets = ({
  gameObj,
  user,
  handleUpdateMatch
}) => {
  const [newGameObj, setNewGameObj]= useState(gameObj)

  console.log('This is the new game object on the main bracket page',newGameObj)
  return (
    <>
      <BracketLayout
        setNewGameObj={setNewGameObj}
        user={user}
        gameObj={newGameObj}
        handleUpdateMatch={handleUpdateMatch}
      />
    </>
  )
}

export default Brackets
