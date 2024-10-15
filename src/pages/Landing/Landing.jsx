import * as styles from "./Landing.module.css"
import * as chart from "../../services/matchSkillLevels"

const Landing = ({ profile }) => {
  return (
    <>
    
      {profile?.accessLevel === 10 || profile?.accessLevel === null? (
        <h4
          className={`${styles.center} ${styles.bracket} ${styles.textColorYellow}`}
        >
          Please be pateint {profile.firstName}, while we approve you for this
          site.
        </h4>
      ) : (
        <>
          {profile && (
            <main className={`${styles.column} ${styles.center}`}>
              <h1 className={`${styles.bracket} ${styles.textColorYellow}`}>
                Tavern's Wednesday Night 9 Ball
              </h1>
              <div>0-39</div>
              <div className={`${styles.container} `}>
                <div className={styles.title}>Difference</div>
                <div className={styles.title}>Race</div>
                <div className={`${styles.gridRow}`}>
                  {chart.diff0To39.map((diff, idx) => (
                    <div className={styles.diff__race} key={idx}>
                      {diff}
                    </div>
                  ))}
                </div>
                <div className={`${styles.gridRow}`}>
                  {chart.race0To39.map((race, idx) => (
                    <div className={styles.diff__race} key={idx}>
                      {race}
                    </div>
                  ))}
                </div>
              </div>
              <div>40-49</div>
              <div className={`${styles.container} `}>
                <div className={styles.title}>Difference</div>
                <div className={styles.title}>Race</div>
                <div className={`${styles.gridRow}`}>
                  {chart.diff40To49.map((diff, idx) => (
                    <div className={styles.diff__race} key={idx}>
                      {diff}
                    </div>
                  ))}
                </div>
                <div className={`${styles.gridRow}`}>
                  {chart.race40To49.map((race, idx) => (
                    <div className={styles.diff__race} key={idx}>
                      {race}
                    </div>
                  ))}
                </div>
              </div>
              <div>50-69</div>
              <div className={`${styles.container} `}>
                <div className={styles.title}>Difference</div>
                <div className={styles.title}>Race</div>
                <div className={`${styles.gridRow}`}>
                  {chart.diff50To69.map((diff, idx) => (
                    <div className={styles.diff__race} key={idx}>
                      {diff}
                    </div>
                  ))}
                </div>
                <div className={`${styles.gridRow}`}>
                  {chart.race50To69.map((race, idx) => (
                    <div className={styles.diff__race} key={idx}>
                      {race}
                    </div>
                  ))}
                </div>
              </div>
              <div>70-89</div>
              <div className={`${styles.container} `}>
                <div className={styles.title}>Difference</div>
                <div className={styles.title}>Race</div>
                <div className={`${styles.gridRow}`}>
                  {chart.diff70To89.map((diff, idx) => (
                    <div className={styles.diff__race} key={idx}>
                      {diff}
                    </div>
                  ))}
                </div>
                <div className={`${styles.gridRow}`}>
                  {chart.race70To89.map((race, idx) => (
                    <div className={styles.diff__race} key={idx}>
                      {race}
                    </div>
                  ))}
                </div>
              </div>
              <div>90 & Up</div>
              <div className={`${styles.container} `}>
                <div className={styles.title}>Difference</div>
                <div className={styles.title}>Race</div>
                <div className={`${styles.gridRow}`}>
                  {chart.diff90AndUP.map((diff, idx) => (
                    <div className={styles.diff__race} key={idx}>
                      {diff}
                    </div>
                  ))}
                </div>
                <div className={`${styles.gridRow}`}>
                  {chart.race90AndUP.map((race, idx) => (
                    <div className={styles.diff__race} key={idx}>
                      {race}
                    </div>
                  ))}
                </div>
              </div>
            </main>
          )}
        </>
      )}
    </>
  )
}

export default Landing
