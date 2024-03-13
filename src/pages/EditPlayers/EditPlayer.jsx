// import { useState, useRef, useEffect } from "react"
// import AllPlayers from "../../components/players/AllPlayers"
// import * as styles from "./EditPlayers.module.css"

// const EditPlayer = (props) => {
//   const formElement = useRef()
//   const [validForm, setValidForm] = useState(false)
//   const [title, setTitle] = useState("Add Players")
//   const [formData, setFormData] = useState({
//     name: "",
//     rank: 0,
//     matchesPlayed: 0,
//   })

//   const handleChange = (evt) => {
//     setFormData({ ...formData, [evt.target.name]: evt.target.value })
//   }

//   useEffect(() => {
//     formElement.current.checkValidity()
//       ? setValidForm(true)
//       : setValidForm(false)
//   }, [formData])

//   const handleSubmit = (evt) => {
//     evt.preventDefault()
//     if (title === "Add Players") {
//       props.handleAddPlayer(formData)
//       setFormData({ name: "", rank: 0, matchesPlayed: 0 })
//     }
//     if (title === "Edit Player") {
//       props.handleEditPlayer(formData)
//       setFormData({ name: "", rank: 0, matchesPlayed: 0 })
//       setTitle("Add Players")
//     }
//   }

//   const changeTitle = () => {
//     setTitle("Edit Player")
//   }

//   return (
//     <div className={`${styles.bracket} ${styles.greenFelt}`}>
//       <h1 className={styles.center}>Player Management</h1>
//       <h2 className={styles.center}>{title}</h2>
//       <form
//         className={styles.center}
//         autoComplete="off"
//         ref={formElement}
//         onSubmit={handleSubmit}
//       >
//         <div className={styles.center}>
//           <label className={styles.center}>
//             Players Name (unique required)
//           </label>
//           <input
//             className={styles.center}
//             type="text"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className={styles.center}>
//           <label className={styles.center}>Players Rank</label>
//           <input
//             type="number"
//             className={styles.center}
//             name="rank"
//             value={formData.rank}
//             onChange={handleChange}
//           />
//         </div>
//         <div className={styles.center}>
//           <button type="submit" disabled={!validForm}>
//             {title}
//           </button>
//         </div>
//       </form>
//       <AllPlayers
//         title={title}
//         handleDeletePlayer={props.handleDeletePlayer}
//         setFormData={setFormData}
//         changeTitle={changeTitle}
//         players={props.players}
//       />
//       <p>{props.players.length} players</p>
//     </div>
//   )
// }

// export default EditPlayer

import { useState, useRef, useEffect } from "react";
import AllPlayers from "../../components/players/AllPlayers";
import * as styles from "./EditPlayers.module.css";

const EditPlayer = (props) => {
  const formElement = useRef();
  const playerNameInput = useRef(); // Ref for the player name input field
  const [validForm, setValidForm] = useState(false);
  const [title, setTitle] = useState("Add Players");
  const [formData, setFormData] = useState({
    name: "",
    rank: 0,
    matchesPlayed: 0,
  });

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  useEffect(() => {
    formElement.current.checkValidity()
      ? setValidForm(true)
      : setValidForm(false);
  }, [formData]);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (title === "Add Players") {
      props.handleAddPlayer(formData);
      setFormData({ name: "", rank: 0, matchesPlayed: 0 });
      // Set focus on the player name input field
      playerNameInput.current.focus();
    }
    if (title === "Edit Player") {
      props.handleEditPlayer(formData);
      setFormData({ name: "", rank: 0, matchesPlayed: 0 });
      setTitle("Add Players");
    }
  };

  const changeTitle = () => {
    setTitle("Edit Player");
  };

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
          <label className={styles.center}>Players Name (unique required)</label>
          <input
            className={styles.center}
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            ref={playerNameInput} // Assign the ref to the input field
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
      />
      <p>{props.players.length} players</p>
    </div>
  );
};

export default EditPlayer;
