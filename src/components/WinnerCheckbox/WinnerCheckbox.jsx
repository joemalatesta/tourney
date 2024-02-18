import { useState } from "react"

const WinnerCheckbox = (props) => {
  const [isHidden, setIsHidden] = useState(false)

  const handleHideWinnerCheckbox = () => {
    props.setCount((prevInfo) => {
      console.log(prevInfo);
      if (
        prevInfo === props.count
      ) {
        return [
          props.count + 1
        ]
      }
    })
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
