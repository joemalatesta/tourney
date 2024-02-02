const PlayerName = (props) => {
  return (
    <>
      <div>
        {props.player.name} : {props.player.rank}
      </div>
    </>
  );
};

export default PlayerName;
