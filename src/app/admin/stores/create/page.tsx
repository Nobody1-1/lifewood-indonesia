"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function CreateStore() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUploading, setImageUploading] = useState(false);
  const [image, setImage] = useState("");
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
      const res = await fetch("/api/stores", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, address, city, phone, location: { lat, lng }, image }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Gagal menambah toko");
      router.push("/admin/stores");
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
    const filePath = `stores/${fileName}`;
    const { data, error: uploadError } = await supabase.storage
      .from("store-images")
      .upload(filePath, imageFile);
    if (uploadError) {
      setError(uploadError.message);
      setImageUploading(false);
      return;
    }
    const { data: publicUrlData } = supabase.storage
      .from("store-images")
      .getPublicUrl(filePath);
    setImage(publicUrlData?.publicUrl || "");
    setImageUrl(publicUrlData?.publicUrl || "");
    setImageUploading(false);
  };

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Tambah Toko</h1>
      {error && <div className="mb-4 text-red-500">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Nama Toko</label>
          <input type="text" className="w-full border rounded p-2" value={name} onChange={e => setName(e.target.value)} required />
        </div>
        <div>
          <label className="block font-medium">Alamat</label>
          <input type="text" className="w-full border rounded p-2" value={address} onChange={e => setAddress(e.target.value)} required />
        </div>
        <div>
          <label className="block font-medium">Kota</label>
          <input type="text" className="w-full border rounded p-2" value={city} onChange={e => setCity(e.target.value)} required />
        </div>
        <div>
          <label className="block font-medium">Telepon</label>
          <input type="text" className="w-full border rounded p-2" value={phone} onChange={e => setPhone(e.target.value)} required />
        </div>
        <div>
          <label className="block font-medium">Gambar Toko</label>
          <input type="file" accept="image/*" className="w-full border rounded p-2" onChange={handleImageChange} />
          <button type="button" onClick={handleImageUpload} disabled={imageUploading || !imageFile} className="mt-2 px-4 py-1 bg-blue-600 text-white rounded disabled:opacity-50">{imageUploading ? "Uploading..." : "Upload Gambar"}</button>
          {imageUrl && (
            <div className="mt-2"><img src={imageUrl} alt="Preview" className="w-32" /></div>
          )}
        </div>
        <div className="flex gap-2">
          <div className="w-1/2">
            <label className="block font-medium">Latitude</label>
            <input type="number" className="w-full border rounded p-2" value={lat} onChange={e => setLat(Number(e.target.value))} required step="any" />
          </div>
          <div className="w-1/2">
            <label className="block font-medium">Longitude</label>
            <input type="number" className="w-full border rounded p-2" value={lng} onChange={e => setLng(Number(e.target.value))} required step="any" />
          </div>
        </div>
        <div className="flex gap-2">
          <button type="submit" className="bg-red-500 text-white px-6 py-2 rounded font-semibold hover:bg-red-600 transition" disabled={loading}>
            {loading ? "Menyimpan..." : "Simpan"}
          </button>
          <button type="button" className="bg-gray-300 text-gray-700 px-6 py-2 rounded font-semibold hover:bg-gray-400 transition" onClick={() => router.push("/admin/stores")}>Batal</button>
        </div>
      </form>
    </div>
  );
} 