
import React from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileText, Users } from 'lucide-react';

const TermsOfService = () => {
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto bg-card rounded-lg p-8 text-white shadow-lg">
        <div className="flex items-center gap-2 mb-6">
          <FileText className="h-8 w-8 text-cinema-primary" />
          <h1 className="text-3xl font-bold text-cinema-primary">Terms of Service</h1>
        </div>
        <ScrollArea className="h-[calc(100vh-300px)] pr-4">
          <div className="space-y-6">
            <p className="text-gray-400">Effective Date: {currentDate}</p>
            
            <div className="prose prose-invert">
              <p>Welcome to CinemaFlow, a movie ticket booking platform created as part of an academic project. By accessing or using our website, you agree to be bound by the following terms and conditions. If you do not agree to these terms, please do not use the service.</p>
              
              <h2 className="text-xl font-semibold text-cinema-primary mt-6">1. Use of the Service</h2>
              <p>CinemaFlow allows users to:</p>
              <ul className="list-disc pl-6 text-gray-300">
                <li>View available movies and showtimes</li>
                <li>Book tickets by selecting available seats</li>
                <li>Receive booking confirmations</li>
              </ul>
              <p>This service is provided for educational and demonstration purposes only. Real monetary transactions or actual bookings are not facilitated.</p>
              
              <h2 className="text-xl font-semibold text-cinema-primary mt-6">2. User Responsibilities</h2>
              <p>By using CinemaFlow, you agree to:</p>
              <ul className="list-disc pl-6 text-gray-300">
                <li>Provide accurate information when booking tickets</li>
                <li>Use the platform only for lawful purposes</li>
                <li>Avoid any attempts to disrupt or interfere with the platform's functionality</li>
              </ul>
              
              <h2 className="text-xl font-semibold text-cinema-primary mt-6">3. Data Usage</h2>
              <p>CinemaFlow may store basic user inputs such as:</p>
              <ul className="list-disc pl-6 text-gray-300">
                <li>Name</li>
                <li>Number of seats booked</li>
                <li>Selected movie and showtime</li>
              </ul>
              <p>This information is stored solely within a SQL Server database for demonstration purposes and is not shared with any third parties.</p>
              
              <h2 className="text-xl font-semibold text-cinema-primary mt-6">4. Intellectual Property</h2>
              <p>All content on this platform—including logos, layout, and original code—is the intellectual property of the project contributors and may not be reused or reproduced without permission.</p>
              
              <h2 className="text-xl font-semibold text-cinema-primary mt-6">5. Disclaimer</h2>
              <p>CinemaFlow is a student-developed application created for academic purposes. It is not affiliated with any real cinema or ticketing provider. We do not guarantee the availability, accuracy, or reliability of the service.</p>
              
              <h2 className="text-xl font-semibold text-cinema-primary mt-6">6. Modifications</h2>
              <p>We reserve the right to modify these terms at any time. Any changes will be reflected on this page with an updated effective date.</p>
              
              <h2 className="text-xl font-semibold text-cinema-primary mt-6">7. Contact</h2>
              <p>For questions or feedback, please contact any of the project contributors:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                {[
                  'Hasan Mansoor',
                  'Shabbir Haider',
                  'Muhammad Arsalan',
                  'Syed Danish Khurram',
                  'Wasif Khan'
                ].map((member, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-cinema-primary" />
                    <span>{member}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default TermsOfService;
