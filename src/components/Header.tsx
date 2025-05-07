
import React from 'react';
import { Link } from 'react-router-dom';
import { Ticket } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="w-full bg-card/80 backdrop-blur-sm sticky top-0 z-50 border-b border-white/10">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <Ticket className="h-8 w-8 text-cinema-primary" />
          <span className="font-bold text-xl text-white">CinemaFlow</span>
        </Link>
        
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-white hover:text-cinema-primary transition-colors">Home</Link>
          <Link to="/movies" className="text-white hover:text-cinema-primary transition-colors">Movies</Link>
          <Link to="/my-bookings" className="text-white hover:text-cinema-primary transition-colors">My Bookings</Link>
          <Link to="/about" className="text-white hover:text-cinema-primary transition-colors">About</Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
