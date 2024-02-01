import { useState, useEffect } from "react"

import Bracket from "./Bracket"

const BracketLayout = ({gameObj, user, handleUpdateMatch}) => { 
  const [matchDetails, setMatchDetails] = useState()

  useEffect(() => {
    const getCurrentMatchDetails = async () => {
      let data = gameObj
      setMatchDetails(data)
    }
    getCurrentMatchDetails()
  }, [gameObj, matchDetails])

  gameObj.rounds[0] = gameObj.matchPlayers

  // console.log(matchDetails);
  return ( 
    <div className="auto-width">
      <div className="bracket-layout__main green-felt2 extend">
        <div className="flex">
          <div className="flex-column">
            <Bracket
              setMatchDetails={setMatchDetails}
              user={user}
              gameObj={gameObj}
              rounds={gameObj.rounds[0]}
              handleUpdateMatch={handleUpdateMatch}
              roundId={0}
            />
          </div>
          <div>
            <Bracket
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

export default BracketLayout;

/*
need to have array's of player IDs
the main one will be the matchplayers array
there will be an array of arrays, this outer array will hold arrays of each round of match players
this will be passed from braketlayout to bracket
in bracket we will brake up the array (rounds) into 2 person matches.
this is where we will add bye players if needed
this bracket will hold a single match comp. this will hold a pair of players
the single match will hold a singlematchplayer comp. this is where we will get the info for the player and apply the checkboxes (also have a req to pull all new data from the db refresh hack)
add null values 
*/