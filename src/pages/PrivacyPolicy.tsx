
import React from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Shield } from 'lucide-react';

const PrivacyPolicy = () => {
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto bg-card rounded-lg p-8 text-white shadow-lg">
        <div className="flex items-center gap-2 mb-6">
          <Shield className="h-8 w-8 text-cinema-primary" />
          <h1 className="text-3xl font-bold text-cinema-primary">Privacy Policy</h1>
        </div>
        
        <ScrollArea className="h-[calc(100vh-300px)] pr-4">
          <div className="space-y-6">
            <p className="text-gray-400">Effective Date: {currentDate}</p>
            
            <div className="prose prose-invert">
              <p>CinemaFlow respects your privacy and is committed to protecting the limited personal information collected through this academic project. This policy explains what information we collect, how we use it, and your rights regarding that data.</p>
              
              <h2 className="text-xl font-semibold text-cinema-primary mt-6">1. Information We Collect</h2>
              <p>We collect the following information when you use the CinemaFlow platform:</p>
              <ul className="list-disc pl-6 text-gray-300">
                <li>Name (used during booking)</li>
                <li>Movie selection, showtime, and number of seats booked</li>
              </ul>
              <p>No sensitive data (like passwords, email addresses, or payment details) is collected or stored.</p>
              
              <h2 className="text-xl font-semibold text-cinema-primary mt-6">2. How We Use Your Information</h2>
              <p>The information collected is used solely to:</p>
              <ul className="list-disc pl-6 text-gray-300">
                <li>Simulate the movie ticket booking process</li>
                <li>Store booking records in a SQL Server database for academic demonstration purposes</li>
              </ul>
              <p>We do not share, sell, or use this data for any commercial or marketing purposes.</p>
              
              <h2 className="text-xl font-semibold text-cinema-primary mt-6">3. Data Storage</h2>
              <p>All user data is stored securely on a local database managed using SQL Server Management Studio (SSMS). The data is only accessible to the development team and is not hosted publicly or externally.</p>
              
              <h2 className="text-xl font-semibold text-cinema-primary mt-6">4. Data Retention</h2>
              <p>Since CinemaFlow is a student project, any data collected may be cleared periodically or at the end of the project's lifecycle. No data is retained beyond what is needed for the demonstration.</p>
              
              <h2 className="text-xl font-semibold text-cinema-primary mt-6">5. Security Measures</h2>
              <p>While no real transactions occur on CinemaFlow, we have implemented basic safeguards to protect the integrity of the data stored. This includes:</p>
              <ul className="list-disc pl-6 text-gray-300">
                <li>Secure access to the database</li>
                <li>Proper validation of inputs to avoid malicious use</li>
              </ul>
              
              <h2 className="text-xl font-semibold text-cinema-primary mt-6">6. Your Rights</h2>
              <p>As a user of this educational platform, you have the right to:</p>
              <ul className="list-disc pl-6 text-gray-300">
                <li>Know what information is stored</li>
                <li>Request deletion of your booking record (upon contacting the developers)</li>
              </ul>
              
              <h2 className="text-xl font-semibold text-cinema-primary mt-6">7. Contact Information</h2>
              <p>For any concerns about your data or this privacy policy, please contact the project contributors:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                {[
                  'Hasan Mansoor',
                  'Shabbir Haider',
                  'Muhammad Arsalan',
                  'Syed Danish Khurram',
                  'Wasif Khan'
                ].map((member, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-cinema-primary" />
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

export default PrivacyPolicy;
