import SingleMatch from "../SingleMatch/SingleMatch"
import CompletedMatch from "../../components/CompletedMatch/CompletedMatch"
// import * as playerStatService from "../../services/playerStatsService"

const MatchLayout = (props) => {
  const info = props.sessionInfo

  const hasMatchStarted = (match) => {
    if (!match) return false

    return [
      ...(match.player1WinsHome || []),
      ...(match.player2WinsHome || []),
      ...(match.player1WinsAway || []),
      ...(match.player2WinsAway || []),
    ].some((value) => value === true)
  }

  const isMatchActive = (number) => {
    if (!info) return false

    const match = info[`match${number}`]
    const completed = info[`match${number}Completed`]
    const canView =
      props.currentProfile === "HOME" ||
      props.currentProfile === "AWAY" ||
      props.currentProfile === "ADMIN"

    return Boolean(match && !completed && canView)
  }

  const renderMatch = (number) => {
    const match = info?.[`match${number}`]

    if (!match || typeof match !== "object") return null

    return (
      <div key={number}>
        <h2 className="center bracket w300">Match {number}</h2>

        <SingleMatch
          tableId={info}
          currentProfile={props.currentProfile}
          homeTeam={info.homeTeam}
          awayTeam={info.awayTeam}
          handleUpdateMatch={props.handleUpdateMatch}
          currentMatch={match}
          profile={props.profile}
          mth={String(number)}
        />
      </div>
    )
  }

  if (!info) return null
  const handlePlayerStatsUpdate = () => {
    console.log("hit button");
    
  }
  //   const handlePlayerStatsUpdate = async () => {
  //   await playerStatService.winningPlayer()
  //   await playerStatService.losingPlayer()
  // }

  console.log(props);
  

  return (
    <>
      {[3, 2, 1].map((number) =>
        isMatchActive(number) ? renderMatch(number) : null,
      )}

      {[1, 2, 3].map((number) => {
        const match = info[`match${number}`]
        const completed = info[`match${number}Completed`]

        if (completed) {
          return (
       
              <div className="bracket" key={`completed-${number}`}>
                MATCH {number}
                {match && typeof match === "object" ? (
                  <CompletedMatch currentMatch={match} />
                ) : (
                  <p>Loading completed match...</p>
                )}
              {Number(props?.profile?.accessLevel) == 90 &&
                props.sessionInfo.match1Completed === true &&
                props.sessionInfo.match2Completed === true &&
               props.sessionInfo.match3Completed === true && (
                  <button
                    onClick={handlePlayerStatsUpdate}
                  >
                    Submit Matches
                  </button>
                )}
              </div>
         
          )
        }

        if (
          !isMatchActive(number) &&
          (props.currentProfile === "NONE" ||
            props.currentProfile === "" ||
            !hasMatchStarted(match))
        ) {
          return (
            <div className="bracket" key={`status-${number}`}>
              Match {number} has not been completed.
            </div>
          )
        }

        return null
      })}
    </>
  )
}

export default MatchLayout
