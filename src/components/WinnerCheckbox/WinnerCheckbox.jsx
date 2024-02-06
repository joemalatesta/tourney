import { useState } from "react"

const WinnerCheckbox = (props) => {
  const [isHidden, setIsHidden]=useState(false)
  console.log(props);




  const handleHideWinnerCheckbox = () => {
    setIsHidden(true)
  }

  return (
    <>
      <div className="end flex center ">
        Winner{" "}
        <input
          hidden={isHidden}
          onChange={() => {
            props.handleAddWinnerToNextRound(props.player._id)
            handleHideWinnerCheckbox()
          }}
          type="checkbox"
        />
      </div>
    </>
  )
}

export default WinnerCheckbox
