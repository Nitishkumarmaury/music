import React from 'react';

import Footer from '../components/Footer';
import StarBorder from '../components/StarBorder';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../components/SearchBar';



const Blog = ({ showBar, setShowBar }) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex flex-row gap-3 mb-6 items-center w-full fixed top-4 right-4 z-50 justify-end">
        <StarBorder as="button" onClick={() => navigate('/')} color="#ffe066" className="w-28 py-2">Home</StarBorder>
        <StarBorder as="button" onClick={() => navigate(-1)} color="#ffe066" className="w-28 py-2">Back</StarBorder>
        <StarBorder as="button" onClick={() => setShowBar(v => !v)} color="#ffe066" className="w-28 py-2">{showBar ? 'Hide' : 'Show'}</StarBorder>
      </div>
  <main className="max-w-2xl mx-auto px-4 py-12 bg-premium-navy rounded-premium shadow-premium-card mt-8">
  {/* Search bar removed as requested */}
    <h2 className="text-3xl font-serif mb-8 text-premium-gold drop-shadow-lg text-center">Blog</h2>
    {/* Blog 1 */}
    <article className="mb-10">
      <h3 className="text-2xl font-bold text-premium-gold mb-2 flex items-center">🌟 Blog 1: The Power of Healing Music — Finding Calm in Chaos</h3>
      <p className="text-premium-cream/90 mb-3">In today’s fast-moving world, our minds are often restless, filled with distractions and noise. Healing music is more than just sound; it’s a bridge that guides us back to stillness. When we slow down and allow calm frequencies to flow through us, stress dissolves, the heart relaxes, and the mind opens to clarity.</p>
      <p className="text-premium-cream/90 mb-3">Meditation music reminds us that peace is not somewhere far away—it’s always within us, waiting to be unlocked. Every track is like a gentle hand on the shoulder, saying, “Pause. Breathe. You are safe here.”</p>
      <p className="text-premium-cream/90 mb-3">Healing music teaches us that stillness is not the absence of movement, but the presence of balance.</p>
      <div className="bg-premium-gray/30 rounded p-3 mt-2 mb-2 text-premium-gold text-sm">Message to Readers: Take a few minutes daily to listen with intention. The more you practice, the more inner strength and peace you’ll discover.</div>
    </article>
    {/* Blog 2 */}
    <article className="mb-10">
      <h3 className="text-2xl font-bold text-premium-gold mb-2 flex items-center">🌙 Blog 2: Why Sleep is the Secret to Success</h3>
      <p className="text-premium-cream/90 mb-3">We live in a culture that glorifies hustle—but what if the real secret to success is not in working longer hours, but in resting deeply? Science shows that quality sleep repairs the body, sharpens memory, and enhances creativity. Yet, sleep is often the most neglected part of our lives.</p>
      <p className="text-premium-cream/90 mb-3">Soothing music before bed is like telling the brain, “It’s time to let go.” Slow rhythms calm the nervous system, reduce anxiety, and prepare us for natural rest.</p>
      <p className="text-premium-cream/90 mb-3">Think of sleep as the foundation of your future. Without strong rest, dreams cannot grow. With deep, healing sleep, even the impossible begins to look possible.</p>
      <div className="bg-premium-gray/30 rounded p-3 mt-2 mb-2 text-premium-gold text-sm">Message to Readers: Success is not built in exhaustion, but in restoration. Make sleep your nightly ritual, and watch your energy transform your days.</div>
    </article>
    {/* Blog 3 */}
    <article className="mb-10">
      <h3 className="text-2xl font-bold text-premium-gold mb-2 flex items-center">🌱 Blog 3: Calmness, Technology, and the Future</h3>
      <p className="text-premium-cream/90 mb-3">If technology can change industries, then calmness can change individuals. And when individuals change, the world changes.</p>
      <div className="bg-premium-gray/30 rounded p-3 mt-2 mb-2 text-premium-gold text-sm">Message to Readers: Believe that you can combine your passion with purpose. Whether through music, technology, or nature—every effort toward peace creates ripples of positive change.</div>
  {/* Removed Nitish Kumar's journey and Share button as requested */}
    </article>
  </main>
  <Footer />
  </>
  );
};

// ...existing code...

export default Blog;
