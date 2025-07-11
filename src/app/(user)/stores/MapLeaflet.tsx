"use client";
import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";

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

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="w-full h-[400px] rounded-xl overflow-hidden z-0 bg-gray-100 flex items-center justify-center">
        <div className="text-gray-500">Loading map...</div>
      </div>
    );
  }

  // Import react-leaflet components only on client
  const { MapContainer, TileLayer, Marker, Popup } = require("react-leaflet");
  
  // Create icon
  const L = require("leaflet");
  const icon = L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
    shadowSize: [41, 41],
  });

  // Cari store pertama yang punya koordinat
  const first = stores.find(s => s.location?.lat !== undefined && s.location?.lng !== undefined);
  const center: [number, number] = first ? [first.location!.lat, first.location!.lng] : [-6.2, 106.8]; // Default Jakarta

  useEffect(() => {
    // Fix leaflet map size bug in Next.js
    setTimeout(() => {
      window.dispatchEvent(new Event("resize"));
    }, 500);
  }, []);

  return (
    <div className="w-full h-[400px] rounded-xl overflow-hidden z-0">
      <MapContainer center={center} zoom={6} scrollWheelZoom={true} style={{ height: "100%", width: "100%", zIndex: 0 }}>
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
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
} 