import SingleMatch from "../SingleMatch/SingleMatch"
import CompletedMatch from "../../components/CompletedMatch/CompletedMatch"
import { useState } from "react"

const MatchLayout = (props) => {
  const [currentMatch1, setCurrentMatch1] = useState(props.sessionInfo?.match1)
  const [currentMatch2, setCurrentMatch2] = useState(props.sessionInfo?.match2)
  const [currentMatch3, setCurrentMatch3] = useState(props.sessionInfo?.match3)
  const currentProfile = ""
  const currentMatchData = ""
  const handleCancel = () => {}

  const handleUpdateMatch = () => {
    console.log("yup")
  }

  console.log(props);
  

  return (
    <>
      {props?.sessionInfo?.match3  != null && (
        <>
          <h2 className="center bracket w300">Match 3</h2>
          <SingleMatch
            tableId={props.sessionInfo}
            currentProfile={currentProfile}
            homeTeam={currentMatch3?.homeTeam}
            awayTeam={currentMatch3?.awayTeam}
            player1={currentMatch3?.homeMatch3?.player1}
            player2={currentMatch3?.homeMatch3?.player2}
            handleUpdateMatch={handleUpdateMatch}
            player1Wins={currentMatch3?.homeMatch3?.player1Wins}
            player2Wins={currentMatch3?.homeMatch3?.player2Wins}
            currentMatch={currentMatch3?.homeMatch3}
            currentMatchData={currentMatchData}
            profile={props.profile}
            handleCancel={handleCancel}
            match={props.match3}
            mth="3"
            Key="3"
          />
        </>
      )}

      {props?.sessionInfo?.match2  != null && (
        <>
          <h2 className="center bracket w300 ">Match 2</h2>
          <SingleMatch
            tableId={currentMatch2}
            currentProfile={currentProfile}
            homeTeam={currentMatch2?.homeTeam}
            awayTeam={currentMatch2?.awayTeam}
            player1={currentMatch2?.homeMatch2?.player1}
            player2={currentMatch2?.homeMatch2?.player2}
            handleUpdateMatch={handleUpdateMatch}
            player1Wins={currentMatch2?.homeMatch2?.player1Wins}
            player2Wins={currentMatch2?.homeMatch2?.player2Wins}
            currentMatch={currentMatch2?.homeMatch2}
            currentMatchData={currentMatchData}
            profile={props.profile}
            handleCancel={handleCancel}
            match={props.match2}
            mth="2"
            Key="2"
          />
        </>
      )}

      {props?.sessionInfo?.match1 !== null && (
        <>
          <h2 className="center bracket w300 ">Match 1</h2>
          {
            <SingleMatch
              tableId={props.sessionInfo}
              currentProfile={currentProfile}
              homeTeam={props.match1?.homeTeam}
              awayTeam={props.match1?.awayTeam}
              player1={props.match1?.homeMatch1?.player1}
              player2={props.match1?.homeMatch1?.player2}
              handleUpdateMatch={handleUpdateMatch}
              player1Wins={props.match1?.homeMatch1?.player1Wins}
              player2Wins={props.match1?.homeMatch1?.player2Wins}
              currentMatch={props.match1?.homeMatch1}
              currentMatchData={currentMatchData}
              profile={props.profile}
              handleCancel={handleCancel}
              match={props.match1}
              mth="1"
              Key="1"
            />
          }
        </>
      )}

      {!currentMatch1?.match1Completed && currentProfile === "NONE" && (
        <>
          <div className="bracket">Match 1 has not been completed.</div>
        </>
      )}
      {!currentMatch2?.match2Completed && currentProfile === "NONE" && (
        <>
          <div className="bracket">Match 2 has not been completed.</div>
        </>
      )}
      {!currentMatch3?.match3Completed && currentProfile === "NONE" && (
        <>
          <div className="bracket">Match 3 has not been completed.</div>
        </>
      )}

      {currentMatch1?.match1Completed && (
        <>
          <div className="bracket">
            MATCH 1
            <CompletedMatch currentMatch={currentMatch?.awayMatch1} />
            <CompletedMatch currentMatch={passedMatch1} />
          </div>
        </>
      )}
      {currentMatch2?.match2Completed && (
        <>
          <div className="bracket">
            MATCH 2
            <CompletedMatch currentMatch={currentMatch?.awayMatch2} />
            <CompletedMatch currentMatch={passedMatch2} />
          </div>
        </>
      )}
      {currentMatch3?.match3Completed && (
        <>
          <div className="bracket">
            MATCH 3
            <CompletedMatch currentMatch={currentMatch?.awayMatch3} />
            <CompletedMatch currentMatch={passedMatch3} />
          </div>
        </>
      )}
    </>
  )
}

export default MatchLayout
