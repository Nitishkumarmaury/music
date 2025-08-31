import React from 'react';


import { Link } from 'react-router-dom';

const Header = () => (
  <header className="py-4 px-6 flex flex-col items-center bg-premium-gradient border-b-2 border-premium-gold shadow-premium-card rounded-b-xl">
    <h1 className="text-2xl font-serif mb-2 text-premium-gold drop-shadow">Premium Meditation & Sleep Music</h1>
    <nav className="flex gap-4">
      <Link to="/" className="text-premium-cream hover:text-premium-gold transition-colors">Home</Link>
      <Link to="/browse" className="text-premium-cream hover:text-premium-gold transition-colors">Browse</Link>
      <Link to="/about" className="text-premium-cream hover:text-premium-gold transition-colors">About</Link>
      <Link to="/blog" className="text-premium-cream hover:text-premium-gold transition-colors">Blog</Link>
    </nav>
  </header>
);

export default Header;
