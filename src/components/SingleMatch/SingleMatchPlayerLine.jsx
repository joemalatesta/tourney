import Checkboxes from "../checkboxes/Checkboxes"

const SingleMatchPlayerLine = ({
  player,
  user,
  isHidden,
  setIsHidden,
  handleHideWinnerCheckbox,
  handleUpdateMatch,
  gameObj,
  roundId,
  setMatchDetails,
  roundIndex,
}) => {
  if (player?.value === "undefined") {
    player = {
      _id: Math.random(),
      name: "Awaiting Player",
      rank: 0,
    }
  }

  const handleAddWinnerToNextRound = () => {
    let idxNum = roundIndex.indexOf(player._id)
    let idx = Math.floor(idxNum / 2)
    setMatchDetails((prevGameObj) => {
      const updatedGameObj = { ...prevGameObj }
      updatedGameObj.rounds[roundId + 1].splice(idx, 1, player._id)
      return updatedGameObj
    })
    handleUpdateMatch(gameObj)
  }

  return (
    <div className="flex" style={{alignItems:'center'}}>
      <div className="flex start bracket match-width2 match-height2 red-felt" style={{width:'100%'}}>
        {player !== null && (
          <div className="flex" style={{width:'95%'}}>
            <div className="start flex 1" style={{width:'95%'}}>
              <div className="flex 1" style={{width:'95%'}}>
                {player !== undefined ? (
                  <div className="flex" style={{width:'95%'}}>
                    <h1>{player?.name}({player?.rank})</h1>
                  </div>
                ) : (
                  <>Awaiting Player</>
                )}
             
                <Checkboxes
                  setIsHidden={setIsHidden}
                  player={player}
                  user={user}
                  isHidden={isHidden}
                  handleHideWinnerCheckbox={handleHideWinnerCheckbox}
                  id={player?._id}
                  />
              
                  </div>
            </div>
          </div>
        )}
      </div>

    </div>
  )
}

export default SingleMatchPlayerLine
