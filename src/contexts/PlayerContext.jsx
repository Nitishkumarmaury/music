import React, { createContext, useContext, useRef, useState, useEffect } from 'react';
import { playTrack as playAudio, pauseTrack as pauseAudio } from '../services/audioService';


const PlayerContext = createContext();

export const usePlayer = () => useContext(PlayerContext);

export const PlayerProvider = ({ children }) => {

  const [state, setState] = useState({
    isPlaying: false,
    currentTrack: null,
    currentPlaylist: [],
    currentIndex: -1,
    volume: 1,
    duration: 0,
    currentTime: 0,
  });
  const audioRef = useRef(null);

  // Play a track, optionally with a playlist and index
  const play = (track, playlist = null, index = null) => {
    if (audioRef.current) {
      audioRef.current.src = track.url;
      audioRef.current.play();
    }
    setState(s => {
      // Only update currentPlaylist if a new playlist is explicitly provided
      const newPlaylist = playlist ? playlist : s.currentPlaylist;
      let newIndex = index;
      if (newIndex === null || newIndex === undefined) {
        newIndex = newPlaylist.findIndex(t => t.id === track.id);
      }
      return {
        ...s,
        isPlaying: true,
        currentTrack: track,
        currentPlaylist: newPlaylist,
        currentIndex: newIndex
      };
    });
  };
  const pause = () => {
    if (audioRef.current) audioRef.current.pause();
    setState(s => ({ ...s, isPlaying: false }));
  };
  const seekTo = (time) => {
    if (audioRef.current) audioRef.current.currentTime = time;
    setState(s => ({ ...s, currentTime: time }));
  };
  const setVolume = (volume) => {
    if (audioRef.current) audioRef.current.volume = volume;
    setState(s => ({ ...s, volume }));
  };
  const addToQueue = (track) => {
    setState(s => {
      // Prevent duplicates
      if (s.queue.some(q => q.id === track.id)) return s;
      return { ...s, queue: [...s.queue, track] };
    });
  };

  // Set the current playlist (for playlist integration)
  // Auto-select the first track so the music bar is always ready
  const setCurrentPlaylist = (tracks) => {
    if (tracks && tracks.length > 0) {
      setState(s => ({
        ...s,
        currentPlaylist: tracks,
        currentTrack: tracks[0],
        currentIndex: 0
      }));
    } else {
      setState(s => ({
        ...s,
        currentPlaylist: [],
        currentTrack: null,
        currentIndex: -1
      }));
    }
  };

  // Helper to get current track index in playlist
  const getCurrentIndex = () => {
    if (!state.currentTrack) return -1;
    return state.currentPlaylist.findIndex(t => t.id === state.currentTrack.id);
  };

  // Loop and shuffle state
  const [loop, setLoop] = useState(false);
  const [shuffle, setShuffle] = useState(false);

  // Play next track in queue
  const playNext = () => {
    const idx = getCurrentIndex();
    const playlist = state.currentPlaylist;
    if (!playlist || playlist.length === 0) return;
    if (shuffle) {
      if (playlist.length < 2) return;
      let nextIdx;
      do {
        nextIdx = Math.floor(Math.random() * playlist.length);
      } while (nextIdx === idx);
      play(playlist[nextIdx], playlist, nextIdx);
    } else {
      if (idx === -1 || idx === playlist.length - 1) {
        if (loop && playlist.length > 0) {
          play(playlist[0], playlist, 0);
        }
        // else do nothing (end of playlist)
      } else {
        play(playlist[idx + 1], playlist, idx + 1);
      }
    }
  };

  // Play previous track in queue
  const playPrev = () => {
    const idx = getCurrentIndex();
    const playlist = state.currentPlaylist;
    if (!playlist || playlist.length === 0) return;
    if (idx > 0) {
      play(playlist[idx - 1], playlist, idx - 1);
    } else if (loop && playlist.length > 0) {
      play(playlist[playlist.length - 1], playlist, playlist.length - 1);
    }
  };



  // Audio event handlers
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onTimeUpdate = () => setState(s => ({ ...s, currentTime: audio.currentTime }));
    const onLoadedMetadata = () => setState(s => ({ ...s, duration: audio.duration }));
    const onEnded = () => {
      if (loop) {
        audio.currentTime = 0;
        audio.play();
      } else {
        playNext();
      }
    };
    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('loadedmetadata', onLoadedMetadata);
    audio.addEventListener('ended', onEnded);
    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('loadedmetadata', onLoadedMetadata);
      audio.removeEventListener('ended', onEnded);
    };
  }, [audioRef, state.currentTrack, loop, shuffle, state.queue]);

  return (
    <PlayerContext.Provider value={{
      ...state,
      play,
      pause,
      seekTo,
      setVolume,
  playNext,
  playPrev,
  setCurrentPlaylist,
      loop,
      setLoop,
      shuffle,
      setShuffle,
      audioRef
    }}>
      {children}
      <audio ref={audioRef} />
    </PlayerContext.Provider>
  );
};
