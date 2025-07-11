"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

export default function ProductDetail() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`/api/products/${id}`)
      .then(res => res.json())
      .then(data => setProduct(data))
      .catch(() => setError("Gagal mengambil data produk"))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="p-8 text-center text-lg text-gray-500">Loading...</div>;
  if (error || !product) return <div className="p-8 text-center text-red-500">{error || "Produk tidak ditemukan"}</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <button
          className="mb-8 flex items-center gap-2 text-amber-600 font-semibold hover:underline hover:text-orange-600 transition-colors"
          onClick={() => router.back()}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Products
        </button>
        <div className="bg-white rounded-2xl shadow-2xl p-8 flex flex-col md:flex-row gap-10 border border-amber-100">
          <div className="md:w-1/2 w-full flex flex-col items-center justify-center">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-80 object-cover rounded-xl shadow-lg border border-amber-100"
            />
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="inline-block px-4 py-1 bg-gradient-to-r from-amber-600 to-orange-600 text-white text-xs font-semibold rounded-full shadow">{product.category}</span>
            </div>
          </div>
          <div className="flex-1 flex flex-col justify-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">{product.name}</h1>
            <div className="text-amber-600 font-bold text-2xl mb-4">Rp {product.price.toLocaleString()}</div>
            <div className="text-gray-700 mb-6 text-lg leading-relaxed">{product.description}</div>
            <div className="flex gap-4 mt-auto">
              <Link
                href="/products"
                className="inline-block px-6 py-3 bg-gradient-to-r from-amber-600 to-orange-600 text-white font-semibold rounded-xl hover:from-amber-700 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Explore More Products
              </Link>
              <Link
                href="/contact"
                className="inline-block px-6 py-3 border-2 border-amber-600 text-amber-600 font-semibold rounded-xl hover:bg-amber-600 hover:text-white transition-all duration-300"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 