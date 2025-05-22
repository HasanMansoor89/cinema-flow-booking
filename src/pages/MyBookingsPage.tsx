
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Film, Search } from 'lucide-react';
import { findBooking } from '@/services/api';
import { Booking } from '@/types';

const MyBookingsPage = () => {
  const { toast } = useToast();
  const [bookingId, setBookingId] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [booking, setBooking] = useState<Booking | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (!bookingId || !email) {
      toast({
        title: "Missing information",
        description: "Please enter both booking ID and email",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      const foundBooking = await findBooking(bookingId, email);
      setBooking(foundBooking || null);
      
      if (!foundBooking) {
        toast({
          title: "Booking not found",
          description: "We couldn't find a booking with these details",
          variant: "destructive"
        });
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      setError(errorMessage);
      toast({
        title: "Error finding booking",
        description: errorMessage,
        variant: "destructive"
      });
      setBooking(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-2 mb-8">
        <Film className="h-6 w-6 text-cinema-primary" />
        <h1 className="text-3xl font-bold text-white">My Bookings</h1>
      </div>

      <div className="bg-card rounded-lg p-6 max-w-2xl mx-auto mb-8 border border-white/10">
        <h2 className="text-xl font-semibold mb-4">Find your booking</h2>
        <form onSubmit={handleSearch} className="space-y-4">
          <div>
            <label htmlFor="bookingId" className="block text-sm font-medium mb-1">
              Booking ID
            </label>
            <Input
              id="bookingId"
              value={bookingId}
              onChange={(e) => setBookingId(e.target.value)}
              placeholder="Enter your booking ID"
              className="w-full"
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter the email used for booking"
              className="w-full"
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-cinema-primary hover:bg-cinema-secondary"
            disabled={isLoading}
          >
            {isLoading ? (
              "Searching..."
            ) : (
              <>
                <Search className="w-4 h-4 mr-2" />
                Find Booking
              </>
            )}
          </Button>
        </form>
      </div>

      {error && (
        <div className="max-w-2xl mx-auto bg-red-900/20 border border-red-700 p-4 rounded-lg mb-8">
          <p className="text-red-300">{error}</p>
        </div>
      )}

      {booking && (
        <div className="bg-card rounded-lg p-6 max-w-2xl mx-auto border border-white/10">
          <h2 className="text-xl font-semibold mb-4">Booking Details</h2>
          
          <div className="space-y-4">
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span className="text-gray-400">Booking ID</span>
              <span className="font-semibold">{booking.id}</span>
            </div>
            
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span className="text-gray-400">Customer</span>
              <span>{booking.customerName}</span>
            </div>
            
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span className="text-gray-400">Email</span>
              <span>{booking.email}</span>
            </div>
            
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span className="text-gray-400">Showtime ID</span>
              <span>{booking.showtimeId}</span>
            </div>
            
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span className="text-gray-400">Seats</span>
              <span>{booking.seatIds.join(', ')}</span>
            </div>
            
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span className="text-gray-400">Booking Date</span>
              <span>{booking.bookingDate && new Date(booking.bookingDate).toLocaleString()}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-400">Total Amount</span>
              <span className="text-xl font-bold text-cinema-primary">
                ${booking.totalPrice.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyBookingsPage;
