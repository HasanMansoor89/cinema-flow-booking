
import React, { useState } from 'react';
import { Seat } from '@/types';
import { cn } from '@/lib/utils';

interface SeatGridProps {
  seats: Seat[];
  onSeatSelect: (seat: Seat) => void;
  selectedSeats: Seat[];
}

const SeatGrid: React.FC<SeatGridProps> = ({ seats, onSeatSelect, selectedSeats }) => {
  // Group seats by row
  const seatsByRow: Record<string, Seat[]> = {};
  
  seats.forEach(seat => {
    if (!seatsByRow[seat.row]) {
      seatsByRow[seat.row] = [];
    }
    seatsByRow[seat.row].push(seat);
  });

  // Sort the rows in alphabetical order
  const sortedRows = Object.keys(seatsByRow).sort();

  const handleSeatClick = (seat: Seat) => {
    if (seat.status === 'booked') return;
    onSeatSelect(seat);
  };

  const isSeatSelected = (seat: Seat) => {
    return selectedSeats.some(s => s.id === seat.id);
  };

  return (
    <div className="w-full max-w-3xl mx-auto mt-10">
      <div className="screen mb-10"></div>
      
      <div className="flex justify-center mb-8">
        <div className="flex space-x-4">
          <div className="flex items-center">
            <div className="seat-available w-4 h-4 mr-2"></div>
            <span className="text-sm">Available</span>
          </div>
          <div className="flex items-center">
            <div className="seat-selected w-4 h-4 mr-2"></div>
            <span className="text-sm">Selected</span>
          </div>
          <div className="flex items-center">
            <div className="seat-booked w-4 h-4 mr-2"></div>
            <span className="text-sm">Booked</span>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col items-center space-y-2">
        {sortedRows.map(row => (
          <div key={row} className="flex items-center">
            <div className="w-6 font-bold mr-2">{row}</div>
            <div className="flex">
              {seatsByRow[row].sort((a, b) => a.number - b.number).map(seat => (
                <div
                  key={seat.id}
                  className={cn(
                    "seat",
                    seat.status === 'booked' && "seat-booked",
                    seat.status === 'available' && !isSeatSelected(seat) && "seat-available",
                    isSeatSelected(seat) && "seat-selected"
                  )}
                  onClick={() => handleSeatClick(seat)}
                >
                  {seat.number}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SeatGrid;
