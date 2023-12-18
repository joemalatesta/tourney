const PlayerName = (props) => {
  console.log(props.player);
  return ( 
    <>
      <div>{props.player.name} : {props.player.rank}</div>
    </>
   );
}
 
export default PlayerName;