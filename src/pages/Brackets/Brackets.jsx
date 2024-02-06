import BracketLayout from "../../components/bracket/BracketLayout"

const Brackets = ({ gameObj, user, handleUpdateMatch, setCurrentMatch }) => {
  return (
    <>
      <BracketLayout
        setCurrentMatch={setCurrentMatch}
        user={user}
        gameObj={gameObj}
        handleUpdateMatch={handleUpdateMatch}
      />
    </>
  )
}

export default Brackets
