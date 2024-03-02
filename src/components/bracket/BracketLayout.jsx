import { useState, useEffect } from "react"

import Bracket from "./Bracket"

const BracketLayout = ({
  gameObj,
  user,
  handleUpdateMatch,
  setTwoPlayerMatch,
  setMatchDetails,
  matchDetails,
}) => {
  const [isWinnerBracket, setIsWinnerBracket] = useState(true)
  const [count, setCount] = useState(0)
  useEffect(() => {
    const getCurrentMatchDetails = () => {
      let data = gameObj
      setMatchDetails(data)
    }
    getCurrentMatchDetails()
  }, [matchDetails.rounds])

  const onChange = () => {
    setIsWinnerBracket(!isWinnerBracket)
  }

  return (
    <div className="auto-width">
      {gameObj.doubleElim === true && (
        <>
          <button style={{ backgroundColor: "blue" }} onClick={onChange}>
            Winner/Loser bracket
          </button>
          <h1>
            {isWinnerBracket ? "Winners Bracket" : "Second Chance Bracket"}
          </h1>
        </>
      )}
      <div className="bracket-layout__main extend">
        <div className="flex" style={{ alignItems: "center" }}>
          {isWinnerBracket === true && (
            <>
              <div className="flex-column">
                <Bracket
                  isWinnerBracket={isWinnerBracket}
                  count={count}
                  setCount={setCount}
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
                  isWinnerBracket={isWinnerBracket}
                  count={count}
                  setCount={setCount}
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
                  isWinnerBracket={isWinnerBracket}
                  count={count}
                  setCount={setCount}
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
                  isWinnerBracket={isWinnerBracket}
                  count={count}
                  setCount={setCount}
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
                  isWinnerBracket={isWinnerBracket}
                  count={count}
                  setCount={setCount}
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
                  isWinnerBracket={isWinnerBracket}
                  count={count}
                  setCount={setCount}
                  setTwoPlayerMatch={setTwoPlayerMatch}
                  setMatchDetails={setMatchDetails}
                  rounds={gameObj?.rounds[5]}
                  user={user}
                  gameObj={gameObj}
                  handleUpdateMatch={handleUpdateMatch}
                  roundId={5}
                />
              </div>
              <div>
                <Bracket
                  isWinnerBracket={isWinnerBracket}
                  count={count}
                  setCount={setCount}
                  setTwoPlayerMatch={setTwoPlayerMatch}
                  setMatchDetails={setMatchDetails}
                  rounds={gameObj?.rounds[6]}
                  user={user}
                  gameObj={gameObj}
                  handleUpdateMatch={handleUpdateMatch}
                  roundId={6}
                />
              </div>
              <div>
                <Bracket
                  isWinnerBracket={isWinnerBracket}
                  count={count}
                  setCount={setCount}
                  setTwoPlayerMatch={setTwoPlayerMatch}
                  setMatchDetails={setMatchDetails}
                  rounds={gameObj?.rounds[7]}
                  user={user}
                  gameObj={gameObj}
                  handleUpdateMatch={handleUpdateMatch}
                  roundId={7}
                />
              </div>
              <div>
                <Bracket
                  isWinnerBracket={isWinnerBracket}
                  count={count}
                  setCount={setCount}
                  setTwoPlayerMatch={setTwoPlayerMatch}
                  setMatchDetails={setMatchDetails}
                  rounds={gameObj?.rounds[8]}
                  user={user}
                  gameObj={gameObj}
                  handleUpdateMatch={handleUpdateMatch}
                  roundId={8}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default BracketLayout
//  {isWinnerBracket === false && gameObj.doubleElim === true && (
//             <>
//               <div className="flex-column">
//                 <Bracket
//                   isWinnerBracket={isWinnerBracket}
//                   count={count}
//                   setCount={setCount}
//                   setTwoPlayerMatch={setTwoPlayerMatch}
//                   setMatchDetails={setMatchDetails}
//                   user={user}
//                   gameObj={gameObj}
//                   rounds={gameObj?.loserRounds[0]}
//                   handleUpdateMatch={handleUpdateMatch}
//                   roundId={7}
//                 />
//               </div>
//               <div>
//                 <Bracket
//                   isWinnerBracket={isWinnerBracket}
//                   count={count}
//                   setCount={setCount}
//                   setTwoPlayerMatch={setTwoPlayerMatch}
//                   setMatchDetails={setMatchDetails}
//                   rounds={gameObj?.loserRounds[1]}
//                   user={user}
//                   gameObj={matchDetails}
//                   handleUpdateMatch={handleUpdateMatch}
//                   roundId={8}
//                 />
//               </div>
//               <div>
//                 <Bracket
//                   isWinnerBracket={isWinnerBracket}
//                   count={count}
//                   setCount={setCount}
//                   setTwoPlayerMatch={setTwoPlayerMatch}
//                   setMatchDetails={setMatchDetails}
//                   rounds={gameObj?.loserRounds[2]}
//                   user={user}
//                   gameObj={matchDetails}
//                   handleUpdateMatch={handleUpdateMatch}
//                   roundId={9}
//                 />
//               </div>
//               <div>
//                 <Bracket
//                   isWinnerBracket={isWinnerBracket}
//                   count={count}
//                   setCount={setCount}
//                   setTwoPlayerMatch={setTwoPlayerMatch}
//                   setMatchDetails={setMatchDetails}
//                   rounds={gameObj?.loserRounds[3]}
//                   user={user}
//                   gameObj={gameObj}
//                   handleUpdateMatch={handleUpdateMatch}
//                   roundId={10}
//                 />
//               </div>
//               <div>
//                 <Bracket
//                   isWinnerBracket={isWinnerBracket}
//                   count={count}
//                   setCount={setCount}
//                   setTwoPlayerMatch={setTwoPlayerMatch}
//                   setMatchDetails={setMatchDetails}
//                   rounds={gameObj?.loserRounds[4]}
//                   user={user}
//                   gameObj={gameObj}
//                   handleUpdateMatch={handleUpdateMatch}
//                   roundId={11}
//                 />
//               </div>
//               <div>
//                 <Bracket
//                   isWinnerBracket={isWinnerBracket}
//                   count={count}
//                   setCount={setCount}
//                   setTwoPlayerMatch={setTwoPlayerMatch}
//                   setMatchDetails={setMatchDetails}
//                   rounds={gameObj?.loserRounds[5]}
//                   user={user}
//                   gameObj={gameObj}
//                   handleUpdateMatch={handleUpdateMatch}
//                   roundId={12}
//                 />
//               </div>
//             </>
//           )}
