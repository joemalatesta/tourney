const CompletedMatch = (matchData) => {
  let match = matchData

  return (
    <>
      <div>
        {match?.player1?.name}{" "}
        {match?.player1?._id == match?.winningPlayer?._id ? " -- WINNER" : ""}
      </div>
      <div>
        {match?.player2?.name}{" "}
        {match?.player2?._id == match?.winningPlayer?._id ? " -- WINNER" : ""}
      </div>
    </>
  )
}

export default CompletedMatch
