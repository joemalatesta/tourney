import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import * as playerService from "../../services/playerService"
import * as gameService from "../../services/gameService"
import WinnerCheckbox from "../WinnerCheckbox/WinnerCheckbox"

const BracketView = (props) => {
  const navigate = useNavigate()
  const [playerInfo, setPlayerInfo] = useState()
  useEffect(() => {
    props.setRerender(!props.render)
  }, [playerInfo])

  useEffect(() => {
    const getPlayerStats = async () => {
      try {
        const data = await Promise.all(
          props?.match?.map((player) =>
            player === undefined ? player : playerService.findOne(player)
          )
        )
        const updatedPlayerInfo = gameService.getFirstPlayer(data)
        setPlayerInfo(updatedPlayerInfo)
      } catch (error) {
        console.error("Error fetching player stats:", error)
      }
    }
    getPlayerStats()
  }, [props.match])

  const handleAddWinnerToNextRound = (playerId) => {
    let idxNum = props.roundIndex.indexOf(playerId)
    let idx = Math.floor(idxNum / 2)

    // if (props.isWinnerBracket === true) {
    if (props.roundIndex.length <= 2) return <h1>{playerId} is the Winner</h1>
    props.setMatchDetails((prevGameObj) => {
      const updatedGameObj = { ...prevGameObj }
      updatedGameObj.rounds[props.roundId + 1].splice(idx, 1, playerId)
      return updatedGameObj
    })
    //   props.setMatchDetails((prevGameObj) => {
    //     console.log(props.match)
    //     const loser = props.match.filter((loserId) => loserId !== playerId)
    //     console.log(loser)
    //     const updatedGameObj = { ...prevGameObj }
    //     updatedGameObj.loserRounds[props.roundId + 1].splice(idx, 1, loser)
    //     return updatedGameObj
    //   })
    // }
    // if (props.isWinnerBracket === false) {
    //   console.log(props.match)

    //   console.log(playerId);
    //   props.setMatchDetails((prevGameObj) => {
    //     const updatedGameObj = { ...prevGameObj }
    //     updatedGameObj.loserRounds[props.roundId +1].splice(idx, 1, playerId)
    //     return updatedGameObj
    //   })
    // }
    props.handleUpdateMatch(props.gameObj)
  }
  const handleViewSingleMatch = () => {
    props.setTwoPlayerMatch(playerInfo)
    navigate("/match-view")
  }

  return (
    <div>
      {playerInfo?.map((player, idx) =>
        player?.name === undefined ? (
          <div key={idx}>
            <div className="bracket">Awaiting Player</div>
          </div>
        ) : (
          <div
            className="flex"
            style={{ justifyContent: "space-between" }}
            key={idx}
          >
            <div
              id={player.id}
              className="flex"
              style={{ justifyContent: "space-between" }}
              key={idx}
              onClick={() => handleViewSingleMatch()}
            >
              <div
                className="bracket flex"
                style={{ justifyContent: "space-between", width: "150px" }}
              >
                {player.name} : {player.rank}
                <div className="flex end"></div>
              </div>
            </div>
            {props?.user?.name === "Admin" && (
              <WinnerCheckbox
                count={props.count}
                setCount={props.setCount}
                roundId={props.roundId}
                handleUpdateMatch={props.handleUpdateMatch}
                setMatchDetails={props.setMatchDetails}
                roundIndex={props.roundIndex}
                player={player}
                handleAddWinnerToNextRound={handleAddWinnerToNextRound}
              />
            )}
          </div>
        )
      )}
    </div>
  )
}

export default BracketView
