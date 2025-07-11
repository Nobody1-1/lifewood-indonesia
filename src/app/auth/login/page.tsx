"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

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
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Login gagal");
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
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <div className="mb-12 text-center">
          <p className="font-semibold text-black text-4xl">Welcome Back!</p>
          <p className="text-black mt-1 font-semibold">Enter your Credentials to access your account</p>
        </div>
        {error && <div className="mb-4 text-red-500 text-center">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block font-medium">Email</label>
            <input id="email" type="email" className="block mt-1 w-full border rounded p-2" value={email} onChange={e => setEmail(e.target.value)} required autoFocus autoComplete="username" />
          </div>
          <div className="mt-4">
            <div className="flex justify-between">
              <label htmlFor="password" className="block font-medium">Password</label>
              <a className="underline text-sm text-gray-600 hover:text-gray-900" href="#">Forgot your password?</a>
            </div>
            <input id="password" type="password" className="block mt-1 w-full border rounded p-2" value={password} onChange={e => setPassword(e.target.value)} required autoComplete="current-password" />
          </div>
          <div className="block mt-4">
            <label className="inline-flex items-center">
              <input type="checkbox" className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500" name="remember" />
              <span className="ml-2 text-sm text-gray-600">Remember me</span>
            </label>
          </div>
          <div className="flex items-center justify-center mt-4">
            <button type="submit" className="bg-red-500 text-white px-6 py-2 rounded font-semibold hover:bg-red-600 transition" disabled={loading}>
              {loading ? "Logging in..." : "Log in"}
            </button>
          </div>
        </form>
        <div className="mt-20 flex justify-end">
          <p className="text-gray-600">Don't have an account? <a className="text-blue-400" href="/auth/register">Sign Up</a></p>
        </div>
      </div>
    </div>
  );
} 