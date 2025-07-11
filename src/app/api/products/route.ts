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

export async function GET() {
  await dbConnect();
  const products = await Product.find().sort({ createdAt: -1 });
  return NextResponse.json(products);
}

export async function POST(req: NextRequest) {
  const admin = verifyAdmin(req);
  if (!admin) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  await dbConnect();
  const { name, description, price, image, category } = await req.json();
  if (!name || !description || !price || !image || !category) {
    return NextResponse.json({ message: 'Semua field wajib diisi.' }, { status: 400 });
  }
  const product = new Product({ name, description, price, image, category });
  await product.save();
  return NextResponse.json({ message: 'Produk berhasil ditambahkan.', product }, { status: 201 });
} 