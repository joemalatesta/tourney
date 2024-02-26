import Checkboxes from "../checkboxes/Checkboxes"

const SingleMatchPlayerLine = ({ player }) => {

  if (player?.value === "undefined") {
    player = {
      _id: Math.random(),
      name: "Awaiting Player",
      rank: 0,
    }
  }

  return (
    <div className="flex" style={{ alignItems: "center" }}>
      <div
        className="flex start bracket match-width2 match-height2 green-felt"
        style={{ width: "100%" }} //, WebkitTextStroke: '1px white', color:'black'
      >
        {player !== null && (
          <div className="flex" style={{ width: "95%" }}>
            <div className="start flex 1" style={{ width: "95%" }}>
              <div className="flex 1" style={{ width: "95%" }}>
                {player !== undefined ? (
                  <div className="flex" style={{ width: "95%" }}>
                    <h1>
                      {player?.name} ({player?.rank})
                    </h1>
                  </div>
                ) : (
                  <>Awaiting Player</>
                )}

                <Checkboxes player={player} /> 
            <h2>
              ({player.games})
              
              </h2>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default SingleMatchPlayerLine
