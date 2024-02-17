import { useEffect } from "react"
import Bracket from "./Bracket"
const BracketLayout = ({
  gameObj,
  user,
  handleUpdateMatch,
  setTwoPlayerMatch,
  setMatchDetails,
  matchDetails,
}) => {
  useEffect(() => {
    const getCurrentMatchDetails = () => {
      let data = gameObj
      setMatchDetails(data)
    }
    getCurrentMatchDetails()
  }, [matchDetails, gameObj])

  console.log(matchDetails);

  return (
    <div className="auto-width">
      <div className="bracket-layout__main extend">
        <div className="flex">
          <div className="flex-column">
            <Bracket
              setTwoPlayerMatch={setTwoPlayerMatch}
              setMatchDetails={setMatchDetails}
              user={user}
              gameObj={gameObj}
              rounds={gameObj.matchPlayers}
              handleUpdateMatch={handleUpdateMatch}
              roundId={0}
            />
          </div>
          <div>
            <Bracket
              setTwoPlayerMatch={setTwoPlayerMatch}
              setMatchDetails={setMatchDetails}
              rounds={gameObj?.rounds[1]}
              user={user}
              gameObj={matchDetails}
              handleUpdateMatch={handleUpdateMatch}
              roundId={1}
            />
          </div>
          <div>
            <Bracket
              setTwoPlayerMatch={setTwoPlayerMatch}
              setMatchDetails={setMatchDetails}
              rounds={gameObj?.rounds[2]}
              user={user}
              gameObj={matchDetails}
              handleUpdateMatch={handleUpdateMatch}
              roundId={2}
            />
          </div>
          <div>
            <Bracket
              setTwoPlayerMatch={setTwoPlayerMatch}
              setMatchDetails={setMatchDetails}
              rounds={gameObj?.rounds[3]}
              user={user}
              gameObj={gameObj}
              handleUpdateMatch={handleUpdateMatch}
              roundId={3}
            />
          </div>
          <div>
            <Bracket
              setTwoPlayerMatch={setTwoPlayerMatch}
              setMatchDetails={setMatchDetails}
              rounds={gameObj?.rounds[4]}
              user={user}
              gameObj={gameObj}
              handleUpdateMatch={handleUpdateMatch}
              roundId={4}
            />
          </div>
          <div>
            <Bracket
              setTwoPlayerMatch={setTwoPlayerMatch}
              setMatchDetails={setMatchDetails}
              rounds={gameObj?.rounds[5]}
              user={user}
              gameObj={gameObj}
              handleUpdateMatch={handleUpdateMatch}
              roundId={5}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default BracketLayout
