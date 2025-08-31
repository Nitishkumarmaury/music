import React from 'react';
// import VantaBirdsBackground from '../components/VantaBirdsBackground';
import SearchBar from '../components/SearchBar';
import Footer from '../components/Footer';
import StarBorder from '../components/StarBorder';
import { useNavigate } from 'react-router-dom';


import { Link, useLocation } from 'react-router-dom';

const categories = [
  { name: 'Healing', playlists: [
    { id: 1, title: 'Morning Calm', description: 'Gentle sunrise music for healing.', mood: 'Healing', tag: 'healing' },
    { id: 2, title: 'Evening Reset', description: 'Relax and reset after a long day.', mood: 'Healing', tag: 'healing' },
    { id: 3, title: 'Chakra Balance', description: 'Align your energy centers.', mood: 'Healing', tag: 'healing' },
  ]},
  { name: 'Sleep', playlists: [
    { id: 4, title: 'Deep Night', description: 'Drift into deep sleep.', mood: 'Sleep', tag: 'sleep' },
    { id: 5, title: 'Moonlight Drift', description: 'Soothing night melodies.', mood: 'Sleep', tag: 'sleep' },
    { id: 6, title: 'Silent Stars', description: 'Peaceful ambient for sleep.', mood: 'Sleep', tag: 'sleep' },
  ]},
  { name: 'Focus', playlists: [
    { id: 7, title: 'Study Calm', description: 'Gentle focus music.', mood: 'Focus', tag: 'focus' },
    { id: 8, title: 'Concentration Flow', description: 'Stay in the zone.', mood: 'Focus', tag: 'focus' },
  ]},
  { name: 'Relax', playlists: [
    { id: 9, title: 'Evening Relax', description: 'Unwind and relax.', mood: 'Relax', tag: 'relax' },
    { id: 10, title: 'Soft Rain', description: 'Rain sounds for relaxation.', mood: 'Relax', tag: 'relax' },
  ]},
  { name: 'Nature Sounds', playlists: [
    { id: 11, title: 'Forest Calm', description: 'Nature-inspired calm.', mood: 'Nature', tag: 'nature' },
    { id: 12, title: 'Ocean Bliss', description: 'Waves and water.', mood: 'Nature', tag: 'nature' },
  ]},
];

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

import { useState } from 'react';

const Browse = ({ showBar, setShowBar }) => {
  const query = useQuery();
  const navigate = useNavigate();
  const moodFilter = query.get('mood');
  const [search, setSearch] = useState('');

  // Filter categories and playlists by search
  let filteredCategories = moodFilter
    ? categories.filter(cat => cat.name.toLowerCase() === moodFilter)
    : categories;

  let searchResults = null;
  if (search.trim()) {
    const q = search.trim().toLowerCase();
    // Find playlists matching query in title, description, or mood
    const matched = [];
    for (const cat of filteredCategories) {
      const matches = cat.playlists.filter(pl =>
        pl.title.toLowerCase().includes(q) ||
        pl.description.toLowerCase().includes(q) ||
        (pl.mood && pl.mood.toLowerCase().includes(q))
      );
      if (matches.length > 0) {
        matched.push({ ...cat, playlists: matches });
      }
    }
    searchResults = matched;
  }

  return (
    <>
      <div className="flex flex-row gap-3 mb-6 items-center w-full fixed top-4 right-4 z-50 justify-end">
        <StarBorder as="button" onClick={() => navigate('/')} color="#ffe066" className="w-28 py-2">Home</StarBorder>
        <StarBorder as="button" onClick={() => navigate(-1)} color="#ffe066" className="w-28 py-2">Back</StarBorder>
        <StarBorder as="button" onClick={() => setShowBar(v => !v)} color="#ffe066" className="w-28 py-2">{showBar ? 'Hide' : 'Show'}</StarBorder>
      </div>
      <main className="flex flex-col items-center px-4 py-12 gap-8 relative z-10 text-premium-cream min-h-screen bg-premium-gradient">
        <section className="w-full max-w-3xl flex flex-col justify-center items-center text-center py-10 bg-premium-navy rounded-premium shadow-premium-card border border-premium-gold/20 mx-auto">
          <h2 className="text-3xl font-serif mb-6 text-premium-gold drop-shadow-lg text-center">Browse Categories</h2>
          <div className="flex gap-4 mb-6 flex-wrap justify-center">
            {categories.map(cat => (
              <Link key={cat.name} to={`?mood=${cat.name.toLowerCase()}`} className={`px-4 py-2 rounded-lg font-medium shadow bg-gold-900/20 text-gold-200 hover:scale-105 hover:bg-gold-900/40 transition ${moodFilter === cat.name.toLowerCase() ? 'ring-2 ring-gold-400' : ''}`}>
                {cat.name}
              </Link>
            ))}
            {moodFilter && (
              <Link to="" className="ml-2 text-sm underline text-gray-500">Clear</Link>
            )}
          </div>
        </section>
        <section className="w-full max-w-5xl flex flex-col items-center">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full mt-8">
            {(searchResults || filteredCategories).flatMap(cat => cat.playlists.map(pl => (
              <Link
                key={pl.id}
                to={`/playlist/${pl.tag || cat.name.toLowerCase()}`}
                className="block p-4 bg-premium-navy rounded-premium shadow-premium-card border border-premium-gold/20 hover:bg-premium-gold/10 transition text-premium-cream text-center"
              >
                <div className="font-bold mb-2 text-premium-gold text-lg">{pl.title}</div>
                <div className="text-sm text-premium-cream/80">{pl.description}</div>
                <div className="text-xs text-premium-gold mt-1">{cat.name}</div>
              </Link>
            )))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Browse;
