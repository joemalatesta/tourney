import SingleMatch from './SingleMatch';

const Bracket = ({round}) => {

 console.log(round)
  return (
    <>
      {round?.map((match, idx) => (
        <SingleMatch
          match={match}
          key={idx}
        />
      ))}
    </>
  )
}

export default Bracket