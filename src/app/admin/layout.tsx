// src/app/admin/layout.tsx atau di mana pun Anda menempatkan AdminLayout
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

// Definisi navigasi untuk sidebar admin
const adminNav = [
  { href: "/admin/dashboard", label: "Dashboard" },
  { href: "/admin/products", label: "Produk" },
  { href: "/admin/stores", label: "Toko" },
  { href: "/admin/users", label: "User" },
];

// Fungsi helper untuk mengurai JWT
function parseJwt(token: string) {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch {
    return null;
  }
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  // State untuk menampilkan loading saat memeriksa autentikasi
  const [loading, setLoading] = useState(true);

  // State untuk dark mode, diinisialisasi dari localStorage
  const [dark, setDark] = useState(() => {
    // Pastikan kode ini hanya berjalan di sisi klien (browser)
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme");
      // Jika ada 'theme' di localStorage, kembalikan true jika nilainya 'dark',
      // jika tidak ada atau bukan 'dark', default ke false (light mode)
      return savedTheme === "dark";
    }
    // Default ke false (light mode) untuk render awal di server
    return false;
  });

  // Effect hook untuk mengelola kelas 'dark' pada elemen <html>
  // dan menyimpan preferensi tema ke localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (dark) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }
    }
  }, [dark]); // Efek ini akan berjalan setiap kali nilai 'dark' berubah

  // Effect hook untuk memeriksa autentikasi dan peran user
  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

    if (!token) {
      router.replace("/auth/login"); // Redirect ke halaman login jika tidak ada token
      return;
    }

    const payload = parseJwt(token);
    // Redirect jika payload tidak valid atau peran bukan 'admin'
    if (!payload || payload.role !== "admin") {
      router.replace("/"); // Atau ke halaman error/dashboard non-admin
      return;
    }

    setLoading(false); // Selesai loading setelah verifikasi berhasil
  }, [router]); // Hanya bergantung pada 'router'

  // Tampilkan loading screen selama proses verifikasi
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-200">
        Loading...
      </div>
    );
  }

  // Render layout admin jika autentikasi berhasil
  return (
    <div className={`flex min-h-screen ${dark ? "bg-gray-900" : "bg-gray-100"}`}>
      {/* Sidebar Admin */}
      <aside className={`w-64 h-screen sticky top-0 left-0 flex flex-col bg-white dark:bg-gray-800 shadow-lg p-6 gap-4`}>
        {/* Logo dan Judul Panel */}
        <div className="mb-8 flex items-center gap-2">
          <img src="/images/lifewood.png" alt="Logo" className="h-10 w-10 rounded-full border border-gray-200 dark:border-gray-700" />
          <span className="text-xl font-bold text-red-600 dark:text-red-400">Admin Panel</span>
        </div>
        {/* Navigasi Utama */}
        <nav className="flex flex-col gap-2 flex-1">
          {adminNav.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-3 py-2 rounded font-medium transition-colors ${
                pathname === link.href
                  ? "bg-red-500 text-white dark:bg-red-400 dark:text-gray-900" // Warna aktif
                  : "text-gray-700 dark:text-gray-200 hover:bg-red-100 dark:hover:bg-gray-700" // Warna tidak aktif
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        {/* Tombol Dark Mode Toggle */}
        <button
          onClick={() => setDark(d => !d)} // Toggle state 'dark'
          className="mt-8 px-3 py-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition"
        >
          {dark ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
        {/* Tombol Logout */}
        <button
          onClick={() => {
            localStorage.removeItem("token");
            router.replace("/");
          }}
          className="mt-4 px-3 py-2 rounded bg-red-500 text-white font-semibold hover:bg-red-600 transition"
        >
          Logout
        </button>
      </aside>

      {/* Konten Utama Admin */}
      <main className="flex-1 p-8 transition-colors bg-gray-100 dark:bg-gray-900">{children}</main>
    </div>
  );
}