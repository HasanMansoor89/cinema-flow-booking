
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getMovies } from '@/services/api';
import MovieCard from '@/components/MovieCard';
import { Film } from 'lucide-react';

const MoviesPage = () => {
  const { data: movies, isLoading } = useQuery({
    queryKey: ['movies'],
    queryFn: getMovies,
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-2 mb-8">
        <Film className="h-6 w-6 text-cinema-primary" />
        <h1 className="text-3xl font-bold text-white">Now Showing</h1>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, index) => (
            <div key={index} className="bg-card animate-pulse rounded-lg h-[400px]"></div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {movies?.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MoviesPage;
