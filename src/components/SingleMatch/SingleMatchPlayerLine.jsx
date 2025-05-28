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
  winnerGames,
  loserGames,
}) => {
  if (player?.value === "undefined") {
    player = {
      _id: Math.random(),
      name: "Awaiting Player",
      rank: 0,
    }
  }

  const defineWinner = () => {
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

                {gameWinner?._id === player?._id && isSubmitted === true && (
                  <>
                    <div style={{ color: "red", margin: "15px" }}>WINNER</div>
                    <div style={{ color: "cornflowerblue" }} className="center">
                      Games Won :
                      <div style={{ color: "gold" }}>{winnerGames}</div>
                      <br />
                    </div>
                  </>
                )}
                {gameWinner !== null &&
                  gameWinner?._id !== player?._id &&
                  isSubmitted === true && (
                    <>
                      <div
                        style={{ color: "cornflowerblue" }}
                        className="center"
                      >
                        Games Won :{" "}
                        <div style={{ color: "gold", margin: "20px" }}>
                          {loserGames}
                        </div>
                        <br />
                      </div>
                    </>
                  )}

                {seeCheckboxes && (
                  <Checkboxes
                    handleSaveMatch={handleSaveMatch}
                    handleWonGame={handleWonGame}
                    setIsDisabled={setIsDisabled}
                    isDisabled={isDisabled}
                    defineWinner={defineWinner}
                    player={player}
                    profile={profile}
                    handleWinner={handleWinner}
                  />
                )}
                {isSubmitted === false && player?.games !== undefined && (
                  <>
                    <h2>({player.games})</h2>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default SingleMatchPlayerLine
