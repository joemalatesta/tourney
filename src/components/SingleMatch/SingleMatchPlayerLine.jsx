import Checkboxes from "../checkboxes/Checkboxes"

const SingleMatchPlayerLine = ({
  player,
  profile,
  handleWinner,
  isDisabled,
  setIsDisabled,
  disableCheckboxes,
  seeCheckboxes,
  gameWinner,
  handleWonGame,
  handleSaveMatch,
  isSubmitted,
}) => {
  if (player?.value === "undefined") {
    player = {
      _id: Math.random(),
      name: "Awaiting Player",
      rank: 0,
    }
  }

  const defineWinner = (winner) => {
    disableCheckboxes()
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
                {gameWinner?._id === player?._id && isSubmitted === false && (
                  <>
                    <button onClick={handleSaveMatch}>Validate Match</button>
                  </>
                )}
                {gameWinner?._id === player?._id && (
                  <>
                    <h1 style={{ color: "cornflowerblue" }} className="center">
                      Winner
                    </h1>
                  </>
                )}

                {seeCheckboxes && (
                  <Checkboxes
                    handleWonGame={handleWonGame}
                    setIsDisabled={setIsDisabled}
                    isDisabled={isDisabled}
                    defineWinner={defineWinner}
                    player={player}
                    profile={profile}
                    handleWinner={handleWinner}
                  />
                )}
                <h2>({player.games})</h2>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default SingleMatchPlayerLine
