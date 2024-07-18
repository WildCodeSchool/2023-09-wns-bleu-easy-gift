import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import React from 'react'

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className='w-screen min-h-screen bg-bgPrimary relative  flex flex-col justify-between'>
            <Navbar />

            <main className='mt-7 w-full mx-auto h-auto md:mt-12 lg:mt-14 xl:mt-16 2xl:mt-20'>
                {children}
            </main>

            <Footer />
        </div>
    )
}
