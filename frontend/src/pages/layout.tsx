import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import React from 'react'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-screen min-h-screen bg-bgPrimary relative flex flex-col justify-between">
      <Navbar />

      <main className="w-full mx-auto h-auto flex flex-grow flex-col">{children}</main>

      <Footer />
    </div>
  );
}
