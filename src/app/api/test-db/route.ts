import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';

export async function GET() {
  try {
    console.log('Testing database connection...');
    
    // Check if MONGODB_URI is set
    if (!process.env.MONGODB_URI) {
      return NextResponse.json({
        error: 'MONGODB_URI environment variable is not set',
        status: 'error'
      }, { status: 500 });
    }
    
    // Try to connect to database
    await dbConnect();
    console.log('Database connection successful');
    
    return NextResponse.json({
      message: 'Database connection successful',
      status: 'success',
      mongodb_uri_set: !!process.env.MONGODB_URI,
      node_env: process.env.NODE_ENV
    });
    
  } catch (error) {
    console.error('Database connection test failed:', error);
    
    return NextResponse.json({
      error: 'Database connection failed',
      details: error instanceof Error ? error.message : 'Unknown error',
      status: 'error',
      mongodb_uri_set: !!process.env.MONGODB_URI,
      node_env: process.env.NODE_ENV
    }, { status: 500 });
  }
} 