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
    // First, test database connectivity
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const testUrl = `${baseUrl}/api/test-db`;
    
    console.log('Testing database connection...');
    const testResponse = await fetch(testUrl, { cache: 'no-store' });
    
    if (!testResponse.ok) {
      console.error('Database connection test failed:', testResponse.status);
      throw new Error('Database connection failed');
    }
    
    const testResult = await testResponse.json();
    console.log('Database test result:', testResult);
    
    // Determine the correct API endpoint
    const isProduction = process.env.NODE_ENV === 'production';
    
    let apiPath: string;
    if (isProduction) {
      apiPath = '/.netlify/functions/stores';
    } else {
      apiPath = '/api/stores';
    }
    
    const url = `${baseUrl}${apiPath}`;
    console.log('Fetching stores from:', url);
    
    const response = await fetch(url, {
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    console.log('Response status:', response.status);
    
    if (!response.ok) {
      console.error('Stores API error:', response.status, response.statusText);
      throw new Error(`Failed to fetch stores: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log('Stores data received:', data);
    
    // Ensure we return an array
    if (!Array.isArray(data)) {
      console.error('Invalid data format received:', data);
      return [];
    }
    
    return data;
  } catch (error) {
    console.error('Error fetching stores:', error);
    
    // Return sample data as fallback for development
    if (process.env.NODE_ENV === 'development') {
      console.log('Returning sample data for development...');
      return [
        {
          _id: 'sample-1',
          name: 'PT. Life Wood Indonesia - Main Office',
          address: 'Jl. Sultan Hadlirin KM.02 Ds. Langon RT.11 RW.05',
          city: 'Jepara',
          phone: '0812-2744-4678',
          image: '/images/lifewood.png',
          location: {
            lat: -6.5885,
            lng: 110.6684
          }
        },
        {
          _id: 'sample-2',
          name: 'Life Wood Showroom Jakarta',
          address: 'Jl. Sudirman No. 123, Jakarta Pusat',
          city: 'Jakarta',
          phone: '021-12345678',
          image: '/images/furniture.jpg',
          location: {
            lat: -6.2088,
            lng: 106.8456
          }
        }
      ];
    }
    
    // Return empty array as fallback
    return [];
  }
}

export default async function StoreList() {
  const stores = await getStores();
  
  console.log('Stores to render:', stores.length);
  
  return <StoresClient stores={stores} />;
} 