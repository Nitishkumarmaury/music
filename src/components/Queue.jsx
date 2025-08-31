import React from 'react';
import { usePlayer } from '../contexts/PlayerContext';

const Queue = ({ open, onClose }) => {
  const { queue, play, currentTrack, isPlaying } = usePlayer();
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md relative">
        <button className="absolute top-2 right-2 p-2 rounded-full bg-gradient-to-tr from-pink-400 via-yellow-300 to-orange-400 text-white shadow-lg border-2 border-white hover:scale-110 transition text-lg" onClick={onClose}>&times;</button>
        <h3 className="text-lg font-semibold mb-4">Queue</h3>
        <ul className="divide-y divide-gray-200">
          {queue.length === 0 && <li className="py-2 text-center text-gray-400">Queue is empty</li>}
          {queue.map(track => (
            <li key={track.id} className="py-2 flex justify-between items-center">
              <div>
                <div className="font-medium">{track.title}</div>
                <div className="text-xs text-gray-500">{track.artist}</div>
              </div>
              <button
                className={`px-3 py-1 rounded-full font-bold text-white ${currentTrack && currentTrack.id === track.id && isPlaying ? 'bg-red-500' : 'bg-green-600 hover:bg-green-700'} transition`}
                onClick={() => play(track)}
              >
                {currentTrack && currentTrack.id === track.id && isPlaying ? 'Pause' : 'Play'}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Queue;
