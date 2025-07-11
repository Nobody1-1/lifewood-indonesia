"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";

const navLinks = [
  { href: "/brand", label: "Brand" },
  { href: "/products", label: "Product" },
  { href: "/stores", label: "Store" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const payload = JSON.parse(atob(token.split(".")[1]));
          setUserData(payload);
          setIsLoggedIn(true);
        } catch {
          if (typeof window !== "undefined") {
            localStorage.removeItem("token");
          }
          setIsLoggedIn(false);
        }
      }
    }
  }, []);

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
    }
    setIsLoggedIn(false);
    setUserData(null);
    router.push("/");
  };

  return (
    <nav className="bg-white shadow-lg border-b border-amber-100 sticky top-0 z-50">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Link href="/brand" className="shrink-0 flex items-center gap-3 group">
              <Image src="/images/lifewood.png" alt="Logo" width={40} height={40} className="h-10 w-auto group-hover:scale-110 transition-transform duration-300" />
              <span className="text-xl font-bold text-gray-900 group-hover:text-amber-600 transition-colors">Life Wood Indonesia</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center gap-8">
            {navLinks.map(link => (
              <Link 
                key={link.href} 
                href={link.href} 
                className="font-medium text-gray-700 hover:text-amber-600 transition-colors duration-300 relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-600 to-orange-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
            
            {/* Auth Buttons */}
            {isLoggedIn ? (
              <div className="relative group">
                <button className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-amber-600 to-orange-600 text-white font-semibold rounded-xl hover:from-amber-700 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl">
                  <span>{userData?.name || "User"}</span>
                  <svg className="ml-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white border border-amber-100 rounded-xl shadow-xl hidden group-hover:block z-10 overflow-hidden">
                  <div className="px-4 py-3 border-b border-amber-100">
                    <p className="text-sm text-gray-500">Signed in as</p>
                    <p className="text-sm font-semibold text-gray-900">{userData?.email}</p>
                  </div>
                  <Link href="/profile" className="block px-4 py-3 text-gray-700 hover:bg-amber-50 transition-colors">
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      Profile
                    </div>
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-amber-50 transition-colors"
                  >
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      Log Out
                    </div>
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link 
                  href="/auth/login" 
                  className="px-4 py-2 text-amber-600 font-semibold hover:text-amber-700 transition-colors"
                >
                  Login
                </Link>
                <Link 
                  href="/auth/register" 
                  className="px-4 py-2 bg-gradient-to-r from-amber-600 to-orange-600 text-white font-semibold rounded-xl hover:from-amber-700 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button 
              onClick={() => setOpen(!open)} 
              className="inline-flex items-center justify-center p-2 rounded-xl text-gray-400 hover:text-amber-600 hover:bg-amber-50 focus:outline-none transition-all duration-300"
            >
              <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                <path className={open ? "hidden" : "inline-flex"} strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                <path className={open ? "inline-flex" : "hidden"} strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-amber-100 shadow-lg">
          <div className="px-4 py-6 space-y-4">
            {navLinks.map(link => (
              <Link 
                key={link.href} 
                href={link.href} 
                className="block px-4 py-3 text-gray-700 hover:bg-amber-50 hover:text-amber-600 rounded-xl transition-all duration-300"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            
            {/* Mobile Auth */}
            {isLoggedIn ? (
              <div className="pt-4 border-t border-amber-100">
                <div className="px-4 py-3 mb-3 bg-amber-50 rounded-xl">
                  <p className="text-sm text-gray-500">Signed in as</p>
                  <p className="text-sm font-semibold text-gray-900">{userData?.email}</p>
                </div>
                <Link 
                  href="/profile" 
                  className="block px-4 py-3 text-gray-700 hover:bg-amber-50 rounded-xl transition-colors"
                  onClick={() => setOpen(false)}
                >
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Profile
                  </div>
                </Link>
                <button 
                  onClick={() => { handleLogout(); setOpen(false); }}
                  className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-amber-50 rounded-xl transition-colors"
                >
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Log Out
                  </div>
                </button>
              </div>
            ) : (
              <div className="pt-4 border-t border-amber-100 space-y-3">
                <Link 
                  href="/auth/login" 
                  className="block px-4 py-3 text-amber-600 font-semibold hover:bg-amber-50 rounded-xl transition-colors"
                  onClick={() => setOpen(false)}
                >
                  Login
                </Link>
                <Link 
                  href="/auth/register" 
                  className="block px-4 py-3 bg-gradient-to-r from-amber-600 to-orange-600 text-white font-semibold rounded-xl hover:from-amber-700 hover:to-orange-700 transition-all duration-300 text-center"
                  onClick={() => setOpen(false)}
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
} 