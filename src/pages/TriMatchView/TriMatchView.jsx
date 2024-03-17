import SingleMatch from "../../components/SingleMatch/SingleMatch"
const TriMatchView = ({ matchId, profile, triMatch }) => {
  return (
    <>
      <h1>Match 1</h1>
      <SingleMatch
        profile={profile}
        match={triMatch.match1}
        matchId={matchId}
      />
      <h1>Match 2</h1>
      <SingleMatch
        profile={profile}
        match={triMatch.match2}
        matchId={matchId}
      />
      <h1>Match 3</h1>
      <SingleMatch
        profile={profile}
        match={triMatch.match3}
        matchId={matchId}
      />
    </>
  )
}

export default TriMatchView
