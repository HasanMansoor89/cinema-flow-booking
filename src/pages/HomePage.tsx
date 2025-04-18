
import React, { useEffect, useState } from 'react';
import { getMovies } from '@/services/api';
import { Movie } from '@/types';
import MovieCard from '@/components/MovieCard';
import { Button } from '@/components/ui/button';
import { Ticket, ArrowRight } from 'lucide-react';

const HomePage: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await getMovies();
        setMovies(data);
      } catch (error) {
        console.error('Error fetching movies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="relative rounded-2xl overflow-hidden mb-16">
        <div className="absolute inset-0 bg-gradient-to-r from-cinema-dark to-transparent z-10"></div>
        <img 
          src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5" 
          alt="Hero" 
          className="w-full h-[500px] object-cover"
        />
        <div className="absolute inset-0 flex flex-col justify-center z-20 p-8 md:p-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Experience Movies Like Never Before
          </h1>
          <p className="text-lg md:text-xl mb-8 text-white/80 max-w-xl">
            Book your favorite movies with ease and enjoy a premium cinema experience.
          </p>
          <div>
            <Button className="bg-cinema-primary hover:bg-cinema-secondary text-white">
              <Ticket className="mr-2 h-4 w-4" /> Book Now
            </Button>
          </div>
        </div>
      </section>

      {/* Now Showing Section */}
      <section className="mb-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-white">Now Showing</h2>
          <Button variant="ghost" className="text-cinema-primary">
            View All <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
        
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="bg-card animate-pulse rounded-lg h-[400px]"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {movies.slice(0, 4).map(movie => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </section>

      {/* Coming Soon Section */}
      <section>
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-white">Coming Soon</h2>
          <Button variant="ghost" className="text-cinema-primary">
            View All <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
        
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="bg-card animate-pulse rounded-lg h-[400px]"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {movies.slice(4).map(movie => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default HomePage;
