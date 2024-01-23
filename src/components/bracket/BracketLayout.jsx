
import Bracket from "./Bracket"


const BracketLayout = ({gameObj, user}) => { 


  
  return ( 
    <div className="auto-width">
      <div className="bracket-layout__main green-felt2 extend">
        <div className="flex">
          <div className="flex-column"id='match-1'>
              <Bracket 
                user={user}
                gameObj={gameObj}
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

*/