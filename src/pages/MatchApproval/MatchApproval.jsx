import { useState, useEffect } from "react"

import * as playerService from "../../services/playerService"
// import * as teamService from "../../services/teamService"
import * as triMatchService from "../../services/triMatchService"

import EditMatchApprovals from "../../components/EditMatchApprovals/EditMatchApprovals"

const MatchApproval = () => {
  const [playedData, setPlayedData] = useState([])
  const [matchPairs, setMatchPairs] = useState([])
  const [showEdit, setShowEdit] = useState(null)
  const [showButton, setShowButton] = useState(true)
  const [homeWins, setHomeWins] = useState(0)
  const [awayWins, setAwayWins] = useState(0)

  console.log(playedData)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await triMatchService.index()
        const matchStates = data.map((match) => ({
          ...match,
        }))
        setPlayedData(matchStates)
        if (matchStates && matchStates.length > 0) {
          const groupedArrays = matchStates.reduce((groups, current) => {
            const key = current.date + "|" + current.homeTeam.teamName
            if (!groups[key]) {
              groups[key] = []
            }
            groups[key].push(current)
            return groups
          }, {})
          const result = Object.values(groupedArrays)
          setMatchPairs(result)
        } else {
          setMatchPairs([])
        }
      } catch (error) {
        console.error("Error fetching played matches:", error)
      }
    }
    fetchData()
  }, [])

  console.log(homeWins, awayWins)

  const handleSubmitMatch = async (num, match) => {
    if (num === 1) {
      let winData1 = {
        ...match[0].match1.winningPlayer,
        rank: match[0].match1.winningPlayer.rank + 1,
        matchesPlayed: match[0].match1.winningPlayer.matchesPlayed + 1,
        matchWin: match[0].match1.winningPlayer.matchWin + 1,
        gamesWon:
          match[0].match1.winnerGamesPlayed +
          match[0].match1.winningPlayer.gamesWon,
        gamesLoss:
          match[0].match1.winningPlayer.gamesLoss +
          match[0].match1.loserGamesPlayed,
      }

      let loserData1 = {
        ...match[0].match1.losingPlayer,
        rank: match[0].match1.losingPlayer.rank - 1,
        matchesPlayed: match[0].match1.losingPlayer.matchesPlayed + 1,
        matchLoss: match[0].match1.losingPlayer.matchLoss + 1,
        gamesWon:
          match[0].match1.losingPlayer.gamesWon +
          match[0].match1.winnerGamesPlayed,
        gamesLoss:
          match[0].match1.losingPlayer.gamesLoss +
          match[0].match1.loserGamesPlayed,
      }
      if (match[0]?.match1.winningTeam._id === match[0]?.homeTeam._id) {
        setHomeWins(homeWins + 1)
      } else {
        setAwayWins(awayWins + 1)
      }

      playerService.update(winData1)
      playerService.update(loserData1)
    }

    if (num === 2) {
      let winData2 = {
        ...match[0].match2.winningPlayer,
        rank: match[0].match2.winningPlayer.rank + 1,
        matchesPlayed:
          parseInt(match[0].match2.winningPlayer.matchesPlayed) + 1,
        matchWin: parseInt(match[0].match2.winningPlayer.matchWin) + 1,
        gamesWon:
          match[0].match2.winnerGamesPlayed +
          match[0].match2.winningPlayer.gamesWon,
        gamesLoss:
          match[0].match2.winningPlayer.gamesLoss +
          match[0].match2.loserGamesPlayed,
      }

      let loserData2 = {
        ...match[0].match2.losingPlayer,
        rank: match[0].match2.losingPlayer.rank - 1,
        matchesPlayed: match[0].match2.losingPlayer.matchesPlayed + 1,
        matchLoss: match[0].match2.losingPlayer.matchLoss + 1,
        gamesWon:
          match[0].match2.losingPlayer.gamesWon +
          match[0].match2.loserGamesPlayed,
        gamesLoss:
          match[0].match2.losingPlayer.gamesLoss +
          match[0].match2.winnerGamesPlayed,
      }

      if (match[0]?.match2.winningTeam._id === match[0]?.homeTeam._id) {
        setHomeWins(homeWins + 1)
      } else {
        setAwayWins(awayWins + 1)
      }
      playerService.update(winData2)
      playerService.update(loserData2)
    }

    if (num === 3) {
      let winData3 = {
        ...match[0].match3.winningPlayer,
        rank: match[0].match3.winningPlayer.rank + 1,
        matchesPlayed: match[0].match3.winningPlayer.matchesPlayed + 1,
        matchWin: match[0].match3.winningPlayer.matchWin + 1,
        gamesWon:
          match[0].match3.winnerGamesPlayed +
          match[0].match3.winningPlayer.gamesWon,
        gamesLoss:
          match[0].match3.winningPlayer.gamesLoss +
          match[0].match3.loserGamesPlayed,
      }

      let loserData3 = {
        ...match[0].match3.losingPlayer,
        rank: match[0].match3.losingPlayer.rank - 1,
        matchesPlayed: match[0].match3.losingPlayer.matchesPlayed + 1,
        matchLoss: match[0].match3.losingPlayer.matchLoss + 1,
        gamesWon:
          match[0].match3.losingPlayer.gamesWon +
          match[0].match3.loserGamesPlayed,
        gamesLoss:
          match[0].match3.losingPlayer.gamesLoss +
          match[0].match3.winnerGamesPlayed,
      }
      if (match[0]?.match3.winningTeam._id === match[0]?.homeTeam._id) {
        setHomeWins(homeWins + 1)
      } else {
        setAwayWins(awayWins + 1)
      }
      playerService.update(winData3)
      playerService.update(loserData3)
    }
    // let homeTeam = match.homeTeam
    // let visitingTeam = match.visitingTeam
    // let updatedHomeScores = {
    //   ...homeTeam,
    //   wins: homeTeam.wins + homeWins,
    //   loss: homeTeam.loss + (3 - homeWins),
    // }

    // let updatedAwayScores = {
    //   ...visitingTeam,
    //   wins: visitingTeam.wins + awayWins,
    //   loss: visitingTeam.loss + (3 - awayWins),
    // }

    // console.log(updatedAwayScores, updatedHomeScores)
    // await teamService.update(updatedAwayScores)
    // await teamService.update(updatedHomeScores)
  }

  const isMatchGreen = (match, num) => {
    if (num === 1) {
      return (
        match[0].match1.winningPlayer.name ===
          match[1].match1.winningPlayer.name &&
        match[0].match1.winnerGamesPlayed ===
          match[1].match1.winnerGamesPlayed &&
        match[0].match1.losingPlayer.name ===
          match[1].match1?.losingPlayer.name &&
        match[0].match1.loserGamesPlayed === match[1].match1.loserGamesPlayed
      )
    }
    if (num === 2) {
      return (
        match[0].match2.winningPlayer.name ===
          match[1].match2.winningPlayer.name &&
        match[0].match2.winnerGamesPlayed ===
          match[1].match2.winnerGamesPlayed &&
        match[0].match2.losingPlayer.name ===
          match[1].match2.losingPlayer.name &&
        match[0].match2.loserGamesPlayed === match[1].match2.loserGamesPlayed
      )
    }
    if (num === 3) {
      return (
        match[0].match3.winningPlayer.name ===
          match[1].match3.winningPlayer.name &&
        match[0].match3.winnerGamesPlayed ===
          match[1].match3.winnerGamesPlayed &&
        match[0].match3.losingPlayer.name ===
          match[1].match3.losingPlayer.name &&
        match[0].match3.loserGamesPlayed === match[1].match3.loserGamesPlayed
      )
    }
  }

  const handleEditMatch = (idx) => {
    setShowEdit(idx)
    setShowButton(false)
    console.log(idx)
  }

  return (
    <>
      {!matchPairs?.length && (
        <h1 className="bracket center">No Matches to Display</h1>
      )}
      {matchPairs?.length > 0 && (
        <div className="bracket">
          {matchPairs?.map((match, idx) => (
            <div className="bracket" key={idx}>
              {match.length === 1 && (
                <h2>Warning Only one Person has submitted Stats</h2>
              )}
              {
                // Match 1
              }
              <li>{match[0].date}</li>
              Home Team : {match[0].homeTeam.teamName}
              <br />
              Home Team Wins : {homeWins}
              <br />
              Visiting Team : {match[0].visitingTeam.teamName}
              <br />
              Visiting Team Wins : {awayWins}
              <br />
              <button>Submit Team Stats</button>
              <div className=" row">
                <div className="bracket ">
                  <div className="center">
                    Match 1<br />
                  </div>
                  {showEdit === idx && showButton === false ? (
                    <EditMatchApprovals
                      match0={match[0].match1}
                      match1={match[1].match1}
                    />
                  ) : (
                    <>
                      Winner :{" "}
                      {match[0].match1.winningPlayer.name ===
                      match[1]?.match1.winningPlayer.name ? (
                        <div style={{ color: "green " }}>
                          {match[0].match1.winningPlayer.name}
                        </div>
                      ) : (
                        <div style={{ color: "red" }}>
                          {match[0].match1.winningPlayer.name}
                          <br />
                          OR <br />
                          {match[1]?.match1?.winningPlayer.name} ?
                        </div>
                      )}
                      <br />
                      <div>
                        {" "}
                        Games Won :{" "}
                        {match[0].match1.winnerGamesPlayed ===
                        match[1]?.match1.winnerGamesPlayed ? (
                          <div style={{ color: "green " }}>
                            {match[0].match1.winnerGamesPlayed}
                          </div>
                        ) : (
                          <div style={{ color: "red" }}>
                            {match[0].match1.winnerGamesPlayed} OR{" "}
                            {match[1]?.match1?.winnerGamesPlayed} games won?
                          </div>
                        )}
                        Loser :{" "}
                        {match[0].match1.losingPlayer.name ===
                        match[1]?.match1?.losingPlayer.name ? (
                          <div style={{ color: "green " }}>
                            {match[0].match1.losingPlayer.name}
                          </div>
                        ) : (
                          <div style={{ color: "red" }}>
                            {match[0].match1.losingPlayer.name}
                            <br />
                            OR <br />
                            {match[1]?.match1.losingPlayer.name} ?
                          </div>
                        )}
                      </div>
                      <br />
                      <div>
                        {" "}
                        Games Won :{" "}
                        {match[0].match1.loserGamesPlayed ===
                        match[1]?.match1.loserGamesPlayed ? (
                          <div style={{ color: "green " }}>
                            {match[0].match1.loserGamesPlayed}
                          </div>
                        ) : (
                          <div style={{ color: "red" }}>
                            {match[0].match1.loserGamesPlayed} OR{" "}
                            {match[1]?.match1.loserGamesPlayed} games won?
                          </div>
                        )}
                      </div>
                      {match.length > 1 &&
                        !isMatchGreen(match, 1) &&
                        showButton && (
                          <button onClick={() => handleEditMatch(idx)}>
                            Edit
                          </button>
                        )}
                    </>
                  )}
                  {match.length > 1 && isMatchGreen(match, 1) && (
                    <>
                      <button onClick={() => handleSubmitMatch(1, match)}>
                        Submit Match 1
                      </button>
                    </>
                  )}
                </div>
                {
                  // Match 2
                }

                <div className="bracket ">
                  <div className="center">
                    Match 2<br />
                  </div>
                  Winner :{" "}
                  {match[0].match2.winningPlayer.name ===
                  match[1]?.match2.winningPlayer.name ? (
                    <div style={{ color: "green " }}>
                      {match[0].match2.winningPlayer.name}
                    </div>
                  ) : (
                    <div style={{ color: "red" }}>
                      {match[0].match2.winningPlayer.name} <br />
                      OR <br />
                      {match[1]?.match2.winningPlayer.name} ?
                    </div>
                  )}
                  <br />
                  <div>
                    {" "}
                    Games Won :{" "}
                    {match[0].match2.winnerGamesPlayed ===
                    match[1]?.match2.winnerGamesPlayed ? (
                      <div style={{ color: "green " }}>
                        {match[0].match2.winnerGamesPlayed}
                      </div>
                    ) : (
                      <div style={{ color: "red" }}>
                        {match[0].match2.winnerGamesPlayed} OR{" "}
                        {match[1]?.match2.winnerGamesPlayed} ?
                      </div>
                    )}
                    Loser :{" "}
                    {match[0].match2.losingPlayer.name ===
                    match[1]?.match2.losingPlayer.name ? (
                      <div style={{ color: "green " }}>
                        {match[0].match2.losingPlayer.name}
                      </div>
                    ) : (
                      <div style={{ color: "red" }}>
                        {match[0].match2.losingPlayer.name}
                        <br />
                        OR
                        <br />
                        {match[1]?.match2.losingPlayer.name} ?
                      </div>
                    )}
                  </div>
                  <br />
                  <div>
                    {" "}
                    Games Won :{" "}
                    {match[0].match2.loserGamesPlayed ===
                    match[1]?.match2.loserGamesPlayed ? (
                      <div style={{ color: "green " }}>
                        {match[0].match2.loserGamesPlayed}
                      </div>
                    ) : (
                      <div style={{ color: "red" }}>
                        {match[0].match2.loserGamesPlayed} OR{" "}
                        {match[1]?.match2.loserGamesPlayed} ?
                      </div>
                    )}
                  </div>
                  {match.length > 1 && !isMatchGreen(match, 2) && (
                    <button>Edit</button>
                  )}
                  {match.length > 1 && isMatchGreen(match, 2) && (
                    <button onClick={() => handleSubmitMatch(2, match)}>
                      Submit Match 2
                    </button>
                  )}
                </div>

                {
                  // Match 3
                }
                <div className="bracket ">
                  <div className="center">
                    Match 3<br />
                  </div>
                  Winner :{" "}
                  {match[0].match3.winningPlayer.name ===
                  match[1]?.match3.winningPlayer.name ? (
                    <div style={{ color: "green " }}>
                      {match[0].match3.winningPlayer.name}
                    </div>
                  ) : (
                    <div style={{ color: "red" }}>
                      {match[0].match3.winningPlayer.name} OR{" "}
                      {match[1]?.match3.winningPlayer.name} ?
                    </div>
                  )}
                  <br />
                  <div>
                    {" "}
                    Games Won :{" "}
                    {match[0].match3.winnerGamesPlayed ===
                    match[1]?.match3.winnerGamesPlayed ? (
                      <div style={{ color: "green " }}>
                        {match[0].match3.winnerGamesPlayed}
                      </div>
                    ) : (
                      <div style={{ color: "red" }}>
                        {match[0].match3.winnerGamesPlayed} OR{" "}
                        {match[1]?.match3.winnerGamesPlayed} ?
                      </div>
                    )}
                    Loser :{" "}
                    {match[0].match3.losingPlayer.name ===
                    match[1]?.match3.losingPlayer.name ? (
                      <div style={{ color: "green " }}>
                        {match[0].match3.losingPlayer.name}
                      </div>
                    ) : (
                      <div style={{ color: "red" }}>
                        {match[0].match3.losingPlayer.name} OR{" "}
                        {match[1]?.match3.losingPlayer.name} ?
                      </div>
                    )}
                  </div>
                  <br />
                  <div>
                    {" "}
                    Games Won :{" "}
                    {match[0].match3.loserGamesPlayed ===
                    match[1]?.match3.loserGamesPlayed ? (
                      <div style={{ color: "green " }}>
                        {match[0].match3.loserGamesPlayed}
                      </div>
                    ) : (
                      <div style={{ color: "red" }}>
                        {match[0].match3.loserGamesPlayed} OR{" "}
                        {match[1]?.match3.loserGamesPlayed} ?
                      </div>
                    )}
                  </div>
                  {match.length > 1 && !isMatchGreen(match, 3) && (
                    <button>Edit</button>
                  )}
                  {match.length > 1 && isMatchGreen(match, 3) && (
                    <button onClick={() => handleSubmitMatch(3, match)}>
                      Submit Match 3
                    </button>
                  )}
                </div>
              </div>
              Match submitted by : {match[0]?.submittedBy}{" "}
              {match.length > 1 ? ` & ${match[1]?.submittedBy}` : ""}{" "}
            </div>
          ))}
        </div>
      )}
    </>
  )
}

export default MatchApproval
