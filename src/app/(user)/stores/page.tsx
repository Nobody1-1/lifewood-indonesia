export const dynamic = "force-dynamic";

import React from "react";
import StoresClient from "./StoresClient";

interface Store {
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

async function getStores(): Promise<Store[]> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/stores`, {
      cache: 'no-store'
    });
    if (!response.ok) {
      throw new Error('Failed to fetch stores');
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching stores:', error);
    return [];
  }
}

export default async function StoreList() {
  const stores = await getStores();
  
  return <StoresClient stores={stores} />;
} 