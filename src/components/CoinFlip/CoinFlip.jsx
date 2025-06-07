import { useState } from "react"
import styles from "./CoinFlip.module.css"
import heads from "../../../public/IndianHEADS.png"
import tails from "../../../public/IndianTAILS.png"

const IndianHeadCoinFlip = (props) => {
  const [side, setSide] = useState("")
  const [flipping, setFlipping] = useState(false)
  const [awayChoice, setAwayChoice] = useState(null)

  const getAwayCoinChoice = (choice) => {
    if (choice == "heads") setAwayChoice("heads")
    if (choice == "tails") setAwayChoice("tails")
  }

  console.log(props.currentProfile)

  const flipCoin = () => {
    if (flipping) return

    setFlipping(true)
    const result = Math.random() < 0.5 ? "heads" : "tails"

    setTimeout(() => {
      setSide(result)
      setFlipping(false)
      props.setFinished(true)
      props.setSeeCoin(false)
    }, 1000)
  }

  console.log(side)

  return (
    <>
      {side === awayChoice && props.finished === true && (
        <>
          <h1>Away team wins flip!</h1>
          {side && !flipping && <p>Result: {side.toUpperCase()}</p>}
        </>
      )}
      {side !== awayChoice && props.finished === true && (
        <>
          <h1>Home Team Wins flip!</h1>
          {side && !flipping && <p>Result: {side.toUpperCase()}</p>}
        </>
      )}

      {props.finished !== true && (
        <div>
          {props.currentProfile === "AWAY" && props.finished === false && (
            <div className="bracket center">Please See Home team captain!</div>
          )}
          {props.currentProfile === "HOME" && (
            <>
              <div className={(styles.coinContainer, styles.center)}>
                <div
                  className={`${styles.coin} ${flipping ? styles.flip : ""}`}
                >
                  <img
                    src={side === "heads" ? heads : tails}
                    alt={side}
                    className={styles.coinFace}
                  />
                  {awayChoice !== null && props.finished === false && (
                    <button onClick={flipCoin} disabled={flipping}>
                      {flipping ? "Flipping..." : "Flip Coin"}
                    </button>
                  )}
                </div>

                <br />
                <br />
                <br />
              </div>
              <h2>Away team pick heads or tails</h2>
              <div className="row">
                <br />
                {awayChoice == null && (
                  <>
                    <button onClick={() => getAwayCoinChoice("heads")}>
                      Heads
                    </button>
                    <button onClick={() => getAwayCoinChoice("tails")}>
                      Tails
                    </button>
                  </>
                )}

                {awayChoice !== null && <h2>{awayChoice.toUpperCase()}</h2>}
              </div>
            </>
          )}
        </div>
      )}
    </>
  )
}

export default IndianHeadCoinFlip
