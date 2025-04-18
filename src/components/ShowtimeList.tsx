
import React from 'react';
import { format, parseISO } from 'date-fns';
import { Showtime } from '@/types';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Calendar, Clock } from 'lucide-react';

interface ShowtimeListProps {
  showtimes: Showtime[];
}

const ShowtimeList: React.FC<ShowtimeListProps> = ({ showtimes }) => {
  // Group showtimes by date
  const groupedShowtimes: Record<string, Showtime[]> = {};
  
  showtimes.forEach(showtime => {
    if (!groupedShowtimes[showtime.date]) {
      groupedShowtimes[showtime.date] = [];
    }
    groupedShowtimes[showtime.date].push(showtime);
  });

  return (
    <div className="space-y-6">
      {Object.entries(groupedShowtimes).map(([date, showtimes]) => (
        <div key={date} className="bg-card rounded-lg p-6 animate-fade-in">
          <div className="flex items-center space-x-2 mb-4">
            <Calendar className="text-cinema-primary h-5 w-5" />
            <h3 className="text-lg font-semibold">
              {format(parseISO(date), 'EEEE, MMMM d, yyyy')}
            </h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {showtimes.map(showtime => (
              <div key={showtime.id} className="border border-white/10 rounded-lg p-4 hover:border-cinema-primary transition-colors">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center space-x-2">
                    <Clock className="text-cinema-primary h-4 w-4" />
                    <span className="font-medium">{showtime.time}</span>
                  </div>
                  <span className="text-sm bg-muted px-2 py-1 rounded">{showtime.hall}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">${showtime.price.toFixed(2)}</span>
                  <Link to={`/booking/${showtime.id}`}>
                    <Button className="bg-cinema-primary hover:bg-cinema-secondary text-white">
                      Book Seats
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ShowtimeList;
