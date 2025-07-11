"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Registrasi gagal");
      router.push("/auth/login");
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
          <p className="font-semibold text-black text-4xl">Get Started Now!</p>
        </div>
        {error && <div className="mb-4 text-red-500 text-center">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="block font-medium">Name</label>
            <input id="name" type="text" className="block mt-1 w-full border rounded p-2" value={name} onChange={e => setName(e.target.value)} required autoFocus autoComplete="name" />
          </div>
          <div className="mt-4">
            <label htmlFor="email" className="block font-medium">Email</label>
            <input id="email" type="email" className="block mt-1 w-full border rounded p-2" value={email} onChange={e => setEmail(e.target.value)} required autoComplete="username" />
          </div>
          <div className="mt-4">
            <label htmlFor="password" className="block font-medium">Password</label>
            <input id="password" type="password" className="block mt-1 w-full border rounded p-2" value={password} onChange={e => setPassword(e.target.value)} required autoComplete="new-password" />
          </div>
          <div className="flex items-center justify-center mt-6">
            <button type="submit" className="bg-red-500 text-white px-6 py-2 rounded font-semibold hover:bg-red-600 transition" disabled={loading}>
              {loading ? "Registering..." : "Register"}
            </button>
          </div>
        </form>
        <div className="mt-20 flex justify-end">
          <p className="text-gray-600">Have an account? <a className="text-blue-500 ml-1" href="/auth/login">Sign In</a></p>
        </div>
      </div>
    </div>
  );
} 