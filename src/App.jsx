import React from 'react';
import MagicBentoBackground from './components/MagicBentoBackground';
import DarkVeil from './components/DarkVeil';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PlayerProvider } from './contexts/PlayerContext';
import Player from './components/Player';
import { useState } from 'react';
// import NowPlaying from './components/NowPlaying';
import Home from './pages/Home';
import Browse from './pages/Browse';
import Playlist from './pages/Playlist';
import Track from './pages/Track';
import About from './pages/About';
import Blog from './pages/Blog';

import { usePlayer } from './contexts/PlayerContext';

function App() {
  const { currentTrack } = usePlayer();
  const [showContentBar, setShowContentBar] = useState(false);
  return (
    <>
      <div style={{ position: 'fixed', inset: 0, zIndex: 1, width: '100vw', height: '100vh', pointerEvents: 'none' }}>
        {/* Backgrounds removed as requested */}
      </div>
      <Router>
        <div className="min-h-screen flex flex-col bg-premium-gradient text-premium-cream pb-20 relative transition-colors duration-500">
          <Routes>
            <Route path="/" element={<Home showBar={showContentBar} setShowBar={setShowContentBar} />} />
            <Route path="/browse" element={<Browse showBar={showContentBar} setShowBar={setShowContentBar} />} />
            <Route path="/playlist/:tag" element={<Playlist showBar={showContentBar} setShowBar={setShowContentBar} />} />
            <Route path="/track/:id" element={<Track showBar={showContentBar} setShowBar={setShowContentBar} />} />
            <Route path="/about" element={<About showBar={showContentBar} setShowBar={setShowContentBar} />} />
            <Route path="/blog" element={<Blog showBar={showContentBar} setShowBar={setShowContentBar} />} />
          </Routes>
          {/* <NowPlaying track={currentTrack} /> */}
          {showContentBar && <Player showContentBar={showContentBar} setShowContentBar={setShowContentBar} />}
        </div>
      </Router>
    </>
  );
}

export default App;
