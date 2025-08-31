import React from 'react';

import Footer from '../components/Footer';
import StarBorder from '../components/StarBorder';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../components/SearchBar';



const About = ({ showBar, setShowBar }) => {
  const navigate = useNavigate();
  return (
    <div className="bg-premium-gradient text-premium-cream min-h-screen">
      <div className="flex flex-row gap-3 mb-6 items-center w-full fixed top-4 right-4 z-50 justify-end">
        <StarBorder as="button" onClick={() => navigate('/')} color="#ffe066" className="w-28 py-2">Home</StarBorder>
        <StarBorder as="button" onClick={() => navigate(-1)} color="#ffe066" className="w-28 py-2">Back</StarBorder>
        <StarBorder as="button" onClick={() => setShowBar(v => !v)} color="#ffe066" className="w-28 py-2">{showBar ? 'Hide' : 'Show'}</StarBorder>
      </div>
      <main className="max-w-2xl mx-auto px-4 py-12 bg-premium-navy rounded-premium shadow-premium-card mt-8">
      {/* Search bar removed as requested */}
        <h2 className="text-3xl font-serif mb-4 text-wellness-teal drop-shadow-lg">About Our Journey</h2>
        <p className="mb-4 text-gold-200/90">This platform was created to help people find peace through sound. Designed by Nitish Kumar, a BE CSE Cloud Computing student, founder of Plantgen, and leader in multiple national hackathons. He brings together technology, design thinking, and wellness to create a premium meditation music experience.</p>
        <h3 className="text-xl font-semibold mb-2 text-gold-200">Bio</h3>
        <ul className="mb-4 list-disc list-inside text-gold-100/90">
          <li><span className="font-bold">Nitish Kumar</span> — Cloud Engineer aspirant, entrepreneur, and project leader.</li>
          <li>Founder of Plantgen (eco-friendly gifting startup).</li>
          <li>Hackathon Winner:
            <ul className="ml-6 list-disc">
              <li>Smart India Hackathon 2023 (1st Prize, ₹1 Lakh).</li>
              <li>Vibrant Hackathon Gujarat (1st Prize, ₹2 Lakh).</li>
            </ul>
          </li>
        </ul>
      </main>
      <Footer />
    </div>
  );
};

// ...existing code...

export default About;
