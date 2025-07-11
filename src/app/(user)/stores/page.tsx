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
    // Use Netlify Functions endpoint in production
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const apiPath = process.env.NODE_ENV === 'production' 
      ? '/.netlify/functions/stores'
      : '/api/stores';
      
    const response = await fetch(`${baseUrl}${apiPath}`, {
      cache: 'no-store'
    });
    
    if (!response.ok) {
      console.error('Stores API error:', response.status, response.statusText);
      throw new Error(`Failed to fetch stores: ${response.status}`);
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