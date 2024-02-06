import BracketLayout from "../../components/bracket/BracketLayout"

const Brackets = ({
  gameObj,
  user,
  handleUpdateMatch
}) => {

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
