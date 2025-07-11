// src/app/(user)/stores/MapLeaflet.tsx
"use client";

import React, { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css"; // CSS ini aman diimpor di mana saja

// Definisi interface Store Anda
export interface Store {
  _id: string;
  name: string;
  address: string;
  city: string;
  phone: string;
  image?: string;
  location?: {
    lat: number;
    lng: number;
  };
}

export default function MapLeaflet({ stores }: { stores: Store[] }) {
  const [isClient, setIsClient] = useState(false);
  // State untuk menyimpan komponen Leaflet yang diimpor secara dinamis
  const [LeafletComponents, setLeafletComponents] = useState<{
    MapContainer: any;
    TileLayer: any;
    Marker: any;
    Popup: any;
    L: any; // Untuk mengakses objek Leaflet itu sendiri
  } | null>(null);

  useEffect(() => {
    // Efek ini hanya berjalan di sisi klien (browser)
    setIsClient(true);

    // Impor react-leaflet dan leaflet secara dinamis di dalam useEffect
    // Ini memastikan kode mereka hanya dieksekusi di browser
    import("react-leaflet").then((reactLeaflet) => {
      import("leaflet").then((leafletModule) => {
        const L = leafletModule.default; // Leaflet biasanya diekspor sebagai default

        // --- PENTING: Penanganan Icon Leaflet untuk SSR ---
        // Ini adalah solusi umum untuk mengatasi masalah icon Leaflet di Next.js
        // yang mencoba mengakses window/document saat inisialisasi.
        // Pastikan ini hanya berjalan di browser.
        if (typeof window !== "undefined") {
          // Hapus metode _getIconUrl dari prototype default Icon Leaflet
          // Ini mencegah Leaflet mencoba menemukan ikon secara otomatis di lingkungan server.
          const defaultIcon = L.Icon.Default.prototype as any;
          if (defaultIcon._getIconUrl) {
            delete defaultIcon._getIconUrl;
          }

          // Gabungkan opsi default untuk ikon, menunjuk ke URL yang dapat diakses publik
          L.Icon.Default.mergeOptions({
            iconRetinaUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png",
            iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
            shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
          });
        }
        // --- Akhir Penanganan Icon Leaflet ---

        // Simpan komponen dan objek L ke state
        setLeafletComponents({
          MapContainer: reactLeaflet.MapContainer,
          TileLayer: reactLeaflet.TileLayer,
          Marker: reactLeaflet.Marker,
          Popup: reactLeaflet.Popup,
          L: L, // Simpan objek L untuk digunakan nanti (misalnya untuk membuat ikon kustom)
        });
      });
    });

    // Fix leaflet map size bug in Next.js - ini sudah benar
    // Memastikan peta di-render ulang dengan ukuran yang benar setelah mount
    setTimeout(() => {
      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event("resize"));
      }
    }, 500);

  }, []); // Efek ini hanya berjalan sekali saat komponen di-mount di klien

  // Tampilkan loading state jika belum di klien atau komponen belum dimuat
  if (!isClient || !LeafletComponents) {
    return (
      <div className="w-full h-[400px] rounded-xl overflow-hidden z-0 bg-gray-100 flex items-center justify-center">
        <div className="text-gray-500">Loading map...</div>
      </div>
    );
  }

  // Destrukturisasi komponen Leaflet setelah dipastikan dimuat
  const { MapContainer, TileLayer, Marker, Popup, L } = LeafletComponents;

  // Buat ikon menggunakan objek L yang sudah dimuat
  const icon = L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
    shadowSize: [41, 41],
  });

  // Cari store pertama yang punya koordinat untuk center peta
  const firstStoreWithLocation = stores.find(s => s.location?.lat !== undefined && s.location?.lng !== undefined);
  const center: [number, number] = firstStoreWithLocation
    ? [firstStoreWithLocation.location!.lat, firstStoreWithLocation.location!.lng]
    : [-6.2088, 106.8456]; // Default Jakarta jika tidak ada lokasi toko

  return (
    <div className="w-full h-[400px] rounded-xl overflow-hidden z-0">
      <MapContainer center={center} zoom={13} scrollWheelZoom={true} style={{ height: "100%", width: "100%", zIndex: 0 }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {stores.filter(s => s.location?.lat !== undefined && s.location?.lng !== undefined).map(store => (
          <Marker key={store._id} position={[store.location!.lat, store.location!.lng] as [number, number]} icon={icon}>
            <Popup>
              <div>
                <strong>{store.name}</strong><br />
                {store.address}<br />
                {store.city}<br />
                {store.phone}
                <br/>
                {/* Perbaikan URL Google Maps */}
                <a
                   href={`https://www.google.com/maps/search/?api=1&query=${store.location!.lat},${store.location!.lng}`}
                   target="_blank"
                   rel="noopener noreferrer"
                   className="text-blue-500 hover:underline"
                >
                    Lihat di Google Maps
                </a>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}