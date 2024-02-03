import BracketLayout from "../../components/bracket/BracketLayout"

const Brackets = ({
  gameObj,
  user,
  handleUpdateMatch,
  singleMatchPlayerWithInfo,
}) => {
  return (
    <>
      <BracketLayout
        MSPWI={singleMatchPlayerWithInfo}
        user={user}
        gameObj={gameObj}
        handleUpdateMatch={handleUpdateMatch}
      />
    </>
  )
}

export default Brackets
