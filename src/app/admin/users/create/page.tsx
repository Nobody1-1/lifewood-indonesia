"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateUser() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/auth/login");
      return;
    }
    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, email, password, role }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Gagal menambah user");
      router.push("/admin/users");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Tambah User</h1>
      {error && <div className="mb-4 text-red-500">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Nama</label>
          <input type="text" className="w-full border rounded p-2" value={name} onChange={e => setName(e.target.value)} required />
        </div>
        <div>
          <label className="block font-medium">Email</label>
          <input type="email" className="w-full border rounded p-2" value={email} onChange={e => setEmail(e.target.value)} required />
        </div>
        <div>
          <label className="block font-medium">Password</label>
          <input type="password" className="w-full border rounded p-2" value={password} onChange={e => setPassword(e.target.value)} required />
        </div>
        <div>
          <label className="block font-medium">Role</label>
          <select className="w-full border rounded p-2" value={role} onChange={e => setRole(e.target.value)} required>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <div className="flex gap-2">
          <button type="submit" className="bg-red-500 text-white px-6 py-2 rounded font-semibold hover:bg-red-600 transition" disabled={loading}>
            {loading ? "Menyimpan..." : "Simpan"}
          </button>
          <button type="button" className="bg-gray-300 text-gray-700 px-6 py-2 rounded font-semibold hover:bg-gray-400 transition" onClick={() => router.push("/admin/users")}>Batal</button>
        </div>
      </form>
    </div>
  );
} 