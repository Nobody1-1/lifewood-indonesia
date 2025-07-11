"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaPlus, FaEdit, FaTrash, FaSearch, FaUserShield, FaUser } from "react-icons/fa";

export default function UsersPage() {
  const router = useRouter();
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchUsers() {
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
      if (!token) {
        router.push("/auth/login");
        return;
      }
      try {
        const res = await fetch("/api/users", { headers: { Authorization: `Bearer ${token}` } });
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        setError("Gagal mengambil data user");
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
  }, [router]);

  const handleDelete = async (id: string) => {
    if (!confirm("Yakin ingin menghapus user ini?")) return;
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    const res = await fetch(`/api/users/${id}`, { method: "DELETE", headers: { Authorization: `Bearer ${token}` } });
    if (res.ok) {
      setUsers(users.filter((u: any) => u._id !== id));
    } else {
      alert("Gagal menghapus user");
    }
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-2 md:p-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Manajemen User</h1>
        <button
          className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded shadow transition font-semibold"
          onClick={() => router.push("/admin/users/create")}
        >
          <FaPlus /> Tambah User
        </button>
      </div>
      <div className="flex items-center gap-2 mb-4">
        <div className="relative w-full max-w-xs">
          <input
            type="text"
            placeholder="Cari nama/email user..."
            className="w-full pl-10 pr-4 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-red-400"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <div className="overflow-x-auto rounded-xl shadow-lg bg-white dark:bg-gray-800">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
                <th className="px-4 py-2 text-left">Nama</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Role</th>
                <th className="px-4 py-2 text-left">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map(user => (
                <tr key={user._id} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900 transition">
                  <td className="px-4 py-2 font-semibold flex items-center gap-2">
                    {user.role === "admin" ? <FaUserShield className="text-blue-500" /> : <FaUser className="text-gray-400" />}
                    {user.name}
                  </td>
                  <td className="px-4 py-2">{user.email}</td>
                  <td className="px-4 py-2">
                    <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${user.role === "admin" ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200" : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200"}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-4 py-2 flex gap-2">
                    <button
                      className="flex items-center gap-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded shadow text-xs font-semibold transition"
                      onClick={() => router.push(`/admin/users/${user._id}/edit`)}
                    >
                      <FaEdit /> Edit
                    </button>
                    <button
                      className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded shadow text-xs font-semibold transition"
                      onClick={() => handleDelete(user._id)}
                    >
                      <FaTrash /> Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
} 