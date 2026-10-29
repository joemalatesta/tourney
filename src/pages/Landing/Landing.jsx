import { useState } from "react"
import * as styles from "./Landing.module.css"
import CoinFlip from "../../components/CoinFlip/CoinFlip"
import AdminNews from "../../components/AdminNewsAndInformation/AdminNews"

const Landing = ({ profile }) => {
  const [finished, setFinished] = useState(false)
  const [seeCoin, setSeeCoin] = useState(true)

  if (!profile) return null

  if (profile.accessLevel === 10 || profile.accessLevel == null) {
    return (
      <h4
        className={`${styles.center} ${styles.bracket} ${styles.textColorYellow}`}
      >
        Please be patient {profile.firstName}, while we approve you for this
        site.
      </h4>
    )
  }

  return (
    <>
      <AdminNews editable={false} />

      {seeCoin && (
        <CoinFlip
          currentProfile={profile.currentProfile}
          finished={finished}
          setFinished={setFinished}
          setSeeCoin={setSeeCoin}
        />
      )}
    </>
  )
}

export default Landing