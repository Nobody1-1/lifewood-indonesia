"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditUser() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/auth/login");
      return;
    }
    fetch(`/api/users/${id}`, { headers: { Authorization: `Bearer ${token}` } })
      .then(res => res.json())
      .then(user => {
        setName(user.name);
        setEmail(user.email);
        setRole(user.role);
      })
      .catch(() => setError("Gagal mengambil data user"))
      .finally(() => setLoading(false));
  }, [id, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/auth/login");
      return;
    }
    try {
      const res = await fetch(`/api/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, email, password: password || undefined, role }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Gagal mengupdate user");
      router.push("/admin/users");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Edit User</h1>
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
          <label className="block font-medium">Password (kosongkan jika tidak ingin mengubah)</label>
          <input type="password" className="w-full border rounded p-2" value={password} onChange={e => setPassword(e.target.value)} />
        </div>
        <div>
          <label className="block font-medium">Role</label>
          <select className="w-full border rounded p-2" value={role} onChange={e => setRole(e.target.value)} required>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <div className="flex gap-2">
          <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded font-semibold hover:bg-blue-600 transition" disabled={saving}>
            {saving ? "Menyimpan..." : "Simpan"}
          </button>
          <button type="button" className="bg-gray-300 text-gray-700 px-6 py-2 rounded font-semibold hover:bg-gray-400 transition" onClick={() => router.push("/admin/users")}>Batal</button>
        </div>
      </form>
    </div>
  );
} 