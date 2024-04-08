import { useState, useEffect } from "react"

import * as playerService from "../../services/playerService"
import * as teamService from "../../services/teamService"
import * as triMatchService from "../../services/triMatchService"
import * as scheduleService from '../../services/scheduleService'

import EditMatchApprovals from "../../components/EditMatchApprovals/EditMatchApprovals"

const MatchApproval = () => {
  const [playedData, setPlayedData] = useState([])
  const [matchPairs, setMatchPairs] = useState([])
  const [showEdit, setShowEdit] = useState(null)
  const [showButton, setShowButton] = useState(true)
  const [submitMatch1Visible, setSubmitMatch1Visible] = useState(true)
  const [submitMatch2Visible, setSubmitMatch2Visible] = useState(true)
  const [submitMatch3Visible, setSubmitMatch3Visible] = useState(true)

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

  const handleSubmitMatch = async (num, match) => {
    if (num === 1) {
      let winPlayer = await playerService.findOne(
        match[0].match1.winningPlayer._id
      )
      let losePlayer = await playerService.findOne(
        match[0].match1.losingPlayer._id
      )

      let winData1 = {
        ...winPlayer,
        rank: winPlayer.rank + 1,
        matchesPlayed: winPlayer.matchesPlayed + 1,
        matchWin: winPlayer.matchWin + 1,
        gamesWon: match[0].match1.winnerGamesPlayed + winPlayer.gamesWon,
        gamesLoss: winPlayer.gamesLoss + match[0].match1.loserGamesPlayed,
      }

      let loserData1 = {
        ...losePlayer,
        rank: losePlayer.rank - 1,
        matchesPlayed: losePlayer.matchesPlayed + 1,
        matchLoss: losePlayer.matchLoss + 1,
        gamesWon: losePlayer.gamesWon + match[0].match1.winnerGamesPlayed,
        gamesLoss: losePlayer.gamesLoss + match[0].match1.loserGamesPlayed,
      }
      let winTeam = await teamService.findOne(match[0].match1.winningTeam._id)
      let loseTeam = await teamService.findOne(match[0].match1.losingTeam._id)
      console.log(winTeam)
      if (match[0]?.match1.winningTeam._id === match[0]?.homeTeam._id) {
        let data = { ...winTeam, wins: winTeam.wins + 1 }
        await teamService.update(data)
      } else {
        let data = { ...winTeam, wins: winTeam.wins + 1 }
        await teamService.update(data)
      }
      if (match[0]?.match1.losingTeam._id === match[0]?.homeTeam._id) {
        let data = { ...loseTeam, loss: loseTeam.loss + 1 }
        await teamService.update(data)
      } else {
        let data = { ...loseTeam, loss: loseTeam.loss + 1 }
        await teamService.update(data)
      }
      playerService.update(winData1)
      playerService.update(loserData1)
      setSubmitMatch1Visible(false)
    }

    if (num === 2) {
      let winPlayer = await playerService.findOne(
        match[0].match2.winningPlayer._id
      )
      let losePlayer = await playerService.findOne(
        match[0].match2.losingPlayer._id
      )

      let winData2 = {
        ...winPlayer,
        rank: winPlayer.rank + 1,
        matchesPlayed: winPlayer.matchesPlayed + 1,
        matchWin: winPlayer.matchWin + 1,
        gamesWon: match[0].match2.winnerGamesPlayed + winPlayer.gamesWon,
        gamesLoss: winPlayer.gamesLoss + match[0].match2.loserGamesPlayed,
      }

      let loserData2 = {
        ...losePlayer,
        rank: losePlayer.rank - 1,
        matchesPlayed: losePlayer.matchesPlayed + 1,
        matchLoss: losePlayer.matchLoss + 1,
        gamesWon: losePlayer.gamesWon + match[0].match2.winnerGamesPlayed,
        gamesLoss: losePlayer.gamesLoss + match[0].match2.loserGamesPlayed,
      }

      let winTeam = await teamService.findOne(match[0].match2.winningTeam._id)
      let loseTeam = await teamService.findOne(match[0].match2.losingTeam._id)

      if (match[0]?.match2.winningTeam._id === match[0]?.homeTeam._id) {
        let data = { ...winTeam, wins: winTeam.wins + 1 }
        await teamService.update(data)
      } else {
        let data = { ...winTeam, wins: winTeam.wins + 1 }
        await teamService.update(data)
      }
      if (match[0]?.match2.losingTeam._id === match[0]?.homeTeam._id) {
        let data = { ...loseTeam, loss: loseTeam.loss + 1 }
        await teamService.update(data)
      } else {
        let data = { ...loseTeam, loss: loseTeam.loss + 1 }
        await teamService.update(data)
      }
      playerService.update(winData2)
      playerService.update(loserData2)
      setSubmitMatch2Visible(false)
    }

    if (num === 3) {
      let winPlayer = await playerService.findOne(
        match[0].match3.winningPlayer._id
      )
      let losePlayer = await playerService.findOne(
        match[0].match3.losingPlayer._id
      )

      let winData3 = {
        ...winPlayer,
        rank: winPlayer.rank + 1,
        matchesPlayed: winPlayer.matchesPlayed + 1,
        matchWin: winPlayer.matchWin + 1,
        gamesWon: match[0].match3.winnerGamesPlayed + winPlayer.gamesWon,
        gamesLoss: winPlayer.gamesLoss + match[0].match3.loserGamesPlayed,
      }

      let loserData3 = {
        ...losePlayer,
        rank: losePlayer.rank - 1,
        matchesPlayed: losePlayer.matchesPlayed + 1,
        matchLoss: losePlayer.matchLoss + 1,
        gamesWon: losePlayer.gamesWon + match[0].match3.winnerGamesPlayed,
        gamesLoss: losePlayer.gamesLoss + match[0].match3.loserGamesPlayed,
      }

      let winTeam = await teamService.findOne(match[0].match3.winningTeam._id)
      let loseTeam = await teamService.findOne(match[0].match3.losingTeam._id)

      if (match[0]?.match3.winningTeam._id === match[0]?.homeTeam._id) {
        let data = { ...winTeam, wins: winTeam.wins + 1 }
        await teamService.update(data)
      } else {
        let data = { ...winTeam, wins: winTeam.wins + 1 }
        await teamService.update(data)
      }
      if (match[0]?.match3.losingTeam._id === match[0]?.homeTeam._id) {
        let data = { ...loseTeam, loss: loseTeam.loss + 1 }
        await teamService.update(data)
      } else {
        let data = { ...loseTeam, loss: loseTeam.loss + 1 }
        await teamService.update(data)
      }
      playerService.update(winData3)
      playerService.update(loserData3)
      setSubmitMatch3Visible(false)
    }
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

  const handleCloseMatch = async (match) => {
    let tri1 = match[0]
    let tri2 = match[1]
    let data1 = await { ...tri1, completed: true }
    let data2 = await { ...tri2, completed: true }
    console.log(match)
    console.log(data1)
    console.log(data2)
    await triMatchService.update(data1)
    await triMatchService.update(data2)
  }

  const handleCloseDate = async (date) => {
    let dates = await scheduleService.index()
    let dateToHide = dates.filter(el=> el.name === date[0].date )
    console.log(dateToHide)
    let data = {...dateToHide[0], completed: true}
    scheduleService.update(data)
  }

  return (
    <>
      {!matchPairs?.length && (
        <h1 className="bracket center">No Matches to Display</h1>
      )}
      {matchPairs?.length > 0 && (
        <div className="bracket">
          {matchPairs?.map((match, idx) => (
            <>
             
              {/* {match[0]?.completed === true && (
                <button onClick={()=>handleCloseDate(match)}>Close out {match[0].date}? </button>
              )} */}
              {match[0]?.completed === false && (
                <div className="bracket" key={idx}>
                  {
                    // Match 1
                  }
                  <li>{match[0].date}</li>
                  Home Team : {match[0].homeTeam.teamName}
                  <br />
                  Visiting Team : {match[0].visitingTeam.teamName}
                  <br />
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
                      {match.length > 1 &&
                        isMatchGreen(match, 1) &&
                        submitMatch1Visible && (
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
                      {match.length > 1 &&
                        isMatchGreen(match, 2) &&
                        submitMatch2Visible && (
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
                      {match.length > 1 &&
                        isMatchGreen(match, 3) &&
                        submitMatch3Visible && (
                          <button onClick={() => handleSubmitMatch(3, match)}>
                            Submit Match 3
                          </button>
                        )}
                    </div>
                  </div>
                  Match submitted by : {match[0]?.submittedBy}{" "}
                  {match.length > 1 ? ` & ${match[1]?.submittedBy}` : ""}{" "}
                  <div>
                    <button onClick={() => handleCloseMatch(match)}>
                      Close out this match
                    </button>
                  </div>
                </div>
              )}
            </>
          ))}
        </div>
      )}
    </>
  )
}

export default MatchApproval
