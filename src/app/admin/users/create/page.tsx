"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateUserPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        router.push("/admin/users");
      } else {
        alert("Gagal membuat user");
      }
    } catch (err) {
      alert("Error: " + err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Tambah User</h1>
      {/* error && <div className="mb-4 text-red-500">{error}</div> */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Nama</label>
          <input type="text" className="w-full border rounded p-2" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} required />
        </div>
        <div>
          <label className="block font-medium">Email</label>
          <input type="email" className="w-full border rounded p-2" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} required />
        </div>
        <div>
          <label className="block font-medium">Password</label>
          <input type="password" className="w-full border rounded p-2" value={formData.password} onChange={e => setFormData({ ...formData, password: e.target.value })} required />
        </div>
        <div>
          <label className="block font-medium">Role</label>
          <select className="w-full border rounded p-2" value={formData.role} onChange={e => setFormData({ ...formData, role: e.target.value })} required>
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