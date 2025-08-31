import React from 'react';
import { PiXLogoBold } from "react-icons/pi";
import Prism from '../components/Prism';
import GradualBlur from '../components/GradualBlur';
import Header from '../components/Header';
import Footer from '../components/Footer';
import VantaBirdsBackground from '../components/VantaBirdsBackground';
import StarBorder from '../components/StarBorder';
import { Link, useNavigate } from 'react-router-dom';

const featuredPlaylists = [
  { tag: 'healing', title: 'Healing Vibes', description: 'Soft, calming tracks for healing and relaxation.' },
  { tag: 'sleep', title: 'Deep Sleep Tones', description: 'Soothing night music for restful sleep.' },
  { tag: 'focus', title: 'Focus & Study Calm', description: 'Gentle concentration music for focus and clarity.' },
];

const Home = () => {
  const navigate = useNavigate();
  return (
    <>
      <Header />
      <VantaBirdsBackground className="flex flex-col items-center px-4 py-12 gap-y-12 min-h-screen bg-premium-gradient text-premium-cream">
  {/* Removed Home and Back buttons as requested */}
        {/* Hero Section */}
        <section className="w-full max-w-3xl flex flex-col justify-center items-center text-center py-10 bg-premium-navy rounded-premium shadow-premium-card border border-premium-gold/20 mx-auto">
          <h2 className="text-4xl font-serif mb-3 text-premium-gold drop-shadow-lg mx-auto">Find Calm, Heal, and Sleep Better with Premium Music</h2>
          <p className="mb-6 text-lg text-premium-cream/90 mx-auto">Curated meditation and sleep playlists designed to bring peace and relaxation.</p>
          <div className="flex flex-col sm:flex-row justify-center items-center w-full gap-2">
            <Link to="/browse" className="inline-block bg-premium-gold text-premium-black px-6 py-2 rounded-full font-semibold shadow hover:bg-premium-gold-dark transition mx-auto">Explore Playlists</Link>
            <Link to="/browse?mood=healing" className="inline-block bg-premium-cream text-premium-black px-6 py-2 rounded-full font-semibold shadow hover:bg-premium-gold/80 transition mx-auto">Discover Healing Sounds</Link>
          </div>
        </section>

        {/* Featured Playlists */}
        <section className="w-full max-w-4xl flex flex-col items-center">
          <h3 className="text-2xl font-semibold mb-6 text-premium-gold">Featured Playlists</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
            {featuredPlaylists.map(pl => (
              <Link key={pl.tag} to={`/playlist/${pl.tag}`} className="block p-6 bg-premium-gray rounded-premium shadow-premium-card border border-premium-gold/20 hover:bg-premium-navy/80 transition text-premium-cream text-center">
                <div className="font-bold mb-2 text-premium-gold text-lg">{pl.title}</div>
                <div className="text-sm text-premium-cream/80">{pl.description}</div>
              </Link>
            ))}
          </div>
        </section>

        {/* Personal Touch */}
        <section className="w-full max-w-2xl flex flex-col justify-center items-center text-center bg-premium-navy rounded-premium shadow-premium-card border border-premium-gold/20 p-8 mx-auto mt-6">
          <h4 className="text-xl font-serif text-premium-gold mb-2 mx-auto">Curated by Nitish Kumar</h4>
          <p className="text-premium-cream/90 mx-auto">Cloud Engineer & Founder of Plantgen, who believes in meaningful, eco-friendly living and creating mindful digital experiences.</p>
        </section>
      </VantaBirdsBackground>
      <Footer />
    </>
  );
};

export default Home;
