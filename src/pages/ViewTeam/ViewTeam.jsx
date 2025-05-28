import { useEffect, useState, useRef } from "react"
import ListOfPlayers from "../../components/players/ListOfPlayers"
import * as playerService from "../../services/playerService"
import * as styles from "./ViewTeam.module.css"
import * as teamService from "../../services/teamService"
import { useNavigate } from "react-router-dom"

const ViewTeam = (props) => {
  const navigate = useNavigate()
  const [playerInfo, setPlayerInfo] = useState()
  const [viewEditTeamPage, setViewEditTeamPage] = useState(false)
  const [team, setTeam] = useState([])
  const [captain, setCaptain] = useState(null)
  const [players, setPlayers] = useState(props.players)
  const formElement = useRef()
  const [formData, setFormData] = useState({
    ...props.team,
    teamName: props?.team.teamName,
    teamPlayers: props?.team.teamPlayers,
    teamCaptain: props?.team.teamCaptain,
  })

  useEffect(() => {
    if (formData.teamPlayers && props.players) {
      const teamPlayerIds = formData.teamPlayers.map((player) =>
        typeof player === "object" ? player._id : player
      )

      const fullTeam = props.players.filter((p) =>
        teamPlayerIds.includes(p._id)
      )

      setTeam(fullTeam)
      setPlayers(props.players.filter((p) => !teamPlayerIds.includes(p._id)))
    }
  }, [formData.teamPlayers, props.players])

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

  const handleEditTeam = () => {
    setViewEditTeamPage(true)
  }

  const handleAddPlayer = (player) => {
    setTeam([player, ...team])
    setPlayers(players.filter((el) => el._id !== player._id))
  }

  const handleRemovePlayer = (player) => {
    setTeam(team.filter((el) => el._id !== player._id))
    setPlayers([...players, player])
  }

  const addCaptain = (player) => {
    findPlayer(player)
    setCaptain(player._id)
    setFormData({ ...formData, teamCaptain: player._id })
  }

  const findPlayer = (id) => {
    console.log(id)
  }

  const handleSubmit = async (evt) => {
    evt.preventDefault()
    if (team.length > 0 && team.teamCaptain !== null) {
      setTeam(team)
      const updatedFormData = {
        ...formData,
        teamPlayers: team,
      }
      await teamService.update(updatedFormData)
      navigate("/view-teams")
    } else return <h1>select all players and captain</h1>
  }

  return (
    <>
      {viewEditTeamPage && (
        <>
          <main className={`${styles.bracket}`}>
            <form autoComplete="off" ref={formElement} onSubmit={handleSubmit}>
              <button onClick={() => setViewEditTeamPage(false)}>cancel</button>

              <button type="submit">Edit Team</button>
            </form>

            <section className={`${styles.flex}`}>
              <div
                className={`${styles.bracket} ${styles.greenFelt} ${styles.w300}`}
              >
                <ListOfPlayers
                  title="Available Players"
                  players={players}
                  handleAdd={handleAddPlayer}
                />
              </div>
              <div
                className={`${styles.bracket} ${styles.greenFelt} ${styles.w300}`}
              >
                <ListOfPlayers
                  addCaptain={addCaptain}
                  captain={captain}
                  title="Assigned to Team"
                  players={team}
                  handleRemove={handleRemovePlayer}
                />
              </div>
            </section>
          </main>
        </>
      )}
      {!viewEditTeamPage && (
        <div
          className={`${styles.greenFelt} ${styles.bracket} ${styles.center}`}
        >
          <h1>{props.team.teamName}</h1>
          <h3 className={`${styles.bracket} ${styles.w75percent}`}>
            <div className="bracket">
              <h2>Team Stats:</h2>
              Wins:{" "}
              <span style={{ color: "gold", fontWeight: "bolder" }}>
                {props.team?.wins}
              </span>{" "}
              <br />
              Loss:{" "}
              <span style={{ color: "gold", fontWeight: "bolder" }}>
                {props.team?.loss}
              </span>{" "}
              <br />
              Win Percentage:{" "}
              <span style={{ color: "gold", fontWeight: "bolder" }}>
                {(
                  (props.team?.wins / (props.team?.wins + props.team?.loss)) *
                  100
                ).toFixed(2)}{" "}
                %
              </span>
            </div>
            {playerInfo?.map(
              (player) =>
                player?._id === props?.team?.teamCaptain && (
                  <div className="bracket" key={player?._id}>
                    <h2>Team Captain</h2>
                    <h2>
                      Name : {player?.nameFirst} {player?.nameLast}
                    </h2>
                    Rank :{" "}
                    <span style={{ color: "gold", fontWeight: "bolder" }}>
                      {player?.rank}
                    </span>{" "}
                    <br />
                    Match Information
                    <div className="bracket">
                      Matches Played :{" "}
                      <span style={{ color: "gold", fontWeight: "bolder" }}>
                        {player?.matchesPlayed}
                      </span>{" "}
                      <br />
                      Match Win % :{" "}
                      {player?.matchWin == 0 ? (
                        "No Matches Won"
                      ) : (
                        <span style={{ color: "gold", fontWeight: "bolder" }}>
                          {(
                            (player?.matchWin / player?.matchesPlayed) *
                            100
                          ).toFixed(2)}
                          %
                        </span>
                      )}
                      <br />
                      Wins:{" "}
                      <span style={{ color: "gold", fontWeight: "bolder" }}>
                        {player.matchWin}
                      </span>
                      <br />
                      Loss:{" "}
                      <span style={{ color: "gold", fontWeight: "bolder" }}>
                        {player.matchLoss}
                      </span>
                    </div>
                    Game Information
                    <div className="bracket">
                      Total Games :{" "}
                      <span style={{ color: "gold", fontWeight: "bolder" }}>
                        {player.gamesWon + player.gamesLoss}
                      </span>
                      <br />
                      Games Won:{" "}
                      <span style={{ color: "gold", fontWeight: "bolder" }}>
                        {player.gamesWon}
                      </span>
                      <br />
                      Games Loss:{" "}
                      <span style={{ color: "gold", fontWeight: "bolder" }}>
                        {player.gamesLoss}
                      </span>
                      <br />
                      Game win % :{" "}
                      {player.gamesWon == 0 ? (
                        "No games won"
                      ) : (
                        <span style={{ color: "gold", fontWeight: "bolder" }}>
                          {(
                            (player.gamesWon /
                              (player.gamesWon + player.gamesLoss)) *
                            100
                          ).toFixed(2)}
                        </span>
                      )}
                    </div>
                    <br />
                  </div>
                )
            )}
            {playerInfo?.map(
              (player) =>
                player?._id !== props.team.teamCaptain && (
                  <div className="bracket" key={player?._id}>
                    <h2>
                      Name : {player?.nameFirst} {player?.nameLast}
                    </h2>
                    Rank :{" "}
                    <span style={{ color: "gold", fontWeight: "bolder" }}>
                      {player?.rank}
                    </span>{" "}
                    <br />
                    Match Information
                    <div className="bracket">
                      Matches Played :{" "}
                      <span style={{ color: "gold", fontWeight: "bolder" }}>
                        {player?.matchesPlayed}
                      </span>{" "}
                      <br />
                      Match Win % :{" "}
                      {player?.matchWin == 0 ? (
                        "No Matches Won"
                      ) : (
                        <span style={{ color: "gold", fontWeight: "bolder" }}>
                          {(
                            (player?.matchWin / player?.matchesPlayed) *
                            100
                          ).toFixed(2)}
                          %
                        </span>
                      )}
                      <br />
                      Wins:{" "}
                      <span style={{ color: "gold", fontWeight: "bolder" }}>
                        {player.matchWin}
                      </span>
                      <br />
                      Loss:{" "}
                      <span style={{ color: "gold", fontWeight: "bolder" }}>
                        {player.matchLoss}
                      </span>
                    </div>
                    Game Information
                    <div className="bracket">
                      Total Games :{" "}
                      <span style={{ color: "gold", fontWeight: "bolder" }}>
                        {player.gamesWon + player.gamesLoss}
                      </span>
                      <br />
                      Games Won:{" "}
                      <span style={{ color: "gold", fontWeight: "bolder" }}>
                        {player.gamesWon}
                      </span>
                      <br />
                      Games Loss:{" "}
                      <span style={{ color: "gold", fontWeight: "bolder" }}>
                        {player.gamesLoss}
                      </span>
                      <br />
                      Game win % :{" "}
                      {player.gamesWon == 0 ? (
                        "No games won"
                      ) : (
                        <span style={{ color: "gold", fontWeight: "bolder" }}>
                          {(
                            (player.gamesWon /
                              (player.gamesWon + player.gamesLoss)) *
                            100
                          ).toFixed(2)}
                        </span>
                      )}
                    </div>
                    <br />
                  </div>
                )
            )}
          </h3>
          {props?.profile?.accessLevel === 90 && (
            <>
              <button onClick={() => handleEditTeam(props.team._id)}>
                Edit Team
              </button>
              <button onClick={() => props.handleDeleteTeam(props.team._id)}>
                Delete
              </button>
            </>
          )}
        </div>
      )}
    </>
  )
}

export default ViewTeam
