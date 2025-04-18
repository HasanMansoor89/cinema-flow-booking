
export interface Movie {
  id: number;
  title: string;
  description: string;
  posterUrl: string;
  duration: number; // in minutes
  releaseDate: string;
  genres: string[];
  rating: number; // out of 10
  trailerUrl?: string;
}

export interface Showtime {
  id: number;
  movieId: number;
  date: string; // ISO date string
  time: string; // HH:MM format
  hall: string;
  price: number;
}

export interface Seat {
  id: number;
  row: string;
  number: number;
  status: 'available' | 'booked' | 'selected';
  showtimeId: number;
}

export interface Booking {
  id?: number;
  customerName: string;
  email: string;
  showtimeId: number;
  seatIds: number[];
  totalPrice: number;
  bookingDate?: string; // ISO date string
}
