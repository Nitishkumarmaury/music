import React from 'react';
  import ElectricBorder from './ElectricBorder';

const TrackCard = ({ track }) => (
    <ElectricBorder color="#7df9ff" speed={1} chaos={0.5} thickness={2} style={{ borderRadius: 16, width: '100%' }}>
      <div className="track-card">
    {/* TODO: Display track artwork, title, and artist */}
    <h4>{track?.title || 'Track Title'}</h4>
  </div>
    </ElectricBorder>
);

export default TrackCard;
