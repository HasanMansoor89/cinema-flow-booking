
import React from 'react';
import { Ticket, Code, Database, Users } from 'lucide-react';

const AboutPage: React.FC = () => {
  const teamMembers = [
    'Hasan Mansoor',
    'Shabbir Haider', 
    'Muhammad Arsalan', 
    'Syed Danish Khurram', 
    'Wasif Khan'
  ];

  return (
    <div className="container mx-auto px-4 py-8 text-white">
      <section className="mb-12">
        <h1 className="text-4xl font-bold mb-6 text-cinema-primary">About CinemaFlow</h1>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <p className="mb-4">
              CinemaFlow is a comprehensive movie ticket booking system developed as a final project for our Database Management Systems (DBMS) course. 
              The goal of this project is to simulate a real-world cinema environment, where users can explore movies, view showtimes, and book tickets with ease.
            </p>
          </div>
          
          <div className="bg-card rounded-lg p-6 space-y-4">
            <div className="flex items-center space-x-4">
              <Ticket className="text-cinema-primary h-8 w-8" />
              <h3 className="text-xl font-semibold">Movie Ticket Booking</h3>
            </div>
            <div className="flex items-center space-x-4">
              <Database className="text-cinema-primary h-8 w-8" />
              <h3 className="text-xl font-semibold">SQL Server Database</h3>
            </div>
            <div className="flex items-center space-x-4">
              <Code className="text-cinema-primary h-8 w-8" />
              <h3 className="text-xl font-semibold">React.js Frontend</h3>
            </div>
          </div>
        </div>
      </section>
      
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6 text-cinema-primary">Key Features</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: 'Movie Listings', description: 'Browse movies with posters, descriptions, genres, and durations.' },
            { title: 'Showtimes', description: 'View upcoming showtimes with real-time seat availability.' },
            { title: 'Ticket Booking', description: 'Book tickets by selecting movie, time, and seats.' },
            { title: 'Confirmation', description: 'Receive instant confirmation after booking.' }
          ].map((feature, index) => (
            <div key={index} className="bg-card rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-3 text-cinema-primary">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>
      
      <section>
        <h2 className="text-3xl font-bold mb-6 text-cinema-primary">Project Team</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamMembers.map((member, index) => (
            <div 
              key={index} 
              className="bg-card rounded-lg p-6 flex items-center space-x-4 hover:shadow-lg transition-shadow"
            >
              <Users className="text-cinema-primary h-8 w-8" />
              <span className="text-lg font-medium">{member}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
