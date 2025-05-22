
import { Movie, Showtime, Seat, Booking } from '../types';

// Replace this with your actual API URL when deployed
const API_BASE_URL = 'http://localhost:3001/api'; // Change this to your API URL when deployed

// Helper function for API requests
const apiRequest = async (endpoint: string, options = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `API request failed with status ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`API request failed: ${endpoint}`, error);
    throw error;
  }
};

// Movies API
export const getMovies = async (): Promise<Movie[]> => {
  return apiRequest('/movies');
};

export const getMovie = async (id: number): Promise<Movie | undefined> => {
  try {
    const movie = await apiRequest(`/movies/${id}`);
    return movie || undefined;
  } catch (error) {
    console.error(`Failed to fetch movie with ID ${id}:`, error);
    throw new Error('Failed to fetch movie details');
  }
};

// Showtimes API
export const getShowtimes = async (movieId?: number): Promise<Showtime[]> => {
  try {
    const endpoint = movieId ? `/showtimes?movieId=${movieId}` : '/showtimes';
    return await apiRequest(endpoint);
  } catch (error) {
    console.error('Failed to fetch showtimes:', error);
    throw new Error('Failed to fetch showtimes');
  }
};

export const getShowtime = async (id: number): Promise<Showtime | undefined> => {
  try {
    const showtime = await apiRequest(`/showtimes/${id}`);
    return showtime || undefined;
  } catch (error) {
    console.error(`Failed to fetch showtime with ID ${id}:`, error);
    throw new Error('Failed to fetch showtime details');
  }
};

// Seats API
export const getSeats = async (showtimeId: number): Promise<Seat[]> => {
  try {
    return await apiRequest(`/seats/showtimes/${showtimeId}`);
  } catch (error) {
    console.error(`Failed to fetch seats for showtime ${showtimeId}:`, error);
    throw new Error('Failed to fetch seats');
  }
};

export const updateSeatStatus = async (
  seatId: number, 
  status: 'available' | 'booked' | 'selected'
): Promise<Seat | undefined> => {
  try {
    return await apiRequest(`/seats/${seatId}`, {
      method: 'PUT',
      body: JSON.stringify({ status })
    });
  } catch (error) {
    console.error(`Failed to update seat ${seatId} status:`, error);
    throw new Error('Failed to update seat status');
  }
};

// Bookings API
export const createBooking = async (booking: Booking): Promise<Booking> => {
  try {
    return await apiRequest('/bookings', {
      method: 'POST',
      body: JSON.stringify(booking)
    });
  } catch (error) {
    console.error('Failed to create booking:', error);
    throw error;
  }
};

// Find booking by ID and email
export const findBooking = async (bookingId: string, email: string): Promise<Booking | undefined> => {
  try {
    return await apiRequest(`/bookings/find?bookingId=${bookingId}&email=${email}`);
  } catch (error) {
    console.error('Failed to find booking:', error);
    throw new Error('Failed to find booking');
  }
};
