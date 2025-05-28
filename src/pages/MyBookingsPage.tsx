import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Film, Search, Trash2 } from 'lucide-react';
import { deleteBooking } from '@/services/api';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const MyBookingsPage = () => {
  const { toast } = useToast();
  const [bookingId, setBookingId] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [booking, setBooking] = useState<any>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingId || !email) {
      toast({
        title: "Missing information",
        description: "Please enter both booking ID and email",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    // This would normally be a real API call
    setTimeout(() => {
      // Mock booking data - in a real app, this would come from an API
      if (bookingId === '1' && email === 'hasan@gmail.com') {
        setBooking({
          id: '1',
          movie: 'Inception',
          date: '2023-05-10',
          time: '19:00',
          seats: ['A1', 'A2'],
          totalPrice: 25.98,
          customerName: 'Hasan',
          email: 'hasan@gmail.com',
          bookingDate: new Date().toISOString()
        });
      } else {
        toast({
          title: "Booking not found",
          description: "We couldn't find a booking with these details",
          variant: "destructive"
        });
        setBooking(null);
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleDeleteBooking = async () => {
    if (!booking) return;
    
    setIsDeleting(true);
    
    try {
      await deleteBooking(parseInt(booking.id));
      
      toast({
        title: "Booking cancelled",
        description: "Your booking has been successfully cancelled and seats have been freed up. The booking ID is now available for reuse.",
      });
      setBooking(null);
      setBookingId('');
      setEmail('');
    } catch (error) {
      console.error('Error cancelling booking:', error);
      toast({
        title: "Error",
        description: "Failed to cancel booking. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsDeleting(false);
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

      {booking && (
        <div className="bg-card rounded-lg p-6 max-w-2xl mx-auto border border-white/10">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Booking Details</h2>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button 
                  variant="destructive" 
                  size="sm"
                  disabled={isDeleting}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Cancel Booking
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Cancel Booking</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to cancel this booking? This action cannot be undone and you may be subject to cancellation fees.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Keep Booking</AlertDialogCancel>
                  <AlertDialogAction 
                    onClick={handleDeleteBooking}
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    disabled={isDeleting}
                  >
                    {isDeleting ? "Cancelling..." : "Cancel Booking"}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span className="text-gray-400">Booking ID</span>
              <span className="font-semibold">{booking.id}</span>
            </div>
            
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span className="text-gray-400">Movie</span>
              <span>{booking.movie}</span>
            </div>
            
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span className="text-gray-400">Date & Time</span>
              <span>{booking.date} at {booking.time}</span>
            </div>
            
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span className="text-gray-400">Seats</span>
              <span>{booking.seats.join(', ')}</span>
            </div>
            
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span className="text-gray-400">Customer</span>
              <span>{booking.customerName}</span>
            </div>
            
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span className="text-gray-400">Email</span>
              <span>{booking.email}</span>
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
