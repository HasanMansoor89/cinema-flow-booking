
import { Movie, Showtime, Seat, Booking } from '../types';

// Mock data
const movies: Movie[] = [
  {
    id: 1,
    title: "Interstellar",
    description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    posterUrl: "https://images.unsplash.com/photo-1500673922987-e212871fec22",
    duration: 169,
    releaseDate: "2025-04-15",
    genres: ["Sci-Fi", "Adventure", "Drama"],
    rating: 8.7,
    trailerUrl: "https://www.youtube.com/embed/zSWdZVtXT7E"
  },
  {
    id: 2,
    title: "The Matrix Resurrections",
    description: "Return to a world of two realities: one, everyday life; the other, what lies behind it.",
    posterUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
    duration: 148,
    releaseDate: "2025-04-10",
    genres: ["Action", "Sci-Fi"],
    rating: 7.8,
    trailerUrl: "https://www.youtube.com/embed/9ix7TUGVYIo"
  },
  {
    id: 3,
    title: "Dune: Part Two",
    description: "Follow the mythic journey of Paul Atreides as he unites with Chani and the Fremen while on a warpath of revenge.",
    posterUrl: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05",
    duration: 165,
    releaseDate: "2025-04-01",
    genres: ["Adventure", "Sci-Fi", "Drama"],
    rating: 9.1,
    trailerUrl: "https://www.youtube.com/embed/Way9Dexny3w"
  },
  {
    id: 4,
    title: "Inception",
    description: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    posterUrl: "https://images.unsplash.com/photo-1500673922987-e212871fec22",
    duration: 148,
    releaseDate: "2025-03-20",
    genres: ["Action", "Sci-Fi", "Thriller"],
    rating: 8.8,
    trailerUrl: "https://www.youtube.com/embed/YoHD9XEInc0"
  },
  {
    id: 5,
    title: "The Dark Knight",
    description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    posterUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
    duration: 152,
    releaseDate: "2025-03-15",
    genres: ["Action", "Crime", "Drama"],
    rating: 9.0,
    trailerUrl: "https://www.youtube.com/embed/EXeTwQWrcwY"
  },
  {
    id: 6,
    title: "Avatar: The Way of Water",
    description: "Jake Sully lives with his newfound family formed on the extrasolar moon Pandora. Once a familiar threat returns to finish what was previously started, Jake must work with Neytiri and the army of the Na'vi race to protect their home.",
    posterUrl: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05",
    duration: 192,
    releaseDate: "2025-03-10",
    genres: ["Action", "Adventure", "Fantasy"],
    rating: 8.5,
    trailerUrl: "https://www.youtube.com/embed/d9MyW72ELq0"
  }
];

// Generate showtimes for each movie
const generateShowtimes = (): Showtime[] => {
  const showtimes: Showtime[] = [];
  const today = new Date();
  
  movies.forEach(movie => {
    // Generate showtimes for the next 7 days
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(today.getDate() + i);
      const dateStr = date.toISOString().split('T')[0];
      
      // Three showtimes per day
      const times = ["10:00", "14:30", "19:00"];
      const halls = ["Hall A", "Hall B", "VIP Hall"];
      
      times.forEach((time, index) => {
        showtimes.push({
          id: showtimes.length + 1,
          movieId: movie.id,
          date: dateStr,
          time: time,
          hall: halls[index % halls.length],
          price: halls[index % halls.length] === "VIP Hall" ? 18.99 : 12.99
        });
      });
    }
  });
  
  return showtimes;
};

// Generate seats for each showtime
const generateSeats = (showtimes: Showtime[]): Seat[] => {
  const seats: Seat[] = [];
  const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  const seatsPerRow = 10;
  
  showtimes.forEach(showtime => {
    rows.forEach(row => {
      for (let i = 1; i <= seatsPerRow; i++) {
        const status = Math.random() < 0.2 ? 'booked' : 'available'; // 20% chance of being booked
        seats.push({
          id: seats.length + 1,
          row,
          number: i,
          status,
          showtimeId: showtime.id
        });
      }
    });
  });
  
  return seats;
};

const showtimes = generateShowtimes();
const seats = generateSeats(showtimes);
const bookings: Booking[] = [];

// Mock API functions
export const getMovies = async (): Promise<Movie[]> => {
  return new Promise(resolve => {
    setTimeout(() => resolve(movies), 500);
  });
};

export const getMovie = async (id: number): Promise<Movie | undefined> => {
  return new Promise(resolve => {
    setTimeout(() => resolve(movies.find(movie => movie.id === id)), 500);
  });
};

export const getShowtimes = async (movieId?: number): Promise<Showtime[]> => {
  return new Promise(resolve => {
    setTimeout(() => {
      if (movieId) {
        return resolve(showtimes.filter(showtime => showtime.movieId === movieId));
      }
      return resolve(showtimes);
    }, 500);
  });
};

export const getShowtime = async (id: number): Promise<Showtime | undefined> => {
  return new Promise(resolve => {
    setTimeout(() => resolve(showtimes.find(showtime => showtime.id === id)), 500);
  });
};

export const getSeats = async (showtimeId: number): Promise<Seat[]> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(seats.filter(seat => seat.showtimeId === showtimeId));
    }, 500);
  });
};

export const updateSeatStatus = async (seatId: number, status: 'available' | 'booked' | 'selected'): Promise<Seat | undefined> => {
  return new Promise(resolve => {
    setTimeout(() => {
      const seatIndex = seats.findIndex(seat => seat.id === seatId);
      if (seatIndex !== -1) {
        seats[seatIndex].status = status;
        return resolve(seats[seatIndex]);
      }
      return resolve(undefined);
    }, 300);
  });
};

export const createBooking = async (booking: Booking): Promise<Booking> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Check if all seats are available
      const selectedSeats = seats.filter(seat => booking.seatIds.includes(seat.id));
      const unavailableSeats = selectedSeats.filter(seat => seat.status === 'booked');
      
      if (unavailableSeats.length > 0) {
        return reject(new Error('Some selected seats are already booked'));
      }
      
      // Update seat status
      selectedSeats.forEach(seat => {
        const seatIndex = seats.findIndex(s => s.id === seat.id);
        if (seatIndex !== -1) {
          seats[seatIndex].status = 'booked';
        }
      });
      
      // Create booking
      const newBooking = {
        ...booking,
        id: bookings.length + 1,
        bookingDate: new Date().toISOString()
      };
      
      bookings.push(newBooking);
      resolve(newBooking);
    }, 700);
  });
};
