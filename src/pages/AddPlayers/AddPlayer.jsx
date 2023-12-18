import { useState, useRef, useEffect } from "react";
import AllPlayers from "../../components/players/AllPlayers";

const AddPlayer = (props) => {
  const formElement = useRef()
  const [validForm, setValidForm] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    rank: 0
  })

  const handleChange = evt => {
		setFormData({ ...formData, [evt.target.name]: evt.target.value })
  }

  useEffect(() => {
    formElement.current.checkValidity() ? setValidForm(true) : setValidForm(false)
  }, [formData])

  const handleSubmit = evt => {
    evt.preventDefault()
    props.handleAddPlayer(formData)
		setFormData({name: '', rank: 0})
  }

	return (
		<div className="match-bracket green-felt">
			<h1 className="center">Add/Remove Players</h1>
			<form className="center" autoComplete="off" ref={formElement} onSubmit={handleSubmit}>
				<div className="center">
					<label className="center">
						Players Name (unique required)
					</label>
					<input  
						className="center"
						type="text"
						name="name"
            value={formData.name}
            onChange={handleChange}
						required
					/>
				</div>
				<div className="center">
					<label className="center">
						Players Rank
					</label>
					<input 
						type="number"
						className="center"
						name="rank"
            value={formData.rank}
            onChange={handleChange}
					/>
				</div>
				<div className="center">
					<button
						type="submit"
            disabled={!validForm}
					>
						Add Player
					</button>
				</div>
			</form>
			<AllPlayers  handleDeletePlayer={props.handleDeletePlayer} players={props.players} />
		</div>
	)
}

export default AddPlayer;