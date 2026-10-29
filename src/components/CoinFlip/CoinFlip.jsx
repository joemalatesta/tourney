
import { useState } from "react"
import styles from "./CoinFlip.module.css"
import heads from "../../../public/IndianHEADS.png"
import tails from "../../../public/IndianTAILS.png"

const CoinFlip = () => {
  const [side, setSide] = useState("heads")
  const [flipping, setFlipping] = useState(false)

  const flipCoin = () => {
    if (flipping) return

    setFlipping(true)

    const result = Math.random() < 0.5 ? "heads" : "tails"

    setTimeout(() => {
      setSide(result)
      setFlipping(false)
    }, 1000)
  }

  return (
    <div
      className={`${styles.coinContainer} ${styles.center}`}
      onClick={flipCoin}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault()
          flipCoin()
        }
      }}
      aria-label="Flip coin"
      style={{ cursor: flipping ? "default" : "pointer" }}
    >
      <div className={`${styles.coin} ${flipping ? styles.flip : ""}`}>
        <img
          src={side === "heads" ? heads : tails}
          alt={side}
          className={styles.coinFace}
        />
      </div>

      <h2>{flipping ? "Flipping..." : "Click the coin to flip!"}</h2>

      {!flipping && (
        <h3>Result: {side.toUpperCase()}</h3>
      )}
    </div>
  )
}

export default CoinFlip