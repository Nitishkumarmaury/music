import React, { useState, useRef } from 'react';
import * as Tone from 'tone';

const BinauralBeats = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [freq, setFreq] = useState(4); // 4 Hz = theta (deep relaxation)

  const leftOsc = useRef(null);
  const rightOsc = useRef(null);

  const startBeats = async () => {
    await Tone.start();
    leftOsc.current = new Tone.Oscillator(220, 'sine').toDestination();
    rightOsc.current = new Tone.Oscillator(220 + freq, 'sine').toDestination();
    leftOsc.current.start();
    rightOsc.current.start();
    setIsPlaying(true);
  };

  const stopBeats = () => {
    if (leftOsc.current) {
      leftOsc.current.stop();
      leftOsc.current.dispose();
      leftOsc.current = null;
    }
    if (rightOsc.current) {
      rightOsc.current.stop();
      rightOsc.current.dispose();
      rightOsc.current = null;
    }
    setIsPlaying(false);
  };

  return (
    <div className="flex flex-col items-center gap-2 mt-4">
      <label className="font-medium">Binaural Beats Frequency: {freq} Hz</label>
      <input type="range" min="1" max="20" value={freq} onChange={e => setFreq(Number(e.target.value))} />
      <div className="flex gap-2">
  <button className="px-4 py-2 rounded-full bg-gradient-to-tr from-green-400 via-blue-300 to-purple-400 text-white shadow-lg border-2 border-white hover:scale-105 transition" onClick={isPlaying ? stopBeats : startBeats}>
          {isPlaying ? 'Stop' : 'Start'}
        </button>
      </div>
    </div>
  );
};

export default BinauralBeats;
