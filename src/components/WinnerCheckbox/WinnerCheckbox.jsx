const WinnerCheckbox = (props) => {
  const handleAddWinnerToNextRound = () => {
    let idxNum = props.roundIndex.indexOf(props.player._id)
    let idx = Math.floor(idxNum / 2)
    props.setMatchDetails((prevGameObj) => {
      const updatedGameObj = { ...prevGameObj }
      updatedGameObj.rounds[props.roundId + 1].splice(idx, 1, props.player._id)
      return updatedGameObj
    })
    props.handleUpdateMatch(props.gameObj)
  }

  return (
    <>
      {props.user?.name === "Admin" && (
        <div className="end flex center ">
          Winner{" "}
          <input
            hidden={props.isHidden}
            onChange={() => {
              props.handleHideWinnerCheckbox()
              handleAddWinnerToNextRound(props.player._id)
            }}
            type="checkbox"
          />
        </div>
      )}
    </>
  )
}

export default WinnerCheckbox
