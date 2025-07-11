"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function CreateProduct() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUploading, setImageUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (!token) {
      router.push("/auth/login");
      return;
    }
    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, category, price, description, image }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Gagal menambah produk");
      router.push("/admin/products");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setImageFile(file || null);
    setError("");
  };

  const handleImageUpload = async () => {
    if (!imageFile) {
      setError("Pilih file gambar terlebih dahulu.");
      return;
    }
    setImageUploading(true);
    setError("");
    const fileExt = imageFile.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `products/${fileName}`;
    const { data, error: uploadError } = await supabase.storage
      .from("product-images")
      .upload(filePath, imageFile);
    if (uploadError) {
      setError(uploadError.message);
      setImageUploading(false);
      return;
    }
    const { data: publicUrlData } = supabase.storage
      .from("product-images")
      .getPublicUrl(filePath);
    setImage(publicUrlData?.publicUrl || "");
    setImageUrl(publicUrlData?.publicUrl || "");
    setImageUploading(false);
  };

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Tambah Produk</h1>
      {error && <div className="mb-4 text-red-500">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Nama Produk</label>
          <input type="text" className="w-full border rounded p-2" value={name} onChange={e => setName(e.target.value)} required />
        </div>
        <div>
          <label className="block font-medium">Kategori</label>
          <input type="text" className="w-full border rounded p-2" value={category} onChange={e => setCategory(e.target.value)} required />
        </div>
        <div>
          <label className="block font-medium">Harga</label>
          <input type="number" className="w-full border rounded p-2" value={price} onChange={e => setPrice(Number(e.target.value))} required min={0} />
        </div>
        <div>
          <label className="block font-medium">Deskripsi</label>
          <textarea className="w-full border rounded p-2" value={description} onChange={e => setDescription(e.target.value)} required />
        </div>
        <div>
          <label className="block font-medium">Gambar Produk</label>
          <input type="file" accept="image/*" className="w-full border rounded p-2" onChange={handleImageChange} />
          <button type="button" onClick={handleImageUpload} disabled={imageUploading || !imageFile} className="mt-2 px-4 py-1 bg-blue-600 text-white rounded disabled:opacity-50">{imageUploading ? "Uploading..." : "Upload Gambar"}</button>
          {imageUrl && (
            <div className="mt-2"><img src={imageUrl} alt="Preview" className="w-32" /></div>
          )}
        </div>
        <div className="flex gap-2">
          <button type="submit" className="bg-red-500 text-white px-6 py-2 rounded font-semibold hover:bg-red-600 transition" disabled={loading}>
            {loading ? "Menyimpan..." : "Simpan"}
          </button>
          <button type="button" className="bg-gray-300 text-gray-700 px-6 py-2 rounded font-semibold hover:bg-gray-400 transition" onClick={() => router.push("/admin/products")}>Batal</button>
        </div>
      </form>
    </div>
  );
} 