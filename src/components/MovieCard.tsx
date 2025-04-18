
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Movie } from '@/types';
import { Link } from 'react-router-dom';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  return (
    <Link to={`/movie/${movie.id}`} className="block">
      <Card className="movie-card h-full overflow-hidden">
        <div className="h-80 overflow-hidden">
          <img 
            src={movie.posterUrl} 
            alt={`${movie.title} poster`} 
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
          />
        </div>
        <CardContent className="p-4">
          <h3 className="text-lg font-semibold truncate text-white">{movie.title}</h3>
          <div className="flex justify-between items-center mt-2">
            <span className="text-sm text-cinema-light">{movie.genres.slice(0, 2).join(', ')}</span>
            <span className="bg-cinema-primary text-white px-2 py-1 rounded-md text-xs">
              {movie.rating.toFixed(1)}
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default MovieCard;
