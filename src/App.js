import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Player from './components/Player/Player';
import SongList from './components/SongList/SongList';
import SearchBar from './components/SearchBar/SearchBar';
import './App.css';

function App() {
  const [songs, setSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('For You');
  const [volume, setVolume] = useState(1);

  const spotifyLogoUrl = "https://imgs.search.brave.com/xQJr1uBRzyPt78TlebAu-8j_CI_UKGEKMweOkLgtmuI/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly93d3cu/bG9nby53aW5lL2Ev/bG9nby9TcG90aWZ5/L1Nwb3RpZnktV2hp/dGUtRGFyay1CYWNr/Z3JvdW5kLUxvZ28u/d2luZS5zdmc";
  const userProfilePicUrl = "https://imgs.search.brave.com/Z7Td3G9iduuwme-pPu22Ww0pzK2gGGxUfu4A_sS3B7Y/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA1LzUzLzg3LzM1/LzM2MF9GXzU1Mzg3/MzU5MV9OVjBoeTJw/SlR6a2d4QXNVVjFz/ZkV2T3BEMFJ1d0R5/MS5qcGc";

  useEffect(() => {
    fetchSongs();
  }, []);

  const fetchSongs = async () => {
    try {
      const response = await axios.get('https://cms.samespace.com/items/songs');
      setSongs(response.data.data);
      setCurrentSong(response.data.data[0]);
    } catch (error) {
      console.error('Error fetching songs:', error);
    }
  };

  const filteredSongs = songs.filter(song =>
    song.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    song.artist.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const topTracks = songs.filter(song => song.top_track);

  return (
    <div className="App" style={{ backgroundColor: currentSong?.accent }}>
      <div className="main-container">
        <div className="left-panel">
          <img src={spotifyLogoUrl} alt="Spotify" className="spotify-logo" />
          <SearchBar setSearchTerm={setSearchTerm} />
          <div className="tabs">
            <button
              className={activeTab === 'For You' ? 'active' : ''}
              onClick={() => setActiveTab('For You')}
            >
              For You
            </button>
            <button
              className={activeTab === 'Top Tracks' ? 'active' : ''}
              onClick={() => setActiveTab('Top Tracks')}
            >
              Top Tracks
            </button>
          </div>
          <SongList
            songs={activeTab === 'For You' ? filteredSongs : topTracks}
            setCurrentSong={setCurrentSong}
            currentSong={currentSong}
            setIsPlaying={setIsPlaying}
          />
          <img src={userProfilePicUrl} alt="User" className="user-profile-pic" />
        </div>
        <Player
          currentSong={currentSong}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          songs={songs}
          setCurrentSong={setCurrentSong}
          volume={volume}
          setVolume={setVolume}
        />
      </div>
    </div>
  );
}

export default App;
