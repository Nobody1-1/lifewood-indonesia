"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      // Use Netlify Functions endpoint
      const apiUrl = process.env.NODE_ENV === 'production' 
        ? '/.netlify/functions/auth-login'
        : '/api/auth/login';
        
      console.log('Attempting login to:', apiUrl);
      
      const res = await fetch(apiUrl, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({ email, password }),
      });
      
      console.log('Response status:', res.status);
      
      if (!res.ok) {
        let errorMessage = 'Network error';
        try {
          const errorData = await res.json();
          errorMessage = errorData.error || `HTTP error! status: ${res.status}`;
        } catch (parseError) {
          console.error('Failed to parse error response:', parseError);
          errorMessage = `Server error (${res.status})`;
        }
        throw new Error(errorMessage);
      }
      
      const data = await res.json();
      console.log('Login successful:', data);
      
      // Simpan token ke localStorage/sessionStorage sesuai kebutuhan
      if (typeof window !== "undefined") {
        localStorage.setItem("token", data.token);
      }
      
      // Cek role user untuk menentukan redirect
      try {
        const payload = JSON.parse(atob(data.token.split(".")[1]));
        if (payload.role === "admin") {
          router.push("/admin/dashboard");
        } else {
          router.push("/brand");
        }
      } catch {
        // Fallback jika parsing token gagal
        router.push("/brand");
      }
    } catch (err: any) {
      console.error('Login error:', err);
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

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
            Welcome <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600">Back!</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-2">
            Sign in to your account to continue your journey with Life Wood Indonesia.
          </p>
        </div>
      </section>

      {/* Login Form Section */}
      <section className="py-16 bg-white min-h-[60vh]">
        <div className="max-w-md mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-xl border border-amber-100 overflow-hidden">
            {/* Logo Header */}
            <div className="bg-gradient-to-r from-amber-600 to-orange-600 p-6 text-center">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Image src="/images/lifewood.png" alt="Logo" width={40} height={40} className="h-10 w-auto" />
                <span className="text-xl font-bold text-white">Life Wood Indonesia</span>
              </div>
              <p className="text-amber-100 text-sm">Enter your credentials to access your account</p>
            </div>

            {/* Form */}
            <div className="p-8">
              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="font-semibold">Login Failed</span>
                  </div>
                  <p className="text-sm">{error}</p>
                  <p className="text-xs mt-2 text-red-500">
                    Please check your credentials and try again.
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input 
                    id="email" 
                    type="email" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 bg-gray-50 hover:bg-white" 
                    value={email} 
                    onChange={e => setEmail(e.target.value)} 
                    required 
                    autoFocus 
                    autoComplete="username"
                    placeholder="Enter your email"
                    disabled={loading}
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
                      Password
                    </label>
                    <Link href="#" className="text-sm text-amber-600 hover:text-amber-700 font-medium transition-colors">
                      Forgot password?
                    </Link>
                  </div>
                  <input 
                    id="password" 
                    type="password" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 bg-gray-50 hover:bg-white" 
                    value={password} 
                    onChange={e => setPassword(e.target.value)} 
                    required 
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    disabled={loading}
                  />
                </div>

                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    id="remember" 
                    className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
                    disabled={loading}
                  />
                  <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
                    Remember me
                  </label>
                </div>

                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-amber-600 to-orange-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-amber-700 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Signing in...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                      </svg>
                      Sign In
                    </>
                  )}
                </button>
              </form>

              {/* Divider */}
              <div className="my-8 flex items-center">
                <div className="flex-1 border-t border-gray-300"></div>
                <span className="px-4 text-sm text-gray-500">or</span>
                <div className="flex-1 border-t border-gray-300"></div>
              </div>

              {/* Social Login */}
              <div className="space-y-3">
                <button className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span className="text-gray-700 font-medium">Continue with Google</span>
                </button>
              </div>

              {/* Sign Up Link */}
              <div className="mt-8 text-center">
                <p className="text-gray-600">
                  Don't have an account?{" "}
                  <Link href="/auth/register" className="text-amber-600 hover:text-amber-700 font-semibold transition-colors">
                    Sign up here
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
} 