import { useState, useEffect } from "react";
import Bracket from "./Bracket"
// import * as gameService from '../../services/gameServices'
import * as playerService from '../../services/playerService'
const BracketLayout = ({gameObj, user}) => { 
  const [playerStats, setPlayerStats] = useState()
  const [matches, setMatches] = useState()

  useEffect(() => {
    const getStats = async () => {
      try {
        const stats = await Promise.all(
          gameObj.matchPlayers.map((player) =>
            playerService.findOne(player)
          )
        );
        
        setPlayerStats(stats);
      } catch (error) {
        
        console.error("Error fetching player stats:", error);
      }
    };
    
    getStats();
  }, []);
  
  // useEffect(() => {
  //   const getMatches = async () => {
  //     try {
  //       const matchData = await gameService.SplitIntoTuples(playerStats)
  //       setMatches(matchData)
  //     } catch (error) {
  //       console.error("Error fetching match data: ", error)
  //     }
  //   }
  //   getMatches()
    
  // }, [playerStats]);

  return ( 
    <div className="auto-width">
      <div className="bracket-layout__main green-felt2 extend">
        <div className="flex">
          <div className="flex-column"id='match-1'>
            <Bracket 
              setMatches={setMatches}
              playerObj={playerStats}
              user={user}
              matches={matches}
              round={playerStats}
              setRound={gameObj.rounds[0]}
            />
          </div>
          <div className="flex flex-column">
            <Bracket 
              // playerObj={gameObj.rounds[0].flat()}
              // user={user}
              // matches={gameObj.rounds[0]}
              // round={gameObj.rounds[1]}
              // setRound={gameObj.rounds[1].flat()}
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
