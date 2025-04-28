
import React, { useState } from 'react';
import { Seat, Booking, Showtime } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { createBooking } from '@/services/api';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

interface BookingFormProps {
  showtime: Showtime;
  selectedSeats: Seat[];
}

// Schema for form validation
const bookingSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Please enter a valid email address")
});

const BookingForm: React.FC<BookingFormProps> = ({ showtime, selectedSeats }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<{name?: string, email?: string}>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const totalPrice = selectedSeats.length * showtime.price;

  const validateForm = () => {
    try {
      bookingSchema.parse({ name, email });
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formattedErrors: {name?: string, email?: string} = {};
        error.errors.forEach(err => {
          if (err.path[0]) {
            formattedErrors[err.path[0] as 'name' | 'email'] = err.message;
          }
        });
        setErrors(formattedErrors);
      }
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (selectedSeats.length === 0) {
      toast({
        title: "No seats selected",
        description: "Please select at least one seat to continue.",
        variant: "destructive"
      });
      return;
    }

    // Validate form before submission
    if (!validateForm()) {
      return;
    }

    // Sanitize inputs - convert to string and trim
    const sanitizedName = String(name).trim();
    const sanitizedEmail = String(email).trim();

    try {
      setIsSubmitting(true);
      
      const booking: Booking = {
        customerName: sanitizedName,
        email: sanitizedEmail,
        showtimeId: showtime.id,
        seatIds: selectedSeats.map(seat => seat.id),
        totalPrice
      };
      
      const result = await createBooking(booking);
      
      toast({
        title: "Booking successful!",
        description: `Your booking ID is ${result.id}. Thank you for your purchase.`,
      });
      
      // Redirect to confirmation page
      navigate('/confirmation', { state: { booking: result } });
      
    } catch (error) {
      console.error("Booking error:", error);
      toast({
        title: "Booking failed",
        description: error instanceof Error ? error.message : "An unexpected error occurred",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-card rounded-lg p-6 animate-fade-in">
      <h3 className="text-xl font-semibold mb-6">Complete Your Booking</h3>
      
      <div className="mb-6 border-b border-white/10 pb-4">
        <h4 className="font-medium mb-2">Order Summary</h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Selected Seats</span>
            <span>
              {selectedSeats.map(seat => `${seat.row}${seat.number}`).join(', ')}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Price per seat</span>
            <span>${showtime.price.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-medium text-base">
            <span>Total</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
            className={`bg-muted text-white ${errors.name ? 'border-red-500' : ''}`}
          />
          {errors.name && (
            <p id="name-error" className="text-sm text-red-500">{errors.name}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={`bg-muted text-white ${errors.email ? 'border-red-500' : ''}`}
          />
          {errors.email && (
            <p id="email-error" className="text-sm text-red-500">{errors.email}</p>
          )}
        </div>
        
        <Button 
          type="submit" 
          className="w-full bg-cinema-primary hover:bg-cinema-secondary text-white"
          disabled={isSubmitting || selectedSeats.length === 0}
        >
          {isSubmitting ? "Processing..." : "Book Now"}
        </Button>
      </form>
    </div>
  );
};

export default BookingForm;
