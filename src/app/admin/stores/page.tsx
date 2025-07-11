"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaPlus, FaEdit, FaTrash, FaSearch } from "react-icons/fa";

export default function AdminStoreList() {
  const router = useRouter();
  const [stores, setStores] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/auth/login");
      return;
    }
    fetch("/api/stores")
      .then(res => res.json())
      .then(data => setStores(data))
      .catch(() => setError("Gagal mengambil data store"))
      .finally(() => setLoading(false));
  }, [router]);

  const handleDelete = async (id: string) => {
    if (!confirm("Yakin ingin menghapus toko ini?")) return;
    const token = localStorage.getItem("token");
    const res = await fetch(`/api/stores/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) {
      setStores(stores.filter(s => s._id !== id));
    } else {
      alert("Gagal menghapus toko");
    }
  };

  const filteredStores = stores.filter(store =>
    store.name.toLowerCase().includes(search.toLowerCase()) ||
    store.city.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-2 md:p-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Manajemen Toko</h1>
        <button
          className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded shadow transition font-semibold"
          onClick={() => router.push("/admin/stores/create")}
        >
          <FaPlus /> Tambah Toko
        </button>
      </div>
      <div className="flex items-center gap-2 mb-4">
        <div className="relative w-full max-w-xs">
          <input
            type="text"
            placeholder="Cari nama/kota toko..."
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
                <th className="px-4 py-2 text-left">Alamat</th>
                <th className="px-4 py-2 text-left">Kota</th>
                <th className="px-4 py-2 text-left">Telepon</th>
                <th className="px-4 py-2 text-left">Gambar</th>
                <th className="px-4 py-2 text-left">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredStores.map(store => (
                <tr key={store._id} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900 transition">
                  <td className="px-4 py-2 font-semibold">{store.name}</td>
                  <td className="px-4 py-2">{store.address}</td>
                  <td className="px-4 py-2">
                    <span className="inline-block px-2 py-1 rounded bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 text-xs font-semibold">
                      {store.city}
                    </span>
                  </td>
                  <td className="px-4 py-2">{store.phone}</td>
                  <td className="px-4 py-2">
                    {store.image && (
                      <img src={store.image} alt={store.name} className="w-16 h-16 object-cover rounded shadow border border-gray-200 dark:border-gray-700" />
                    )}
                  </td>
                  <td className="px-4 py-2 flex gap-2">
                    <button
                      className="flex items-center gap-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded shadow text-xs font-semibold transition"
                      onClick={() => router.push(`/admin/stores/${store._id}/edit`)}
                    >
                      <FaEdit /> Edit
                    </button>
                    <button
                      className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded shadow text-xs font-semibold transition"
                      onClick={() => handleDelete(store._id)}
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