


import React, { useState, useRef } from 'react';
import { FaPlay, FaPause, FaStepForward, FaStepBackward, FaList, FaClock, FaWaveSquare } from 'react-icons/fa';
import Iridescence from './Iridescence';
import TimerModal from './TimerModal';
import Visualizer from './Visualizer';
import { usePlayer } from '../contexts/PlayerContext';
import ElectricBorder from './ElectricBorder';

const Player = ({ showContentBar, setShowContentBar }) => {
  // Utility to format seconds as mm:ss
  function formatTime(seconds) {
    if (isNaN(seconds) || seconds == null) return '0:00';
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  }
  const {
    currentTrack,
    isPlaying,
    play,
    pause,
    playNext,
    playPrev,
    seekTo,
    setVolume,
    currentTime,
    duration,
    volume,
    loop,
    setLoop,
    shuffle,
    setShuffle,
    currentPlaylist
  } = usePlayer();

  // Ref to prevent duplicate notifications
  const lastPlayedTrackId = useRef(null);

  // Notify backend when a new track is played
  const notifyTrackPlayed = async (track) => {
    if (!track) return;
    // Prevent duplicate notifications for the same track
    if (lastPlayedTrackId.current === track.id) return;
    lastPlayedTrackId.current = track.id;
    try {
      await fetch('http://localhost:4000/api/track-played', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ track })
      });
    } catch (err) {
      // Optionally handle error
      // console.error('Failed to notify backend of track play', err);
    }
  };
  const [timerOpen, setTimerOpen] = useState(false);
  const [visualizerOpen, setVisualizerOpen] = useState(false);
  const [showBorderLayers, setShowBorderLayers] = useState(true);
  // loop and shuffle state now come from context

  // ...existing code...
  return (
    <>
      <div className="fixed bottom-0 left-0 w-full z-50 flex justify-center items-end pointer-events-none">
        <ElectricBorder color="#7df9ff" speed={1} chaos={0.5} thickness={2} showLayers={showBorderLayers} showContent={showContentBar} style={{ borderRadius: 16, width: '100%', maxWidth: 600, margin: 16, pointerEvents: 'auto', boxShadow: '0 2px 16px #0002', position: 'relative' }}>
          {showContentBar && (
            <div className="flex flex-col items-center px-4 py-2" role="region" aria-label="Audio Player">
            {/* Track Info */}
            <div className="flex items-center gap-4 mb-2">
              <div>
                <div className="font-semibold">{currentTrack ? currentTrack.title : 'No track selected'}</div>
                <div className="text-xs text-gray-500">{currentTrack ? currentTrack.artist || '' : ''}</div>
              </div>
            </div>
            {/* Controls */}
            <div className="flex items-center gap-4 mb-2">
              <button
                className={`p-2 rounded-full bg-gradient-to-tr from-pink-400 via-yellow-300 to-orange-400 text-white shadow-lg border-2 border-white ${loop ? 'ring-4 ring-pink-200' : ''}`}
                aria-label="Loop"
                title="Loop"
                onClick={() => setLoop(l => !l)}
                tabIndex={0}
                onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') setLoop(l => !l); }}
              >
                <span className="text-lg">&#128257;</span>
              </button>
              <button
                className={`p-2 rounded-full bg-gradient-to-tr from-green-400 via-blue-300 to-purple-400 text-white shadow-lg border-2 border-white ${shuffle ? 'ring-4 ring-green-200' : ''}`}
                aria-label="Shuffle"
                title="Shuffle"
                onClick={() => setShuffle(s => !s)}
                tabIndex={0}
                onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') setShuffle(s => !s); }}
              >
                <span className="text-lg">&#128256;</span>
              </button>
              <button
                className="p-2 rounded-full bg-gradient-to-tr from-blue-400 via-cyan-300 to-teal-400 text-white shadow-lg border-2 border-white hover:scale-110 transition"
                aria-label="Previous Track"
                title="Previous Track"
                onClick={playPrev}
                disabled={!currentTrack || !currentPlaylist || currentPlaylist.length < 2}
                tabIndex={0}
                onKeyDown={e => { if ((e.key === 'Enter' || e.key === ' ') && !e.target.disabled) playPrev(); }}
              >
                <FaStepBackward className="text-xl" />
              </button>
              <div className="relative flex items-center justify-center">
                <div className="absolute inset-0 w-14 h-14 pointer-events-none rounded-full overflow-hidden">
                  <Iridescence
                    color={[1,0.9,0.7]}
                    speed={isPlaying ? 2.2 : 0.5}
                    amplitude={isPlaying ? 0.28 : 0.08}
                    mouseReact={false}
                  />
                  {/* Circular progress bar overlay */}
                  {duration > 0 && (
                    <svg
                      className="absolute top-0 left-0 w-full h-full"
                      viewBox="0 0 56 56"
                      style={{ pointerEvents: 'none' }}
                    >
                      <circle
                        cx="28" cy="28" r="25"
                        fill="none"
                        stroke="#fff8"
                        strokeWidth="4"
                        opacity="0.3"
                      />
                      <circle
                        cx="28" cy="28" r="25"
                        fill="none"
                        stroke="#7df9ff"
                        strokeWidth="4"
                        strokeDasharray={2 * Math.PI * 25}
                        strokeDashoffset={2 * Math.PI * 25 * (1 - (currentTime / duration))}
                        style={{ transition: 'stroke-dashoffset 0.3s linear' }}
                      />
                    </svg>
                  )}
                </div>
                <button
                  className="relative z-10 p-2 w-14 h-14 flex items-center justify-center bg-gradient-to-tr from-yellow-400 via-pink-400 to-red-400 text-white rounded-full shadow-lg border-2 border-white hover:scale-110 transition text-2xl"
                  aria-label={isPlaying ? 'Pause' : 'Play'}
                  title={isPlaying ? 'Pause' : 'Play'}
                  onClick={async () => {
                    if (!currentTrack) return;
                    if (isPlaying) {
                      pause();
                    } else {
                      play(currentTrack);
                      await notifyTrackPlayed(currentTrack);
                    }
                  }}
                  disabled={!currentTrack}
                  tabIndex={0}
                  onKeyDown={async e => {
                    if ((e.key === 'Enter' || e.key === ' ') && !e.target.disabled) {
                      if (!currentTrack) return;
                      if (isPlaying) {
                        pause();
                      } else {
                        play(currentTrack);
                        await notifyTrackPlayed(currentTrack);
                      }
                    }
                  }}
                >
                  {isPlaying ? <FaPause className="text-3xl text-white drop-shadow" /> : <FaPlay className="text-3xl text-white drop-shadow" />}
                </button>
              </div>
              <button
                className="p-2 rounded-full bg-gradient-to-tr from-purple-400 via-indigo-300 to-blue-400 text-white shadow-lg border-2 border-white hover:scale-110 transition"
                aria-label="Next Track"
                title="Next Track"
                onClick={playNext}
                disabled={!currentTrack || !currentPlaylist || currentPlaylist.length < 2}
                tabIndex={0}
                onKeyDown={e => { if ((e.key === 'Enter' || e.key === ' ') && !e.target.disabled) playNext(); }}
              >
                <FaStepForward className="text-xl" />
              </button>
            </div>
            {/* Seek Slider */}
            <div className="flex items-center gap-2 w-full max-w-md mb-2">
              <span className="text-xs">{formatTime(currentTime)}</span>
              <input
                type="range"
                min={0}
                max={duration || 0}
                value={currentTime}
                onChange={e => seekTo(Number(e.target.value))}
                className="flex-1"
                disabled={!currentTrack}
              />
              <span className="text-xs">{formatTime(duration)}</span>
            </div>
            {/* Volume Slider */}
            <div className="flex items-center gap-2 w-full max-w-xs">
              <span className="text-xs">🔉</span>
              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={volume}
                onChange={e => setVolume(Number(e.target.value))}
                className="flex-1"
              />
              <span className="text-xs">🔊</span>
            </div>
            {/* Actions */}
            <div className="flex items-center gap-3 mt-2">
              <button className="p-2 rounded-full bg-gradient-to-tr from-green-400 via-blue-300 to-purple-400 text-white shadow-lg border-2 border-white hover:scale-110 transition" title="Timer" aria-label="Open Timer" onClick={() => setTimerOpen(true)}><FaClock className="text-lg" /></button>
              <button className="p-2 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-400 to-red-400 text-white shadow-lg border-2 border-white hover:scale-110 transition" title="Visualizer" aria-label="Open Visualizer" onClick={() => setVisualizerOpen(true)}><FaWaveSquare className="text-lg" /></button>
            </div>
          </div>
          )}
        </ElectricBorder>
      </div>
      <TimerModal open={timerOpen} onClose={() => setTimerOpen(false)} />
      <Visualizer open={visualizerOpen} onClose={() => setVisualizerOpen(false)} />
    </>
  );
}

export default Player;
