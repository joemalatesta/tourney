import { useState, useEffect } from 'react'
import SingleMatchPlayerLine from './SingleMatchPlayerLine'
import * as playerService from '../../services/playerService'
import * as gameService from '../../services/gameServices'

const SingleMatch = (props) => {
  const [gamesNeeded, setGamesNeeded] = useState()
  const [isHidden, setIsHidden] = useState(false)
  const [playerInfo, setPlayerInfo] = useState()

  useEffect(() => {
    const getPlayerStats = async () => {
      try {
        const data = await Promise.all(props.match.map(player => playerService.findOne(player)))
        const updatedPlayerInfo = gameService.getFirstPlayer(data)
        
        setPlayerInfo(updatedPlayerInfo)
   
      } catch (error) {
        console.error("Error fetching player stats:", error)
      }
    }
    getPlayerStats()
  }, [props.match])

  const handleHideWinnerCheckbox = () => {
    setIsHidden(true)
  }

  useEffect(() => {
    const getGameRace = async () => {
      if (playerInfo && playerInfo.length === 2 && playerInfo.includes(!null)) {
        try {
          const data = await gameService.getGameRace(playerInfo[0], playerInfo[1]);
          setGamesNeeded(data)
        } catch (error) {
          console.error("Error fetching game race:", error)
        }
      }
    }
    getGameRace()
  }, [playerInfo])

  useEffect(() => {
    const addGamesNeeded = () => {
      if (playerInfo && gamesNeeded) {
        setPlayerInfo((prevPlayerInfo) => {
          if (
            prevPlayerInfo &&
            prevPlayerInfo.length === 2 &&
            prevPlayerInfo[0].games !== gamesNeeded[0] &&
            prevPlayerInfo[1].games !== gamesNeeded[1]
          ) {
            return [
              { ...prevPlayerInfo[0], games: gamesNeeded[0] },
              { ...prevPlayerInfo[1], games: gamesNeeded[1] },
            ];
          }
          return prevPlayerInfo;
        });
      }
    };
    addGamesNeeded();
  }, [gamesNeeded, playerInfo]);

  return (
    <>
      <div className="bracket">
        {playerInfo?.map((player, idx) => (
          <SingleMatchPlayerLine
            setMatchDetails={props.setMatchDetails}
            roundId={props.roundId}
            gameObj={props.gameObj}
            user={props.user}
            player={player}
            key={idx}
            gamesNeeded={gamesNeeded}
            setGamesNeeded={setGamesNeeded}
            isHidden={isHidden}
            handleHideWinnerCheckbox={handleHideWinnerCheckbox}
            setIsHidden={setIsHidden}
            handleUpdateMatch={props.handleUpdateMatch}
          />
        ))}
      </div>
    </>
  );
};

export default SingleMatch;
