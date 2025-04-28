
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getMovies } from '@/services/api';
import MovieCard from '@/components/MovieCard';
import { Film } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const MoviesPage = () => {
  const { toast } = useToast();
  const { data: movies, isLoading, error } = useQuery({
    queryKey: ['movies'],
    queryFn: getMovies,
    meta: {
      errorHandler: (err: unknown) => {
        toast({
          title: "Error loading movies",
          description: err instanceof Error ? err.message : "Something went wrong",
          variant: "destructive"
        });
      }
    }
  });

  // Handle error with React Query's provided error state
  if (error) {
    // Error toast is already shown via the meta.errorHandler
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-card p-6 rounded-lg text-center">
          <h2 className="text-xl font-bold mb-4">Unable to load movies</h2>
          <p className="text-white/70">Please try again later</p>
        </div>
      </div>
    );
  }

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
          {movies && movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
          {(!movies || movies.length === 0) && (
            <div className="col-span-full text-center py-10">
              <p className="text-lg text-white/70">No movies available at this time</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MoviesPage;
