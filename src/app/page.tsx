"use client";
import React from "react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="antialiased">
      {/* Hero Section */}
      <section className="relative min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 flex flex-col items-center justify-center text-center py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-96 h-96 bg-amber-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-orange-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
        </div>
        <div className="relative z-10 max-w-2xl mx-auto">
          <div className="flex justify-center mb-8">
            <img src="/images/lifewood.png" alt="Life Wood Logo" className="h-20 w-20 rounded-full border-4 border-amber-200 shadow-lg" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600">PT. Life Wood Indonesia</span>
          </h1>
          <p className="text-lg md:text-2xl text-gray-600 mb-8 max-w-xl mx-auto">
            Premium furniture manufacturer specializing in high-quality wooden furniture for global markets. Discover our products, stores, and contact us for partnership opportunities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/brand" className="inline-block px-8 py-4 bg-gradient-to-r from-amber-600 to-orange-600 text-white font-semibold rounded-xl hover:from-amber-700 hover:to-orange-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">Explore Brand</Link>
            <Link href="/products" className="inline-block px-8 py-4 border-2 border-amber-600 text-amber-600 font-semibold rounded-xl hover:bg-amber-600 hover:text-white transition-all duration-300">View Products</Link>
          </div>
        </div>
      </section>

      {/* Highlight Section */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl shadow-lg p-8 flex flex-col items-center text-center hover:-translate-y-2 transition-all duration-300 border border-amber-100">
              <svg className="w-12 h-12 text-amber-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
              </svg>
              <h2 className="text-xl font-bold text-gray-900 mb-2">High Quality</h2>
              <p className="text-gray-600">Crafted from premium teak, mahogany, and meh wood with expert craftsmanship.</p>
            </div>
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl shadow-lg p-8 flex flex-col items-center text-center hover:-translate-y-2 transition-all duration-300 border border-amber-100">
              <svg className="w-12 h-12 text-amber-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h2 className="text-xl font-bold text-gray-900 mb-2">Trusted Since 2015</h2>
              <p className="text-gray-600">Years of experience serving international clients with exclusive designs.</p>
            </div>
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl shadow-lg p-8 flex flex-col items-center text-center hover:-translate-y-2 transition-all duration-300 border border-amber-100">
              <svg className="w-12 h-12 text-amber-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" />
                <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth={2} />
              </svg>
              <h2 className="text-xl font-bold text-gray-900 mb-2">Nationwide Stores</h2>
              <p className="text-gray-600">Find our showrooms and partners across Indonesia and worldwide.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
