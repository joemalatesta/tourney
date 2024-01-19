import SingleMatch from './SingleMatch';

const Bracket = ({matches}) => {


  return (
    <>
      {matches?.map((match, idx) => (
        <SingleMatch
          match={match}
          key={idx}
        />
      ))}
    </>
  )
}

export default Bracket