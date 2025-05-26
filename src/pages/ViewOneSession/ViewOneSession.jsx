import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"
import * as tableService from "../../services/tableService"

const ViewOneSession = (props) => {
  const [currentMatch, setCurrentMatch] = useState(null)
  const [sessionInfo, setSessionInfo] = useState()
  const location = useLocation()
  const queryString = location.search
  const params = new URLSearchParams(queryString)
  const tableId = params.get("tableId")

  useEffect(() => {
    const getSessionData = async () => {
      const data = await tableService.findOne(tableId)
      setSessionInfo(data)
    }

    getSessionData()
  }, [tableId])

  const getPlayersForTeam = (teamId) => {
    const team =
      teamId === sessionInfo?.homeTeam?._id
        ? sessionInfo?.homeTeam
        : teamId === sessionInfo?.awayTeam?._id
        ? sessionInfo?.awayTeam
        : null

    if (!team) {
      console.error(`No team found with ID: ${teamId}`)
      return []
    }

    return props.players.filter((player) =>
      team.teamPlayers.includes(player._id)
    )
  }

  const homePlayersFound = getPlayersForTeam(sessionInfo?.homeTeam?._id)
  const awayPlayersFound = getPlayersForTeam(sessionInfo?.awayTeam?._id)

  const addPlayer =(player)=>{
    console.log("player added", player);
  }


  return (
    <>
      <h2 className="center">Table number {sessionInfo?.tableNumber}</h2>
      <div className="row center space-around">
        <div className="bracket">
          <h3 className="center">{sessionInfo?.homeTeam?.teamName}</h3>
          <div className="w325 green-felt margin">
            {homePlayersFound.map((player) => (
              <div onClick={()=>{
                console.log(player)
                addPlayer(player)
                }} key={player._id}>
                {player.nameFirst} {player.nameLast} ({player.rank})
              </div>
            ))}
          </div>
        </div>

        <div>
          <button>Add Players</button>
        </div>

        <div className="row center space-around">
          <div className="bracket">
            <h3 className="center">{sessionInfo?.awayTeam?.teamName}</h3>
            <div className="w325 green-felt margin">
              {awayPlayersFound.map((player) => (
                <div onClick={()=>addPlayer(player)} key={player._id}>
                  {player.nameFirst} {player.nameLast} ({player.rank})
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ViewOneSession
