import React from 'react';
import musicData from './musicdata'; // Ensure this path is correct

const MusicDataSection = ({ currentMusic, setCurrentMusic }) => {
  return (
    <div className="music-data-container flex flex-col items-center p-4 mt-4">
      <div className="music-data flex flex-nowrap gap-6">
        {musicData.map((item, index) => (
          <button
            key={index}
            className={`music-item ${currentMusic === index ? "playing" : ""} transition-transform transform hover:scale-105`}
            onClick={() => setCurrentMusic(index)}
          >
            <img 
              src={item.posterUrl} 
              width="200"   // Adjusted width
              height="200"  // Adjusted height
              alt={`${item.title} Album Poster`} 
              className="img-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default MusicDataSection;
