import * as gameService from "../../services/gameService"

const ShowRace = ({ player1, player2 }) => {
  const games = gameService.getGameRace(player1, player2)

  return (
    <>
      <div className="center red-felt">
        {games !== undefined && (
          <div style={{ fontSize: "26px", fontWeight: "bold", lineHeight: 1.2 }}>
            {games[0]} to {games[1]}
          </div>
        )}
      </div>
    </>
  )
}

export default ShowRace

