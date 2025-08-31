

import { useParams, Link, useNavigate } from 'react-router-dom';
import StarBorder from '../components/StarBorder';
import Footer from '../components/Footer';
import GradualBlur from '../components/GradualBlur';
import { usePlayer } from '../contexts/PlayerContext';

// Import the same mockPlaylists as Playlist.jsx (copy-paste for now)
const mockPlaylists = {
  1: {
    title: 'Deep Calm',
    description: 'Gentle soundscapes for deep meditation.',
    tracks: [
      { id: 101, title: 'Evening Improvisation', duration: '4:12', url: '/sleeping music/Evening-Improvisation-with-Ethera(chosic.com).mp3', description: 'Gentle improvisation for evening meditation.' },
      { id: 102, title: 'Deep Relaxing Music', duration: '6:30', url: '/sleeping music/deep-relaxing-music-144008.mp3', description: 'Deep relaxing music for sleep.' },
      { id: 103, title: 'Meditation Relax Deep Sleep', duration: '5:00', url: '/sleeping music/meditation-relax-deep-sleep-quotc-majorquot-music-150647.mp3', description: 'Meditation music for deep sleep.' },
      { id: 104, title: 'Place of Calm and Peace', duration: '4:45', url: '/healing music/place-of-calm-and-peace-258253.mp3', description: 'A place of calm and peace.' },
    ],
  },
  2: {
    title: 'Healing Waves',
    description: 'Soothing music for healing and relaxation.',
    tracks: [
      { id: 201, title: 'Healing Frequencies Love', duration: '8:45', url: '/healing music/healing-frequencies-love-and-spiritual-growth-224224.mp3', description: 'Healing frequencies for love and spiritual growth.' },
      { id: 202, title: 'Grounding & Protection', duration: '7:20', url: '/healing music/healing-frequencies-grounding-and-protection-224209.mp3', description: 'Grounding and protection music.' },
      { id: 203, title: 'Sacred Bowl Frequency Healing', duration: '6:10', url: '/healing music/sacred-bowl-frequency-healing-388610.mp3', description: 'Sacred bowl frequency healing.' },
      { id: 204, title: 'Solar Plexus Chakra Healing', duration: '5:30', url: '/healing music/solar-plexus-chakra-healing-uplifting-amp-empowering-ram-528hz-345222.mp3', description: 'Solar plexus chakra healing.' },
    ],
  },
  3: {
    title: 'Sleep Sanctuary',
    description: 'Calm melodies for restful sleep.',
    tracks: [
      { id: 301, title: 'Sleep Music Vol 14', duration: '15:00', url: '/sleeping music/sleep-music-vol14-195424.mp3', description: 'Sleep music for deep rest.' },
      { id: 302, title: 'Sleep Inducing Tibetan Bells', duration: '13:27', url: '/sleeping music/sleep-inducing-tibetan-bells-388638.mp3', description: 'Tibetan bells for sleep.' },
      { id: 303, title: 'Deep Sleep', duration: '12:00', url: '/sleeping music/deep-sleep-308846.mp3', description: 'Music for deep sleep.' },
      { id: 304, title: 'Relaxing Sleep Music with Rain', duration: '10:30', url: '/sleeping music/relaxing-sleep-music-with-soft-ambient-rain-369762.mp3', description: 'Relaxing sleep music with rain.' },
    ],
  },
};

// Flatten all tracks for lookup by id
const allTracks = Object.values(mockPlaylists).flatMap(p => p.tracks);


const Track = ({ showBar, setShowBar }) => {
  const navigate = useNavigate();
  // Demo: static content for "Silent Horizon"
  return (
    <div className="bg-premium-gradient text-premium-cream min-h-screen">
      <div className="flex gap-4 mb-6 justify-end items-center w-full fixed top-4 right-4 z-50">
        <StarBorder as="button" onClick={() => navigate('/')} color="#ffe066">Home</StarBorder>
        <StarBorder as="button" onClick={() => navigate(-1)} color="#ffe066">Back</StarBorder>
        <StarBorder as="button" onClick={() => setShowBar(v => !v)} color="#ffe066">{showBar ? 'Hide Bar' : 'Show Bar'}</StarBorder>
      </div>
  <main className="max-w-xl mx-auto px-4 py-8 bg-wellness-white rounded-wellness shadow-wellness-card">
    <div className="flex justify-center w-full mb-4">
      <SearchBar />
    </div>
        <div className="w-full h-48 rounded-xl mb-6 flex items-center justify-center bg-gradient-to-tr from-gold-100 via-gold-200 to-gold-400 relative">
          <span className="text-6xl text-gold-900 drop-shadow">🎵</span>
          <div className="absolute inset-0 rounded-xl border-4 border-gold-300/60 pointer-events-none" style={{ boxShadow: '0 0 32px 8px rgba(255,215,0,0.15) inset' }} />
        </div>
        <h2 className="text-2xl font-serif mb-2">Silent Horizon</h2>
        <div className="mb-2 text-gold-400">Length: 6:45 &middot; <span className="text-gold-300">Calm, Sleep, Healing</span></div>
        <p className="mb-4 text-gold-200/90">An immersive soundscape blending soft waves and gentle tones, perfect for easing into restful sleep.</p>
        <div className="mb-4">
          <span className="font-semibold text-gold-200">Suggested Similar Tracks:</span> Moonlight Drift, Golden Drift
        </div>
        <button className="px-6 py-2 rounded-full font-semibold shadow bg-gradient-to-tr from-pink-400 via-yellow-300 to-orange-400 text-white border-2 border-white hover:scale-105 transition">Play</button>
        <div className="mt-6">
          <Link to="/browse" className="text-gold-500 hover:underline">Back to Browse</Link>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Track;
