
import React from 'react';
import { useLocation, Navigate, Link } from 'react-router-dom';
import { Booking } from '@/types';
import { Button } from '@/components/ui/button';
import { CheckCircle, Ticket, ArrowRight } from 'lucide-react';

const ConfirmationPage: React.FC = () => {
  const location = useLocation();
  const booking = location.state?.booking as Booking | undefined;

  if (!booking) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="container mx-auto px-4 py-16 max-w-2xl">
      <div className="bg-card rounded-lg p-8 shadow-lg border border-white/10">
        <div className="flex flex-col items-center justify-center mb-8">
          <CheckCircle className="text-green-500 h-16 w-16 mb-4" />
          <h1 className="text-3xl font-bold text-center">Booking Confirmed!</h1>
          <p className="text-gray-400 text-center mt-2">
            Your tickets have been booked successfully
          </p>
        </div>
        
        <div className="border-t border-b border-white/10 py-6 my-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-400">Booking ID</span>
            <span className="font-semibold">{booking.id}</span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-400">Customer</span>
            <span>{booking.customerName}</span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-400">Email</span>
            <span>{booking.email}</span>
          </div>
          {booking.bookingDate && (
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-400">Booking Date</span>
              <span>{new Date(booking.bookingDate).toLocaleString()}</span>
            </div>
          )}
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-400">Total Amount</span>
            <span className="text-xl font-bold text-cinema-primary">
              ${booking.totalPrice.toFixed(2)}
            </span>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Button
            className="bg-cinema-primary hover:bg-cinema-secondary text-white"
            asChild
          >
            <Link to="/">
              <Ticket className="mr-2 h-4 w-4" /> Book Another Movie
            </Link>
          </Button>
          <Button variant="outline" className="border-white/20" asChild>
            <Link to="/my-bookings">
              View My Bookings <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPage;
