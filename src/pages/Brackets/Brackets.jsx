// import { useState, useEffect } from "react"
// import * as matchService from '../../services/matchService'
import BracketLayout from "../../components/bracket/BracketLayout"

const Brackets = ({gameObj, user, handleUpdateMatch}) => {
  
  return (  
    <>
      <BracketLayout 
        user={user}
        gameObj={gameObj}
        handleUpdateMatch={handleUpdateMatch}
      />
    </>
  )
}
 
export default Brackets