import * as styles from './Team.module.css'

const Team = ({ teams, handleChooseTeam, title, team }) => {
  return (
    <>
      <h1 className={`${styles.bracket} ${styles.blueFelt}`}>{title}</h1>
      {team === null ? (
        teams.map((team) => (
          <div key={team._id}>
            <p onClick={() => handleChooseTeam(team, title)}>
              {team.teamName}
            </p>
          </div>
        ))
      ) : (
        <h1>{team.teamName}</h1>
      )}
    </>
  )
}

export default Team
