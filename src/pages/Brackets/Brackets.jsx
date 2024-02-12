import BracketLayout from "../../components/bracket/BracketLayout"

const Brackets = ({ gameObj, user, handleUpdateMatch, setTwoPlayerMatch }) => {
  return (
    <>
      <BracketLayout
        setTwoPlayerMatch={setTwoPlayerMatch}
        user={user}
        gameObj={gameObj}
        handleUpdateMatch={handleUpdateMatch}
      />
    </>
  )
}

export default Brackets
