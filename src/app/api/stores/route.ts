import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Store from '@/models/Store';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET as string;

function verifyAdmin(req: NextRequest) {
  const auth = req.headers.get('authorization');
  if (!auth) return null;
  const token = auth.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    if (decoded.role !== 'admin') return null;
    return decoded;
  } catch {
    return null;
  }
}

export async function GET() {
  try {
    console.log('Connecting to database...');
    await dbConnect();
    console.log('Database connected successfully');
    
    console.log('Fetching stores from database...');
    const stores = await Store.find().sort({ createdAt: -1 });
    console.log(`Found ${stores.length} stores`);
    
    return NextResponse.json(stores, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });
  } catch (error) {
    console.error('Error in GET /api/stores:', error);
    return NextResponse.json(
      { error: 'Failed to fetch stores', details: error instanceof Error ? error.message : 'Unknown error' },
      { 
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
      }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const admin = verifyAdmin(req);
    if (!admin) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    
    await dbConnect();
    const { name, address, city, phone, location, image } = await req.json();
    
    if (!name || !address || !city || !phone || !location || location.lat === undefined || location.lng === undefined) {
      return NextResponse.json({ message: 'Semua field wajib diisi.' }, { status: 400 });
    }
    
    const store = new Store({ name, address, city, phone, location, image });
    await store.save();
    
    return NextResponse.json({ message: 'Toko berhasil ditambahkan.', store }, { status: 201 });
  } catch (error) {
    console.error('Error in POST /api/stores:', error);
    return NextResponse.json(
      { error: 'Failed to create store', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
} 