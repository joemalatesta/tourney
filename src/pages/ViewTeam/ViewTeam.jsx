import { useEffect, useState } from "react"

import * as playerService from "../../services/playerService"
import * as styles from "./ViewTeam.module.css"

const ViewTeam = (props) => {
  const [playerInfo, setPlayerInfo] = useState()
  const sortedPlayers = playerInfo
    ?.slice()
    .sort((a, b) => a?.name.localeCompare(b.name))

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
        {sortedPlayers?.map(
          (player) =>
            player?.name === props.team.teamCaptain && (
              <p key={player?._id}>
                Name : {player?.name}
                <br />
                Rank : {player?.rank} <br />
                Matches Played : {player?.matchesPlayed} <br />
                Match Win % :{" "}
                {player?.matchWin == 0
                  ? "No Matches Won"
                  : `${
                      (player?.matchWin / player?.matchesPlayed).toFixed(2) *
                      100
                    }%`}
                <br />
                Wins: {player.matchWin}
                <br />
                Loss: {player.matchLoss}
                <br />
                Total Games : {player.gamesWon + player.gamesLoss}<br/>
                Games Won: {player.gamesWon}
                <br />
                Games Loss: {player.gamesLoss}
                <br />
                Game win % : {player.gamesWon == 0 ? 'No games won' : (player.gamesWon / (player.gamesWon + player.gamesLoss)).toFixed(4) * 100} 
              </p>
            )
        )}
        {sortedPlayers?.map(
          (player) =>
            player?.name !== props.team.teamCaptain && (
              <p key={player?._id}>
                Name : {player?.name}
                <br />
                Rank : {player?.rank} <br />
                Matches Played : {player?.matchesPlayed} <br />
                Match Win % :{" "}
                {player?.matchWin == 0
                  ? "No Matches Won"
                  : `${
                      (player?.matchWin / player?.matchesPlayed).toFixed(2) *
                      100
                    }%`} 
                <br />
                Wins: {player.matchWin}
                <br />
                Loss: {player.matchLoss}
                <br />
                Total Games : {player.gamesWon + player.gamesLoss}<br/>
                Games Won: {player.gamesWon}
                <br />
                Games Loss: {player.gamesLoss}
                <br />
                Game win % : {player.gamesWon == 0 ? 'No games won' : (player.gamesWon / (player.gamesWon + player.gamesLoss)).toFixed(4) * 100} 
              </p>
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
