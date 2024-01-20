
import Bracket from "./Bracket"


const BracketLayout = ({gameObj, user}) => { 

  console.log(gameObj)
  
  return ( 
    <div className="auto-width">
      <div className="bracket-layout__main green-felt2 extend">
        <div className="flex">
          <div className="flex-column"id='match-1'>
            {gameObj.rounds.map((round, idx) =>(
              <Bracket 
                round={round}
                key={idx}
                user={user}
                gameObj={gameObj}
              />

            )

            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BracketLayout;

