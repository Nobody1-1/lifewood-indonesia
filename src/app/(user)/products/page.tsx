"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ProductList() {
  const router = useRouter();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/products")
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(() => setError("Gagal mengambil data produk"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[320px] bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 flex flex-col items-center justify-center text-center py-16 px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-80 h-80 bg-amber-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute top-0 right-0 w-80 h-80 bg-orange-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
        </div>
        <div className="relative z-10 max-w-2xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Discover Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600">Premium Furniture</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-6">
            Explore our curated collection of high-quality wooden furniture, crafted for elegance and durability.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/brand" className="inline-block px-6 py-3 bg-gradient-to-r from-amber-600 to-orange-600 text-white font-semibold rounded-xl hover:from-amber-700 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl">About Brand</Link>
            <Link href="/contact" className="inline-block px-6 py-3 border-2 border-amber-600 text-amber-600 font-semibold rounded-xl hover:bg-amber-600 hover:text-white transition-all duration-300">Contact Us</Link>
          </div>
        </div>
      </section>

      {/* Product Grid Section */}
      <section className="py-16 bg-white min-h-[60vh]">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-10 text-center">Our Products</h2>
          {loading ? (
            <div className="text-center text-lg text-gray-500">Loading...</div>
          ) : error ? (
            <div className="text-center text-red-500">{error}</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
              {products.map(product => (
                <div
                  key={product._id}
                  className="group bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer flex flex-col overflow-hidden border border-amber-100 hover:-translate-y-2"
                  onClick={() => router.push(`/products/${product._id}`)}
                >
                  <div className="relative h-56 w-full overflow-hidden">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute top-2 right-2 bg-white/80 text-amber-600 px-3 py-1 rounded-full text-xs font-semibold shadow">{product.category}</div>
                  </div>
                  <div className="p-5 flex-1 flex flex-col">
                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-amber-600 transition-colors">{product.name}</h3>
                    <div className="flex-1"></div>
                    <div className="text-xl font-bold text-amber-600 mb-2">Rp {product.price.toLocaleString()}</div>
                    <button className="mt-2 px-4 py-2 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-lg font-semibold hover:from-amber-700 hover:to-orange-700 transition-all duration-300" onClick={e => {e.stopPropagation(); router.push(`/products/${product._id}`);}}>View Details</button>
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