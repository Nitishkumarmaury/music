

import BinauralBeats from './BinauralBeats';

const Visualizer = ({ open, onClose }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md relative flex flex-col items-center">
        <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-700" onClick={onClose}>&times;</button>
        <h3 className="text-lg font-semibold mb-4">Soothing Visualizer</h3>
        <div className="w-64 h-32 bg-gradient-to-r from-blue-200 via-cream-100 to-purple-200 rounded shadow flex items-center justify-center">
          <span className="text-3xl text-blue-400 animate-pulse">~ ~ ~</span>
        </div>
  <p className="mt-4 text-gray-500 text-sm">(Placeholder for waveform/visuals)</p>
  <BinauralBeats />
      </div>
    </div>
  );
};

export default Visualizer;
