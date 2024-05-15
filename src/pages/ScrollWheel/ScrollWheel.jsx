import React, { useState } from "react"
import * as gameService from "../../services/gameService"
import './ScrollWheel.css'

const ScrollWheel = ({ players }) => {
  const [player1Rank, setPlayer1Rank] = useState(50)
  const [player2Rank, setPlayer2Rank] = useState(50)

  const handleChangePlayer1 = (event) => {
    setPlayer1Rank(parseInt(event.target.value))
  }

  const handleChangePlayer2 = (event) => {
    setPlayer2Rank(parseInt(event.target.value))
  }

  let lowestRank = Infinity
  let highestRank = 0

  players.forEach((el) => {
    if (el.rank < lowestRank) {
      lowestRank = el.rank
    }
    if (el.rank > highestRank) {
      highestRank = el.rank
    }
  })

  const player1 = { rank: player1Rank }
  const player2 = { rank: player2Rank }

  let race = gameService.getGameRace(player1, player2)

  console.log(race)

  return (
    <>
    <div className="bracket center">
      <div className="row">
        <div className="column">
          Player 1
          <select
            name="player1Rank"
            value={player1Rank}
            onChange={handleChangePlayer1}
            >
            {Array.from({ length: highestRank - lowestRank + 11 }, (_, i) => (
              <option key={lowestRank + i} value={lowestRank + i}>
                {lowestRank + i}
              </option>
            ))}
          </select>
          <h1>{race[0]}</h1>
        </div>
        <div className="column">
          Player 2
          <select
            name="player2Rank"
            value={player2Rank}
            onChange={handleChangePlayer2}
            >
            {Array.from({ length: highestRank - lowestRank + 11 }, (_, i) => (
              <option key={lowestRank + i} value={lowestRank + i}>
                {lowestRank + i}
              </option>
            ))}
          </select>
          <h1>{race[1]}</h1>
        </div>
      </div>
            </div>
    </>
  )
}

export default ScrollWheel
