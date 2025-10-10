import SingleMatch from "../SingleMatch/SingleMatch";
import CompletedMatch from "../../components/CompletedMatch/CompletedMatch";
import { useState } from "react";

const MatchLayout = (props) => {
  const [currentMatch1] = useState(props?.sessionInfo?.match1);
  const [currentMatch2] = useState(props?.sessionInfo?.match2);
  const [currentMatch3] = useState(props?.sessionInfo?.match3);

  const handleCancel = () => {};
  const handleUpdateMatch = () => console.log("Match updated");

  // ✅ Helper: determine if match has started
  const hasMatchStarted = (match) => {
    if (!match) return false;
    // Adjust these if your SingleMatch stores checkbox arrays differently
    return (
      (match.checkedPlayer1Checkboxes &&
        match.checkedPlayer1Checkboxes.some((c) => c === true)) ||
      (match.checkedPlayer2Checkboxes &&
        match.checkedPlayer2Checkboxes.some((c) => c === true))
    );
  };

  // ✅ Helper: determine if this match is currently active
  const isMatchActive = (matchNumber) => {
    const info = props?.sessionInfo;
    if (!info) return false;
    switch (matchNumber) {
      case 1:
        return (
          info?.match1 &&
          info?.match1Completed === false &&
          props.currentProfile !== "NONE"
        );
      case 2:
        return (
          info?.match2 &&
          info?.match2Completed === false &&
          props.currentProfile !== "NONE"
        );
      case 3:
        return (
          info?.match3 &&
          info?.match3Completed === false &&
          props.currentProfile !== "NONE"
        );
      default:
        return false;
    }
  };

  return (
    <>
      {/* === MATCH 3 === */}
      {isMatchActive(3) && (
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

      {/* === MATCH 2 === */}
      {isMatchActive(2) && (
        <>
          <h2 className="center bracket w300">Match 2</h2>
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

      {/* === MATCH 1 === */}
      {isMatchActive(1) && (
        <>
          <h2 className="center bracket w300">Match 1</h2>
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
        </>
      )}

      {/* === MATCH STATUS MESSAGES === */}
      {!props?.sessionInfo?.match1Completed &&
        !isMatchActive(1) &&
        (props.currentProfile === "NONE" || !hasMatchStarted(currentMatch1)) && (
          <div className="bracket">Match 1 has not been completed.</div>
        )}

      {!props?.sessionInfo?.match2Completed &&
        !isMatchActive(2) &&
        (props.currentProfile === "NONE" || !hasMatchStarted(currentMatch2)) && (
          <div className="bracket">Match 2 has not been completed.</div>
        )}

      {!props?.sessionInfo?.match3Completed &&
        !isMatchActive(3) &&
        (props.currentProfile === "NONE" || !hasMatchStarted(currentMatch3)) && (
          <div className="bracket">Match 3 has not been completed.</div>
        )}

      {/* === COMPLETED MATCHES === */}
      {props?.sessionInfo?.match1Completed && (
        <div className="bracket">
          MATCH 1
          <CompletedMatch currentMatch={currentMatch1} />
        </div>
      )}

      {props?.sessionInfo?.match2Completed && (
        <div className="bracket">
          MATCH 2
          <CompletedMatch currentMatch={currentMatch2} />
        </div>
      )}

      {props?.sessionInfo?.match3Completed && (
        <div className="bracket">
          MATCH 3
          <CompletedMatch currentMatch={currentMatch3} />
        </div>
      )}
    </>
  );
};

export default MatchLayout;
