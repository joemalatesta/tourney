import { useState, useEffect } from "react"
import Team from "../../components/Team/Team"
import TeamPlayers from "../../components/TeamPlayers/TeamPlayers"
import * as gameService from "../../services/gameService"
import * as teamService from "../../services/teamService"
import * as styles from "./ViewMatchup.module.css"

const ViewMatchup = () => {
  const [teams, setTeams] = useState([])
  const [team1, setTeam1] = useState(null)
  const [team2, setTeam2] = useState(null)
  const [player1, setPlayer1] = useState(null)
  const [player2, setPlayer2] = useState(null)
  const [match, setMatch] = useState([])
  const [message, setMessage] = useState("")

  useEffect(() => {
    if (player1 !== null && player2 !== null) setMatch([player1, player2])
  }, [player1, player2])

  useEffect(() => {
    const getTeamData = async () => {
      const data = await teamService.index()
      setTeams(data)
    }
    getTeamData()
  }, [])

  const handleChooseTeam = (team, title) => {
    if (title === "Team 1") {
      setTeam1(team)
      setPlayer1(null)
      setTeams(teams.filter((el) => el._id !== team._id))
    }
    if (title === "Team 2") {
      setTeam2(team)
      setPlayer2(null)
      setTeams(teams.filter((el) => el._id !== team._id))
    }
  }

  const handleChoosePlayer = (player, title) => {
    if (title === "Team 1") {
      setPlayer1(player)
      setMessage("")
    }
    if (title === "Team 2") {
      setPlayer2(player)
      setMessage("")
    }
  }

  const handleClearTeam = async () => {
    const data = await teamService.index()
    setTeams(data)
    setTeam1(null)
    setTeam2(null)
    setPlayer1(null)
    setPlayer2(null)
  }

  const MatchRaceView = (props) => {
    console.log(props.match)
    const [gamesNeeded, setGamesNeeded] = useState()
    const [
      updatedPlayerStateWithMatchCount,
      setUpdatedPlayerStateWithMatchCount,
    ] = useState(props.match)

    let order = gameService.getFirstPlayer(props.match)
    useEffect(() => {
      const getGameRace = async () => {
        try {
          if (order !== undefined) {
            const data = await gameService.getGameRace(
              props.match[0],
              props.match[1]
            )
            setGamesNeeded(data)
          }
        } catch (error) {
          console.error("Error fetching game race:", error)
        }
      }
      getGameRace()
    }, [props.match, order])

    useEffect(() => {
      const addGamesNeeded = async () => {
        try {
          if (props.match && gamesNeeded && gamesNeeded.length >= 2) {
            setUpdatedPlayerStateWithMatchCount((prevPlayerInfo) => {
              if (
                prevPlayerInfo &&
                prevPlayerInfo.length &&
                prevPlayerInfo[0].games !== gamesNeeded[0] &&
                prevPlayerInfo[1].games !== gamesNeeded[1]
              ) {
                return [
                  { ...prevPlayerInfo[0], games: gamesNeeded[0] },
                  { ...prevPlayerInfo[1], games: gamesNeeded[1] },
                ]
              }
            })
          }
        } catch (error) {
          console.error("Error updating player state:", error)
        }
      }
      addGamesNeeded()
    }, [props.match, gamesNeeded])

    const RaceLine = ({ player }) => {
      if (player?.value === "undefined") {
        player = {
          _id: Math.random(),
          name: "Awaiting Player",
          rank: 0,
        }
      }

      useEffect(() => {}, [player])

      return (
        <div className="flex" style={{ alignItems: "center" }}>
          <div
            className="flex start bracket match-width2 match-height2 green-felt"
            style={{ width: "100%" }} //, WebkitTextStroke: '1px white', color:'black'
          >
            {player !== null && (
              <div className="" style={{ width: "200px" }}>
                <div className="">
                  <div className="">
                    {player !== undefined ? (
                      <div className="" style={{ width: "150 px" }}>
                        {player?.name} <br />
                        Games needed : {player?.games}
                      </div>
                    ) : (
                      <>Awaiting Player</>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )
    }

    return (
      <>
        {updatedPlayerStateWithMatchCount?.map((player, idx) => (
          <RaceLine profile={props.profile} player={player} key={idx} />
        ))}
      </>
    )
  }

  return (
    <>
      <h1 className={styles.center}>Match </h1>
      <div className={`${styles.spaceAround}`}>
        <div className={styles.bracket}>
          <Team
            title="Team 1"
            team={team1}
            teams={teams}
            handleChooseTeam={handleChooseTeam}
          />
          <div className={`${styles.bracket} ${styles.greenFelt}`}>
            <TeamPlayers
              matchPlayer={player1}
              title="Team 1"
              team={team1}
              handleChoosePlayer={handleChoosePlayer}
            />
          </div>
        </div>

        <div className={styles.bracket}>
          <h1 style={{ color: "red" }}>
            {team1 == null ? (
              <div className={styles.redText}>Add a Team</div>
            ) : (
              <div className={styles.yellowText}>{team1.teamName}</div>
            )}{" "}
            vs.{" "}
            {team2 == null ? (
              <div className={styles.redText}>Add a Team</div>
            ) : (
              <div className={styles.yellowText}>{team2.teamName}</div>
            )}
          </h1>
          {player1 !== null ? player1.name : "Awaiting Player"} vs:{" "}
          {player2 !== null ? player2.name : "Awaiting Player"}
          <br />
          <h2>{message}</h2>
          {player1 !== null && player2 !== null && (
            <MatchRaceView match={match} />
          )}
          <button onClick={handleClearTeam}>Clear Team</button>
        </div>
        <div className={styles.bracket}>
          <Team
            title="Team 2"
            team={team2}
            teams={teams}
            handleChooseTeam={handleChooseTeam}
          />
          <div className={`${styles.bracket} ${styles.greenFelt}`}>
            <TeamPlayers
              matchPlayer={player2}
              title="Team 2"
              team={team2}
              handleChoosePlayer={handleChoosePlayer}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default ViewMatchup
