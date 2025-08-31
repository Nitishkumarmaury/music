import React from 'react';

import ElectricBorder from './ElectricBorder';

const PlaylistCard = ({ playlist }) => (
  <ElectricBorder color="#ffd700" speed={1.2} chaos={0.7} thickness={2.5} style={{ borderRadius: 18, width: '100%' }}>
    <div className="playlist-card flex flex-col items-center p-4 bg-premium-navy rounded-premium shadow-premium-card border border-premium-gold/20">
      <div className="w-20 h-20 mb-3 rounded-full bg-gradient-to-tr from-premium-gold via-premium-gold-dark to-premium-cream flex items-center justify-center text-3xl text-premium-black shadow-inner">
        <span role="img" aria-label="music">🎵</span>
      </div>
      <h3 className="text-lg font-bold text-premium-gold mb-1">{playlist?.title || 'Playlist Title'}</h3>
      <p className="text-sm text-premium-cream/80 mb-2">{playlist?.description || 'Curated tracks for your mood.'}</p>
    </div>
  </ElectricBorder>
);

export default PlaylistCard;
