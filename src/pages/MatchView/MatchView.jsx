import { useNavigate } from "react-router-dom"
import SingleMatch from "../../components/SingleMatch/SingleMatch"

const MatchView = (props) => {
  const nav = useNavigate()
  return (
    <>
      <SingleMatch match={props.match} />

      <button onClick={() => nav("/view-tournaments")}>
        return to tourney
      </button>
    </>
  )
}

export default MatchView
