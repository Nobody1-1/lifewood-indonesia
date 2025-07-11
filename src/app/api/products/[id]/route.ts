import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Product from '@/models/Product';
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
  const product = await Product.findById(params.id);
  if (!product) {
    return NextResponse.json({ message: 'Produk tidak ditemukan.' }, { status: 404 });
  }
  return NextResponse.json(product);
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
  const { name, description, price, image, category } = await req.json();
  const product = await Product.findByIdAndUpdate(
    params.id,
    { name, description, price, image, category },
    { new: true }
  );
  if (!product) {
    return NextResponse.json({ message: 'Produk tidak ditemukan.' }, { status: 404 });
  }
  return NextResponse.json({ message: 'Produk berhasil diupdate.', product });
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
  const product = await Product.findByIdAndDelete(params.id);
  if (!product) {
    return NextResponse.json({ message: 'Produk tidak ditemukan.' }, { status: 404 });
  }
  return NextResponse.json({ message: 'Produk berhasil dihapus.' });
} 