import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import * as playerService from "../../services/playerService"
import * as gameService from "../../services/gameService"
import WinnerCheckbox from "../WinnerCheckbox/WinnerCheckbox"

const BracketView = (props) => {
  const [playerInfo, setPlayerInfo] = useState()
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

  useEffect(() => {
    const updateCurrentMatch = () => {
      props.setCurrentMatch(playerInfo)
    }
    updateCurrentMatch()
  }, [playerInfo]);

  const handleAddWinnerToNextRound = (id) => {
    let idxNum = props.roundIndex.indexOf(id)
    let idx = Math.floor(idxNum / 2)
    props.setMatchDetails((prevGameObj) => {
      const updatedGameObj = { ...prevGameObj }
      updatedGameObj.rounds[props.roundId + 1].splice(idx, 1, id)
      return updatedGameObj
    })
    props.handleUpdateMatch(props.gameObj)
  }

  return (
    <>
      {playerInfo?.map((player, idx) =>
        player?.name === undefined ? (
          <div key={idx}>
            <div className="bracket">Awaiting Player</div>
          </div>
        ) : (
          <div key={idx}>
            <div className="bracket flex" style={{justifyContent:'space-between'}}>
              <Link to={'/match-view'} match={props.match} >
                {player.name} : {player.rank}
              </Link>
              <div className="flex end" >
              {props?.user?.name==='Admin' &&
                <WinnerCheckbox 
                roundId={props.roundId}
                handleUpdateMatch={props.handleUpdateMatch}
                setMatchDetails={props.setMatchDetails}
                roundIndex={props.roundIndex}
                player={player} 
                handleAddWinnerToNextRound={handleAddWinnerToNextRound}
                />
              }
              
              </div>
            </div>
          </div>
        )
      )}
    </>
  )
}

export default BracketView
