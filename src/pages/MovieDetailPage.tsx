
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovie, getShowtimes } from '@/services/api';
import { Movie, Showtime } from '@/types';
import ShowtimeList from '@/components/ShowtimeList';
import { Clock, Calendar, Star } from 'lucide-react';

const MovieDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [showtimes, setShowtimes] = useState<Showtime[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        if (id) {
          const movieId = parseInt(id);
          const [movieData, showtimesData] = await Promise.all([
            getMovie(movieId),
            getShowtimes(movieId)
          ]);
          
          if (movieData) {
            setMovie(movieData);
            setShowtimes(showtimesData);
          }
        }
      } catch (error) {
        console.error('Error fetching movie details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-8">
          <div className="h-[400px] bg-card rounded-lg"></div>
          <div className="h-8 bg-card rounded w-1/3"></div>
          <div className="h-4 bg-card rounded w-1/2"></div>
          <div className="h-24 bg-card rounded"></div>
        </div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold">Movie not found</h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Movie Hero */}
      <div className="relative rounded-xl overflow-hidden h-[400px] mb-12">
        <div className="absolute inset-0 bg-gradient-to-t from-cinema-dark via-cinema-dark/70 to-transparent z-10"></div>
        <img 
          src={movie.posterUrl} 
          alt={`${movie.title} poster`} 
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
          <h1 className="text-4xl font-bold mb-2 text-white">{movie.title}</h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-white/80 mb-4">
            <div className="flex items-center">
              <Star className="text-yellow-400 h-4 w-4 mr-1" />
              <span>{movie.rating.toFixed(1)}/10</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              <span>{movie.duration} min</span>
            </div>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              <span>{movie.releaseDate}</span>
            </div>
            <div>{movie.genres.join(', ')}</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="md:col-span-2">
          {/* Movie Description */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">About The Movie</h2>
            <p className="text-gray-300 leading-relaxed">{movie.description}</p>
          </section>

          {/* Movie Trailer */}
          {movie.trailerUrl && (
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4">Trailer</h2>
              <div className="aspect-video">
                <iframe
                  src={movie.trailerUrl}
                  className="w-full h-full rounded-lg"
                  title={`${movie.title} trailer`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </section>
          )}
        </div>

        <div>
          {/* Movie Poster */}
          <img 
            src={movie.posterUrl} 
            alt={`${movie.title} poster`} 
            className="w-full h-auto rounded-lg shadow-lg mb-8"
          />
        </div>
      </div>

      {/* Showtimes */}
      <section className="mt-8">
        <h2 className="text-2xl font-bold mb-6">Showtimes</h2>
        {showtimes.length > 0 ? (
          <ShowtimeList showtimes={showtimes} />
        ) : (
          <p className="text-gray-400">No showtimes available for this movie.</p>
        )}
      </section>
    </div>
  );
};

export default MovieDetailPage;
