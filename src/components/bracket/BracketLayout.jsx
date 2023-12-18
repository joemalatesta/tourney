import { useState, useEffect } from "react";
import Bracket from "./Bracket"
import * as gameService from '../../services/gameServices'
import * as playerService from '../../services/playerService'
const BracketLayout = ({gameObj, user}) => { 
  const [matches, setMatches] = useState(gameService.SplitIntoTuples(gameObj.matchPlayers));
  const [round1, setRound1] = useState([])
  let playerObj

  useEffect(() => {
    const getTuples = async () => {
      playerObj = await Promise.all(gameObj.matchPlayers.map(player =>
      playerService.findOne(player)
      ));

      console.log(playerObj);  
    }
    getTuples()
  }, []);

  console.log(matches);
  return ( 
    <div className="auto-width">
      <div className="bracket-layout__main green-felt2 extend">
        <div className="flex">
          <div className="flex-column"id='match-1'>
            <Bracket 
              playerObj={playerObj}
              user={user}
              matches={matches}
              round={playerObj}
              setRound={setRound1}
            />
          </div>
          <div className="flex flex-column">
            <Bracket 
              playerObj={round1.flat()}
              user={user}
              matches={round1}
              // round={round2}
              // setRound={setRound2}
            />
          </div>
          <div className="flex flex-column">
            <Bracket 
              // playerObj={round2.flat()}
              // user={user}
              // matches={round2}
              // round={round3}
              // setRound={setRound3}
            />
          </div>
          <div className="flex flex-column">
            <Bracket 
              // playerObj={round3.flat()}
              // user={user}
              // matches={round3}
              // round={round4}
              // setRound={setRound4}
            />
          </div>
          <div className="flex flex-column">
            <Bracket 
              // playerObj={round4.flat()}
              // user={user}
              // matches={round4}
              // round={round5}
              // setRound={setRound5}
            />
          </div>
          <div className="flex flex-column">
            <Bracket 
              // playerObj={round5.flat()}
              // user={user}
              // matches={round5}
              // round={round6}
              // setRound={setRound6}
            />
          </div>
          <div className="flex flex-column">
            <Bracket 
              // playerObj={round6.flat()}
              // user={user}
              // matches={round6}
              // round={round3}
              // setRound={setRound3}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default BracketLayout;
