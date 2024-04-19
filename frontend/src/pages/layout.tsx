import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import React from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='w-screen min-h-screen bg-bgPrimary relative h-screen overflow-y-scroll'>
      <Navbar />
      <main className='relative my-10 w-full max-w-xs mx-auto sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl 2xl:max-w-[1400px]'>
        {children}
      </main>
      <Footer />
    </div>
  );
}
