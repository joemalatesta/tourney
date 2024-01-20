import BracketLayout from "../../components/bracket/BracketLayout"
const Brackets = ({gameObj, user}) => {
  
  return (  
    <>
      <BracketLayout 
        user={user}
        gameObj={gameObj}
      />
    </>
  )
}
 
export default Brackets