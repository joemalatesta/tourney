
import BracketLayout from "../../components/bracket/BracketLayout"

const Brackets = ({gameObj, user, handleUpdateMatch, forceUpdate}) => {
  

  return (  
    <>
      <BracketLayout 
        key={forceUpdate}
        user={user}
        gameObj={gameObj}
        handleUpdateMatch={handleUpdateMatch}
      />
    </>
  )
}
 
export default Brackets