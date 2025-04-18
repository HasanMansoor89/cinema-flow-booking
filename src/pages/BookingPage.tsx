import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getShowtime, getSeats, getMovie } from '@/services/api';
import { Showtime, Seat, Movie } from '@/types';
import SeatGrid from '@/components/SeatGrid';
import BookingForm from '@/components/BookingForm';
import { format, parseISO } from 'date-fns';
import { Ticket, Clock, Calendar } from 'lucide-react';

const BookingPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [showtime, setShowtime] = useState<Showtime | null>(null);
  const [seats, setSeats] = useState<Seat[]>([]);
  const [movie, setMovie] = useState<Movie | null>(null);
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookingData = async () => {
      try {
        if (id) {
          const showtimeId = parseInt(id);
          const showtimeData = await getShowtime(showtimeId);
          
          if (showtimeData) {
            setShowtime(showtimeData);
            
            // Fetch movie data
            const movieData = await getMovie(showtimeData.movieId);
            if (movieData) {
              setMovie(movieData);
            }
            
            // Fetch seats
            const seatsData = await getSeats(showtimeId);
            setSeats(seatsData);
          }
        }
      } catch (error) {
        console.error('Error fetching booking data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookingData();
  }, [id]);

  const handleSeatSelect = (seat: Seat) => {
    if (seat.status === 'booked') return;
    
    setSelectedSeats(prev => {
      // If seat is already selected, remove it
      if (prev.some(s => s.id === seat.id)) {
        return prev.filter(s => s.id !== seat.id);
      }
      // Otherwise, add it
      return [...prev, seat];
    });
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-8">
          <div className="h-8 bg-card rounded w-1/3"></div>
          <div className="h-[400px] bg-card rounded-lg"></div>
        </div>
      </div>
    );
  }

  if (!showtime || !movie) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold">Showtime not found</h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 flex items-center">
        <Ticket className="mr-2 text-cinema-primary" /> Book Your Seats
      </h1>
      
      {/* Movie & Showtime Info */}
      <div className="bg-card rounded-lg p-6 mb-8">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
          <img 
            src={movie.posterUrl} 
            alt={`${movie.title} poster`} 
            className="w-32 h-48 object-cover rounded-lg"
          />
          
          <div>
            <h2 className="text-2xl font-bold mb-2">{movie.title}</h2>
            <div className="flex flex-wrap gap-4 text-sm text-gray-300">
              <div className="flex items-center">
                <Calendar className="mr-1 h-4 w-4 text-cinema-primary" />
                {format(parseISO(showtime.date), 'EEEE, MMMM d, yyyy')}
              </div>
              <div className="flex items-center">
                <Clock className="mr-1 h-4 w-4 text-cinema-primary" />
                {showtime.time}
              </div>
              <div className="px-2 py-1 bg-muted text-white rounded text-xs">
                {showtime.hall}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <SeatGrid 
            seats={seats} 
            onSeatSelect={handleSeatSelect} 
            selectedSeats={selectedSeats}
          />
        </div>
        
        <div>
          <BookingForm showtime={showtime} selectedSeats={selectedSeats} />
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
