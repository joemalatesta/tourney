// import { useState, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom";
import SingleMatch from "../../components/bracket/SingleMatch";
const MatchView = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const matchInfo = location.state;

  return (
    <>
      <div
        className="flex bracket green-felt"
        style={{ justifyContent: "space-evenly" }}
      >
        <SingleMatch match={matchInfo.matchInfo} />
      </div>
      <button onClick={() => navigate("/view-tournaments")}>
        Back to tournaments
      </button>
    </>
  );
};

export default MatchView;
