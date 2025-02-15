const CompletedMatch = (currentMatch) => {
  let match = currentMatch.currentMatch
  const findWins = (arr) => {
    return arr?.filter((el) => el === true).length
  }

  console.log(match);

  return (
    <>
      <br />
      Games won
      <div>
        {match?.player1.name} -- {findWins(match?.player1Wins)}  {match.player1._id == match.winningPlayer._id? "WINNER": ""}
      </div>
      <div>
        {match?.player2.name} -- {findWins(match?.player2Wins)} {match.player2._id == match.winningPlayer._id? "WINNER": ""}
      </div>
    </>
  )
}

export default CompletedMatch
