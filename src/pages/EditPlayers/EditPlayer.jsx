import { useState, useRef, useEffect } from "react"
import AllPlayers from "../../components/players/AllPlayers"
import * as styles from "./EditPlayers.module.css"

const EditPlayer = (props) => {
  const formElement = useRef()
  const playerNameInput = useRef()
  const [validForm, setValidForm] = useState(false)
  const [title, setTitle] = useState("Add Players")
  const [formData, setFormData] = useState({
    name: "",
    rank: 0,
    matchesPlayed: 0,
    matchWin: 0,
    matchLoss: 0,
    gamesWon: 0,
    gamesLoss: 0,
  })

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value })
  }

  useEffect(() => {
    formElement.current.checkValidity()
      ? setValidForm(true)
      : setValidForm(false)
  }, [formData])

  const handleSubmit = (evt) => {
    evt.preventDefault()
    if (title === "Add Players") {
      props.handleAddPlayer(formData)
      setFormData({ name: "", rank: 0, matchesPlayed: 0 })
      playerNameInput.current.focus()
    }
    if (title === "Edit Player") {
      props.handleEditPlayer(formData)
      setFormData({ name: "", rank: 0, matchesPlayed: 0 })
      setTitle("Add Players")
    }
  }

  const changeTitle = () => {
    setTitle("Edit Player")
  }

  let form = <form
  autoComplete="off"
  ref={formElement}
  onSubmit={handleSubmit}
>
    <label >
      Players Name (required)
    </label>
    <input
      type="text"
      name="name"
      value={formData.name}
      onChange={handleChange}
      required
      ref={playerNameInput}
    /><br/>
    <label >Players Rank</label>
    <input
      type="number"
      name="rank"
      value={formData.rank}
      onChange={handleChange}
    /><br/>
    <label>Matches Played</label>
    <input
      type="number"
      name="matchesPlayed"
      value={formData.matchesPlayed}
      onChange={handleChange}
    /><br/>
    <label >Players Match Wins</label>
    <input
      type="number"
      name="matchWin"
      value={formData.matchWin}
      onChange={handleChange}
    /><br/>
    <label >Players Match Losses</label>
    <input
      type="number"
      name="matchLoss"
      value={formData.matchLoss}
      onChange={handleChange}
    /><br/>
    <label >Players Games Won</label>
    <input
      type="number"
      name="gamesWon"
      value={formData.gamesWon}
      onChange={handleChange}
    /><br/>
    <label >Players Games Loss</label>
    <input
      type="number"
      name="gamesLoss"
      value={formData.gamesLoss}
      onChange={handleChange}
    /><br/>

 
    <button type="submit" disabled={!validForm}>
      {title}
    </button>
  
</form>

  return (
    <div className={`${styles.bracket} ${styles.greenFelt}`}>
      <h1 className={styles.center}>Player Management</h1>
      <h2 className={styles.center}>{title}</h2>
      <form
        className={styles.center}
        autoComplete="off"
        ref={formElement}
        onSubmit={handleSubmit}
      >
        <div className={styles.center}>
          <label className={styles.center}>
            Players Name (unique required)
          </label>
          <input
            className={styles.center}
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            ref={playerNameInput}
          />
        </div>
        <div className={styles.center}>
          <label className={styles.center}>Players Rank</label>
          <input
            type="number"
            className={styles.center}
            name="rank"
            value={formData.rank}
            onChange={handleChange}
          />
        </div>
        <div className={styles.center}>
          <label className={styles.center}>Matches Played</label>
          <input
            type="number"
            className={styles.center}
            name="matchesPlayed"
            value={formData.matchesPlayed}
            onChange={handleChange}
          />
        </div>
        <div className={styles.center}>
          <label className={styles.center}>Players Match Wins</label>
          <input
            type="number"
            className={styles.center}
            name="matchWin"
            value={formData.matchWin}
            onChange={handleChange}
          />
        </div>
        <div className={styles.center}>
          <label className={styles.center}>Players Match Losses</label>
          <input
            type="number"
            className={styles.center}
            name="matchLoss"
            value={formData.matchLoss}
            onChange={handleChange}
          />
        </div>
        <div className={styles.center}>
          <label className={styles.center}>Players Games Won</label>
          <input
            type="number"
            className={styles.center}
            name="gamesWon"
            value={formData.gamesWon}
            onChange={handleChange}
          />
        </div>
        <div className={styles.center}>
          <label className={styles.center}>Players Games Loss</label>
          <input
            type="number"
            className={styles.center}
            name="gamesLoss"
            value={formData.gamesLoss}
            onChange={handleChange}
          />
        </div>
        <div className={styles.center}>
          <button type="submit" disabled={!validForm}>
            {title}
          </button>
        </div>
      </form>
      <AllPlayers
        title={title}
        handleDeletePlayer={props.handleDeletePlayer}
        setFormData={setFormData}
        changeTitle={changeTitle}
        players={props.players}
        form = {form}
      />
      <p>{props.players.length} players</p>
    </div>
  )
}

export default EditPlayer
