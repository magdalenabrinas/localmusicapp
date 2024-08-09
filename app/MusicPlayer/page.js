// MusicPlayer.js
import React, { useState, useEffect, useRef } from 'react';
import MusicDataSection from './MusicDataSection'; // Ensure this path is correct
import PlayerControls from './PlayerControls'; // Ensure this path is correct
import musicData from './musicData'; // Ensure this path is correct

const MusicPlayer = () => {
  const [currentMusic, setCurrentMusic] = useState(0);
  const [isShuffled, setIsShuffled] = useState(false);
  const audioRef = useRef(new Audio(musicData[0].musicPath));
  const [playerInfo, setPlayerInfo] = useState(musicData[0]);

  useEffect(() => {
    const audio = audioRef.current;
    audio.src = playerInfo.musicPath;
    audio.load();

    const handleAudioLoadedData = () => {
      setPlayerInfo(prev => ({
        ...prev,
        duration: audio.duration,
      }));
    };

    audio.addEventListener('loadeddata', handleAudioLoadedData);

    return () => {
      audio.removeEventListener('loadeddata', handleAudioLoadedData);
    };
  }, [playerInfo.musicPath]);

  useEffect(() => {
    const audio = audioRef.current;
    setPlayerInfo(musicData[currentMusic]);
    audio.src = musicData[currentMusic].musicPath;
  }, [currentMusic]);

  const playMusic = () => {
    const audio = audioRef.current;
    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
    }
  };

  const skipNext = () => {
    setCurrentMusic(prev => (isShuffled
      ? Math.floor(Math.random() * musicData.length)
      : (prev + 1) % musicData.length
    ));
  };

  const skipPrev = () => {
    setCurrentMusic(prev => (isShuffled
      ? Math.floor(Math.random() * musicData.length)
      : (prev - 1 + musicData.length) % musicData.length
    ));
  };

  const shuffle = () => {
    setIsShuffled(prev => !prev);
  };

  const repeat = () => {
    const audio = audioRef.current;
    audio.loop = !audio.loop;
  };

  const changeVolume = (event) => {
    const audio = audioRef.current;
    audio.volume = event.target.value;
  };

  const muteVolume = () => {
    const audio = audioRef.current;
    audio.muted = !audio.muted;
  };

  return (
    <div className="music-player flex flex-col min-h-screen">
      <div className="flex flex-1">
        <aside className="sidebar m-auto ml-10 bg-black text-white p-4">
          <MusicDataSection 
            currentMusic={currentMusic} 
            setCurrentMusic={setCurrentMusic} 
          />
        </aside>
        <main className="content flex-1 p-4">
          {/* Display picked item here */}
          {/* <div className="picked-item">
            <img 
              src={playerInfo.posterUrl} 
              width="300" 
              height="300" 
              alt={`${playerInfo.title} Album Poster`} 
            />
            <h1>{playerInfo.title}</h1>
            <p>{playerInfo.album} ({playerInfo.year})</p>
            <p>{playerInfo.artist}</p>
          </div> */}
        </main>
      </div>
      <footer className="player-controls bg-black text-white p-2">
        <PlayerControls 
          playerInfo={playerInfo}
          playMusic={playMusic}
          skipNext={skipNext}
          skipPrev={skipPrev}
          shuffle={shuffle}
          repeat={repeat}
          changeVolume={changeVolume}
          muteVolume={muteVolume}
        />
      </footer>
    </div>
  );
};

export default MusicPlayer;
