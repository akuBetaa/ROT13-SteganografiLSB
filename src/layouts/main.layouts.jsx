import React from 'react';

import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { Toaster } from '@/components/ui/toaster';

export default function MainLayout({ children }) {
  return (
    <div className="flex min-h-screen">
      {/* Navbar (Fixed) */}
      <Navbar />
      {/* Main content */}
      <div className="flex-1 ml-60 flex flex-col">
        <main className="flex-1 px-4 md:px-20 py-6">{children}</main>
        <Toaster />
        <Footer />
      </div>
    </div>
  );
}
