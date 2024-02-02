// import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom";
import SingleMatch from "../../components/bracket/SingleMatch";
import Checkboxes from "../../components/checkboxes/Checkboxes";
const MatchView = () => {
  const location = useLocation()
  const matchInfo = location.state
  console.log(matchInfo.matchInfo)
  

  return (  
    <>
      <div className="bracket">
        <SingleMatch
          match={matchInfo.matchInfo}
        />
          <Checkboxes
          
          />
      </div>
    </>
  )
}
 
export default MatchView