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

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  const store = await Store.findById(params.id);
  if (!store) {
    return NextResponse.json({ message: 'Toko tidak ditemukan.' }, { status: 404 });
  }
  return NextResponse.json(store);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const admin = verifyAdmin(req);
  if (!admin) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  await dbConnect();
  const { name, address, city, phone, location, image } = await req.json();
  const { id } = params;
  const store = await Store.findByIdAndUpdate(
    id,
    { name, address, city, phone, location, image }, // tambahkan image di sini!
    { new: true }
  );
  if (!store) {
    return NextResponse.json({ message: 'Toko tidak ditemukan.' }, { status: 404 });
  }
  return NextResponse.json({ message: 'Toko berhasil diupdate.', store });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const admin = verifyAdmin(req);
  if (!admin) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  await dbConnect();
  const store = await Store.findByIdAndDelete(params.id);
  if (!store) {
    return NextResponse.json({ message: 'Toko tidak ditemukan.' }, { status: 404 });
  }
  return NextResponse.json({ message: 'Toko berhasil dihapus.' });
} 