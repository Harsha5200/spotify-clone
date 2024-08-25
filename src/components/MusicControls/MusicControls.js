import React from 'react';
import './MusicControls.css';

function MusicControls({ isPlaying, onPlayPause, onPrevious, onNext }) {
  return (
    <div className="music-controls">
      <button onClick={onPrevious}>Previous</button>
      <button onClick={onPlayPause}>{isPlaying ? 'Pause' : 'Play'}</button>
      <button onClick={onNext}>Next</button>
    </div>
  );
}

export default MusicControls;