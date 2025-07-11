"use client";
import React, { useEffect, useState } from "react";

export default function StoreList() {
  const [stores, setStores] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/stores")
      .then(res => res.json())
      .then(data => setStores(data))
      .catch(() => setError("Gagal mengambil data toko"))
      .finally(() => setLoading(false));
  }, []);



  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[220px] bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 flex flex-col items-center justify-center text-center py-12 px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-80 h-80 bg-amber-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute top-0 right-0 w-80 h-80 bg-orange-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
        </div>
        <div className="relative z-10 max-w-2xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600">Stores</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-2">
            Find our official stores and showrooms across Indonesia.
          </p>
        </div>
      </section>

      {/* Store Grid Section */}
      <section className="py-16 bg-white min-h-[60vh]">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-10 text-center">Store Locations</h2>
          {loading ? (
            <div className="text-center text-lg text-gray-500">Loading...</div>
          ) : error ? (
            <div className="text-center text-red-500">{error}</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
              {stores.map(store => (
                <div key={store._id} className="group bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col overflow-hidden border border-amber-100 hover:-translate-y-2">
                  {/* Store Image */}
                  <div className="h-48 w-full overflow-hidden">
                    <img 
                      src={store.image || "/images/store-placeholder.jpg"} 
                      alt={store.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.currentTarget.src = "/images/store-placeholder.jpg";
                      }}
                    />
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-amber-600 transition-colors">{store.name}</h2>
                    <div className="text-gray-700 mb-1 font-medium">{store.address}</div>
                    <div className="text-gray-500 mb-1">Kota: {store.city}</div>
                    <div className="text-gray-500 mb-1">Telepon: {store.phone}</div>
                    {store.location?.lat && store.location?.lng && (
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${store.location.lat},${store.location.lng}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-lg font-semibold hover:from-amber-700 hover:to-orange-700 transition-all duration-300 shadow"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" />
                          <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth={2} />
                        </svg>
                        View on Map
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
} 