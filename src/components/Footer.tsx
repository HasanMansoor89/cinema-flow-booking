
import React from 'react';
import { Link } from 'react-router-dom';
import { Ticket, Instagram, Twitter, Facebook } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-card/80 text-white pt-12 pb-8 mt-12 border-t border-white/10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Ticket className="h-8 w-8 text-cinema-primary" />
              <span className="font-bold text-xl">CinemaFlow</span>
            </div>
            <p className="text-sm text-gray-400">
              Book your favorite movies with ease. Experience cinema like never before.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-cinema-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-cinema-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-cinema-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-cinema-primary transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/movies" className="text-gray-400 hover:text-cinema-primary transition-colors">Movies</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-cinema-primary transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-cinema-primary transition-colors">Contact</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Help & Info</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/faq" className="text-gray-400 hover:text-cinema-primary transition-colors">FAQ</Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-400 hover:text-cinema-primary transition-colors">Terms of Service</Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-400 hover:text-cinema-primary transition-colors">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/refund" className="text-gray-400 hover:text-cinema-primary transition-colors">Refund Policy</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-2 text-gray-400">
              <li>123 Cinema Street, Movie Town</li>
              <li>+1 (555) 123-4567</li>
              <li>support@cinemaflow.com</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} CinemaFlow. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
