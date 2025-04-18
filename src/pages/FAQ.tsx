
import React from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { HelpCircle, Code, Database, Shield } from 'lucide-react';

const FAQ = () => {
  const faqs = [
    {
      question: "What is CinemaFlow?",
      answer: "CinemaFlow is a movie ticket booking web application created as a DBMS course project. It allows users to browse movies, check showtimes, and simulate booking movie tickets. It's built with React.js (frontend) and SQL Server (backend)."
    },
    {
      question: "Is CinemaFlow a real movie booking platform?",
      answer: "No. CinemaFlow is a student project developed for academic purposes only. It does not connect to real cinemas or process real transactions."
    },
    {
      question: "Do I need to create an account to book tickets?",
      answer: "No account creation is required. Bookings are made using basic information like your name and seat selection."
    },
    {
      question: "Can I cancel or change a booking?",
      answer: "As a demo project, CinemaFlow currently does not support booking cancellations or modifications. Bookings are simulated and stored for demonstration only."
    },
    {
      question: "What technologies were used to build CinemaFlow?",
      answer: "CinemaFlow uses:\n• Frontend: React.js, Tailwind CSS, Vite\n• Backend: SQL Server Management Studio (SSMS)\n• Database: SQL Server for managing movies, showtimes, and bookings",
      icon: <Code className="h-5 w-5 text-cinema-primary" />
    },
    {
      question: "Who developed CinemaFlow?",
      answer: "CinemaFlow was developed by the following students as part of a DBMS project:\n• Hasan Mansoor\n• Shabbir Haider\n• Muhammad Arsalan\n• Syed Danish Khurram\n• Wasif Khan"
    },
    {
      question: "Is my data safe?",
      answer: "Yes. All data entered is only stored locally in a controlled database for academic demonstration. It is not shared or used outside of this project.",
      icon: <Shield className="h-5 w-5 text-cinema-primary" />
    },
    {
      question: "Can I contribute or use this project?",
      answer: "As a student project, it is not currently open for public contributions. However, feel free to contact the team for academic collaboration or learning purposes."
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto bg-card rounded-lg p-8 text-white shadow-lg">
        <div className="flex items-center gap-2 mb-6">
          <HelpCircle className="h-8 w-8 text-cinema-primary" />
          <h1 className="text-3xl font-bold text-cinema-primary">Frequently Asked Questions</h1>
        </div>
        
        <ScrollArea className="h-[calc(100vh-300px)] pr-4">
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-card/50 rounded-lg p-6">
                <div className="flex items-start gap-3">
                  {faq.icon || <HelpCircle className="h-5 w-5 text-cinema-primary mt-1" />}
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{faq.question}</h3>
                    <p className="text-gray-300 whitespace-pre-line">{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default FAQ;
