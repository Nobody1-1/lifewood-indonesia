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
  await dbConnect();
  const stores = await Store.find().sort({ createdAt: -1 });
  return NextResponse.json(stores);
}

export async function POST(req: NextRequest) {
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
} 