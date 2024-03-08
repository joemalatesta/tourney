import * as styles from "./Landing.module.css"
const Landing = ({profile}) => {

  return (
  <>
  {profile?.accessLevel === 10 ?
  <h4 className={`${styles.center} ${styles.bracket} ${styles.textColorYellow}`} >Please be pateint {profile.firstName} while we approve you for this site.</h4>  
 :
  <main className={styles.center}>
      <h1 className={ `${styles.bracket} ${styles.textColorYellow}`}>
        Tavern's Wednesday Night 9 Ball
      </h1>
    </main>
}
  </>  
  )
}

export default Landing
