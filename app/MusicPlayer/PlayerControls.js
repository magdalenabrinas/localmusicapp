import React, { useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faChevronLeft, faChevronRight, faShuffle, faRepeat, faVolumeUp, faVolumeMute } from '@fortawesome/free-solid-svg-icons';

const PlayerControls = ({ playerInfo, playMusic, skipNext, skipPrev, shuffle, repeat, changeVolume, muteVolume }) => {
  const audioRef = useRef(new Audio(playerInfo.musicPath));

  React.useEffect(() => {
    audioRef.current.src = playerInfo.musicPath;
    audioRef.current.load();
  }, [playerInfo.musicPath]);

  return (
    <div className="flex flex-col items-center justify-center space-y-4 p-4">
      <div className="player-info text-center">
        <img 
          src={playerInfo.posterUrl} 
          width="300"   // Adjusted width
          height="300"  // Adjusted height
          alt={`${playerInfo.title} Album Poster`} 
          className="mb-4" // Margin bottom to separate from text
        />
        <h1 className="text-xl font-bold">{playerInfo.title}</h1>
        <p>{playerInfo.album} ({playerInfo.year})</p>
        <p>{playerInfo.artist}</p>
      </div>

      <div className="controls flex items-center space-x-4">
        <button onClick={playMusic} className="p-2">
          {audioRef.current.paused ? <FontAwesomeIcon icon={faPlay} className="h-6 w-6" /> : <FontAwesomeIcon icon={faPause} className="h-6 w-6" />}
        </button>
        <button onClick={skipPrev} className="p-2">
          <FontAwesomeIcon icon={faChevronLeft} className="h-6 w-6" />
        </button>
        <button onClick={skipNext} className="p-2">
          <FontAwesomeIcon icon={faChevronRight} className="h-6 w-6" />
        </button>
        <button onClick={shuffle} className="p-2">
          <FontAwesomeIcon icon={faShuffle} className="h-6 w-6" />
        </button>
        <button onClick={repeat} className="p-2">
          <FontAwesomeIcon icon={faRepeat} className="h-6 w-6" />
        </button>
        <input 
          type="range" 
          min="0" 
          max="1" 
          step="0.01" 
          onChange={changeVolume} 
          className="w-32" 
        />
        <button onClick={muteVolume} className="p-2">
          {audioRef.current.muted ? <FontAwesomeIcon icon={faVolumeMute} className="h-6 w-6" /> : <FontAwesomeIcon icon={faVolumeUp} className="h-6 w-6" />}
        </button>
      </div>
    </div>
  );
};

export default PlayerControls;
