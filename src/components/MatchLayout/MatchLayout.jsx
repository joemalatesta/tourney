import SingleMatch from "../SingleMatch/SingleMatch"
import CompletedMatch from "../../components/CompletedMatch/CompletedMatch"
import { useState } from "react"

const MatchLayout = (props) => {

  const [currentMatch1] = useState(props.sessionInfo?.match1)
  const [currentMatch2] = useState(props.sessionInfo?.match2)
  const [currentMatch3] = useState(props.sessionInfo?.match3)
  const handleCancel = () => {}

  const handleUpdateMatch = () => {
    console.log("yup")
  }

  return (
    <>
      {props?.sessionInfo?.match3 != null &&
        props.currentProfile !== "NONE" && (
          <>
            <h2 className="center bracket w300">Match 3</h2>
            <SingleMatch
              tableId={props?.sessionInfo}
              currentProfile={props?.currentProfile}
              homeTeam={props?.sessionInfo?.homeTeam}
              awayTeam={props?.sessionInfo?.awayTeam}
              handleUpdateMatch={handleUpdateMatch}
              currentMatch={props?.sessionInfo?.match3}
              currentMatchData={currentMatch3}
              profile={props.profile}
              handleCancel={handleCancel}
              mth="3"
              Key="3"
            />
          </>
        )}

      {props?.sessionInfo?.match2 != null &&
        props.currentProfile !== "NONE" && (
          <>
            <h2 className="center bracket w300 ">Match 2</h2>
            <SingleMatch
              tableId={props?.sessionInfo}
              currentProfile={props?.currentProfile}
              homeTeam={props?.sessionInfo?.homeTeam}
              awayTeam={props?.sessionInfo?.awayTeam}
              handleUpdateMatch={handleUpdateMatch}
              currentMatch={props?.sessionInfo?.match2}
              currentMatchData={currentMatch2}
              profile={props.profile}
              handleCancel={handleCancel}
              mth="2"
              Key="2"
            />
          </>
        )}

      {props?.sessionInfo?.match1 !== null &&
        props.currentProfile !== "NONE" && (
          <>
            <h2 className="center bracket w300 ">Match 1</h2>
            {
              <SingleMatch
                tableId={props?.sessionInfo}
                currentProfile={props?.currentProfile}
                homeTeam={props?.sessionInfo?.homeTeam}
                awayTeam={props?.sessionInfo?.awayTeam}
                handleUpdateMatch={handleUpdateMatch}
                currentMatch={props?.sessionInfo?.match1}
                currentMatchData={currentMatch1}
                profile={props.profile}
                handleCancel={handleCancel}
                mth="1"
                Key="1"
              />
            }
          </>
        )}

      {!currentMatch1?.match1Completed && props.currentProfile === "NONE" && (
        <>
          <div className="bracket">Match 1 has not been completed.</div>
        </>
      )}
      {!currentMatch2?.match2Completed && props.currentProfile === "NONE" && (
        <>
          <div className="bracket">Match 2 has not been completed.</div>
        </>
      )}
      {!currentMatch3?.match3Completed && props.currentProfile === "NONE" && (
        <>
          <div className="bracket">Match 3 has not been completed.</div>
        </>
      )}

      {currentMatch1?.match1Completed && (
        <>
          <div className="bracket">
            MATCH 1
            <CompletedMatch currentMatch={props.currentMatch?.match1} />
          </div>
        </>
      )}
      {currentMatch2?.match2Completed && (
        <>
          <div className="bracket">
            MATCH 2
            <CompletedMatch currentMatch={props.currentMatch?.match2} />
          </div>
        </>
      )}
      {currentMatch3?.match3Completed && (
        <>
          <div className="bracket">
            MATCH 3
            <CompletedMatch currentMatch={props.currentMatch?.match3} />
          </div>
        </>
      )}
    </>
  )
}

export default MatchLayout
