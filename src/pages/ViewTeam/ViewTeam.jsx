import { useEffect, useState } from "react"

import * as playerService from "../../services/playerService"
import * as styles from "./ViewTeam.module.css"

const ViewTeam = (props) => {
  const [playerInfo, setPlayerInfo] = useState()
  const sortedPlayers = playerInfo
    ?.slice()
    .sort((a, b) => a?.name.localeCompare(b.name))
  console.log(props);
  useEffect(() => {
    const getPlayerStats = async () => {
      try {
        const data = await Promise.all(
          props?.team.teamPlayers?.map((player) =>
            player === undefined ? player : playerService.findOne(player)
          )
        )
        setPlayerInfo(data)
      } catch (error) {
        console.error("Error fetching player stats:", error)
      }
    }
    getPlayerStats()
  }, [props.team.teamPlayers])

  // const handleEdit = () => {

  // }

  return (
    <div className={`${styles.greenFelt} ${styles.bracket} ${styles.center}`}>
      <h1>{props.team.teamName}</h1>
      <h3 className={`${styles.bracket} ${styles.w75percent}`}>
        <div className="bracket">
              <h2>Team Stats:</h2>
              Wins: {props.team?.wins} <br/>
              Loss: {props.team?.loss} <br/>
              Win Percentage: {((props.team?.wins/(props.team?.wins+props.team?.loss) * 100).toFixed(2))} %
              </div>
        {sortedPlayers?.map(
          (player) =>
            player?.name === props.team.teamCaptain && (
              <div className="bracket" key={player?._id}>
                <h2>Team Captain</h2>
                <h2>Name : {player?.name}</h2>
                Rank : <span style={{color:'gold', fontWeight:'bolder'}}>{player?.rank}</span> <br />
                Match Information
                <div className="bracket">
                Matches Played : <span style={{color:'gold', fontWeight:'bolder'}}>{player?.matchesPlayed}</span> <br />
                  Match Win % :{" "}
                  {player?.matchWin == 0
                    ? "No Matches Won"
                    : <span style={{color:'gold', fontWeight:'bolder'}}>{(
                        (player?.matchWin / player?.matchesPlayed) *
                        100
                      ).toFixed(2)}%</span>}
                  <br />
                  Wins: <span style={{color:'gold', fontWeight:'bolder'}}>{player.matchWin}</span>
                  <br />
                  Loss: <span style={{color:'gold', fontWeight:'bolder'}}>{player.matchLoss}</span>
                </div>
                Game Information
                <div className="bracket">
                Total Games : <span style={{color:'gold', fontWeight:'bolder'}}>{player.gamesWon + player.gamesLoss}</span>
                <br />
                Games Won: <span style={{color:'gold', fontWeight:'bolder'}}>{player.gamesWon}</span>
                <br />
                Games Loss: <span style={{color:'gold', fontWeight:'bolder'}}>{player.gamesLoss}</span>
                <br />
                Game win % :{" "}
                {player.gamesWon == 0
                  ? "No games won"
                  : 
                      <span style={{color:'gold', fontWeight:'bolder'}}>{(player.gamesWon / ((player.gamesWon + player.gamesLoss)) *
                      100
                    ).toFixed(2)}</span>}

                </div>
                <br />
              </div>
            )
        )}
        {sortedPlayers?.map(
          (player) =>
            player?.name !== props.team.teamCaptain && (
              <div className="bracket" key={player?._id}>
              <h2>Name : {player?.name}</h2>
              Rank : <span style={{color:'gold', fontWeight:'bolder'}}>{player?.rank}</span> <br />
              Match Information
              <div className="bracket">
              Matches Played : <span style={{color:'gold', fontWeight:'bolder'}}>{player?.matchesPlayed}</span> <br />
                Match Win % :{" "}
                {player?.matchWin == 0
                  ? "No Matches Won"
                  : <span style={{color:'gold', fontWeight:'bolder'}}>{(
                      (player?.matchWin / player?.matchesPlayed) *
                      100
                    ).toFixed(2)}%</span>}
                <br />
                Wins: <span style={{color:'gold', fontWeight:'bolder'}}>{player.matchWin}</span>
                <br />
                Loss: <span style={{color:'gold', fontWeight:'bolder'}}>{player.matchLoss}</span>
              </div>
              Game Information
              <div className="bracket">
              Total Games : <span style={{color:'gold', fontWeight:'bolder'}}>{player.gamesWon + player.gamesLoss}</span>
              <br />
              Games Won: <span style={{color:'gold', fontWeight:'bolder'}}>{player.gamesWon}</span>
              <br />
              Games Loss: <span style={{color:'gold', fontWeight:'bolder'}}>{player.gamesLoss}</span>
              <br />
              Game win % :{" "}
              {player.gamesWon == 0
                ? "No games won"
                : 
                    <span style={{color:'gold', fontWeight:'bolder'}}>{(player.gamesWon / ((player.gamesWon + player.gamesLoss)) *
                    100
                  ).toFixed(2)}</span>}

              </div>
              <br />
            </div>
            )
        )}
        {/* {props.user?.name === "Admin" && (
          <button onClick={handleEdit} style={{ backgroundColor: "green" }}>
            Edit Team
          </button>
        )} **this is a place holder until funtionality is set up ** */}
      </h3>
      {props?.profile?.accessLevel === 90 && (
        <button onClick={() => props.handleDeleteTeam(props.team._id)}>
          Delete
        </button>
      )}
    </div>
  )
}

export default ViewTeam
