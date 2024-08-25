import React from 'react';
import './SongList.css';

function SongList({ songs, setCurrentSong, currentSong, setIsPlaying }) {
  const handleSongClick = (song) => {
    setCurrentSong(song);
    setIsPlaying(true);
  };

  return (
    <div className="song-list">
      {songs.map((song) => (
        <div
          key={song.id}
          className={`song-item ${currentSong?.id === song.id ? 'active' : ''}`}
          onClick={() => handleSongClick(song)}
        >
          <img
            src={`https://cms.samespace.com/assets/${song.cover}`}
            alt={song.name}
            className="song-cover"
          />
          <div className="song-info">
            <h3>{song.name}</h3>
            <p>{song.artist}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default SongList;
