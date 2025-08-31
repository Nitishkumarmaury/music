
import React from 'react';

const TimerModal = ({ open, onClose }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-xs relative">
  <button className="absolute top-2 right-2 p-2 rounded-full bg-gradient-to-tr from-pink-400 via-yellow-300 to-orange-400 text-white shadow-lg border-2 border-white hover:scale-110 transition text-lg" onClick={onClose}>&times;</button>
        <h3 className="text-lg font-semibold mb-4">Sleep Timer</h3>
        <div className="flex flex-col gap-3">
          {[15, 30, 60].map(min => (
            <button key={min} className="px-4 py-2 rounded-full bg-gradient-to-tr from-green-400 via-blue-300 to-purple-400 text-white shadow-lg border-2 border-white hover:scale-105 transition">{min} min</button>
          ))}
          <button className="px-4 py-2 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-400 to-red-400 text-white shadow-lg border-2 border-white hover:scale-105 transition">Custom...</button>
        </div>
      </div>
    </div>
  );
};

export default TimerModal;
