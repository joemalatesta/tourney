// import * as styles from "./Landing.module.css"
import image from '../../../public/break.gif'

const Landing = ({ profile }) => {
  return (
    <>
    <h1 className='center bracket'>Looks like something broke and nothing fell. This site is under maintenance!!</h1>
    <div className='center'>
      <img  src={image} alt="broken" />
    </div>
      {/* {profile?.accessLevel === 10 ? (
        <h4
          className={`${styles.center} ${styles.bracket} ${styles.textColorYellow}`}
        >
          Please be pateint {profile.firstName}, while we approve you for this
          site.
        </h4>
      ) : (
        <main className={`${styles.column} ${styles.center}`}>
          <h1 className={`${styles.bracket} ${styles.textColorYellow}`}>
            Tavern's Wednesday Night 9 Ball
          </h1>
          {/* <p className="bracket">
            The way this works, during the season players are rated on their
            games won and lost. They start as a lvl 50, when you win a match you
            go up one rank point and down one point when you lose.
            <br />
            To find the match race to win you take both players ranks and find
            the difference between them.
            <br />
            Ex: player 1 : rank 65 player 2 : rank 45
            <br />
            The difference is 20 between the two. Using the chart below find the
            person with the highest ranking chart in the example player 1 is 65.
            you would go to the 3rd chart. find the range that the difference
            falls into (20) and find the game race in our example it would be
            the third range 19-29 therefore it will be a 5:3 race the higher
            ranked player would be the first number of games and lower ranked
            player second number of games in our example Player 1 will need to
            win 5 games to player 2s 3 games
            <br />
            <br />
            <br />
          </p>
          <div className={`${styles.fWrap}`}>

            <div className={`${styles.bracket} ${styles.column}`}>
              highest skill level 0-39
              <br />
              difference match race
              <br />
              0-10 3:3
              <br />
              11 & up 3:2
              <br />
            </div>
            <br />
            <div className={`${styles.bracket} ${styles.column}`}>
              highest skill level 40-49
              <br />
              0-10 3:3
              <br />
              11-26 3:2
              <br />
              27-49 4:2
              <br />
            </div>
            <br />
            <div className={`${styles.bracket} ${styles.column}`}>
              highest skill level 50-69
              <br />
              0-6 4:4
              <br />
              7-18 4:3
              <br />
              19-29 5:3
              <br />
              30-39 4:2
              <br />
              40-48 5:2
              <br />
              49-68 6:2
              <br />
              69 5:2
              <br />
            </div>
            <br />
            <div className={`${styles.bracket} ${styles.column}`}>
              highest skill level 70-89 <br />
              0-5 5:5 <br />
              6-14 5:4 <br />
              15-21 6:4
              <br />
              22-28 5:3
              <br />
              29-36 6:3
              <br />
              37-46 7:3
              <br />
              47-56 6:2
              <br />
              57-62 7:2
              <br />
              63-82 8:2
              <br />
              83-89 7:2
              <br />
            </div>
            <br />
            <div className={`${styles.bracket} ${styles.column}`}>
              highest skill level 90 & up
              <br />
              0-4 6:6
              <br />
              5-11 6:5
              <br />
              12-17 7:5
              <br />
              18-22 6:4
              <br />
              23-28 7:4
              <br />
              29-35 8:4
              <br />
              36-42 7:3
              <br />
              43-48 8:3
              <br />
              49-58 9:3
              <br />
              59-68 8:2
              <br />
              69-74 9:2
              <br />
              75-93 10:2
              <br />
              94-112 9:2
              <br />
              113 & up 10:2
            </div>
          </div>
          <br /> 
        </main>
      )} */}
    </>
  )
}

export default Landing
