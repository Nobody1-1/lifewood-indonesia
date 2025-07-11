import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

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
  const admin = verifyAdmin(req);
  if (!admin) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  await dbConnect();
  const user = await User.findById(params.id).select('-password');
  if (!user) {
    return NextResponse.json({ message: 'User tidak ditemukan.' }, { status: 404 });
  }
  return NextResponse.json(user);
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
  const { name, email, role, password } = await req.json();
  const updateData: any = { name, email, role };
  if (password) {
    updateData.password = await bcrypt.hash(password, 10);
  }
  const user = await User.findByIdAndUpdate(
    params.id,
    updateData,
    { new: true }
  ).select('-password');
  if (!user) {
    return NextResponse.json({ message: 'User tidak ditemukan.' }, { status: 404 });
  }
  return NextResponse.json({ message: 'User berhasil diupdate.', user });
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
  const user = await User.findByIdAndDelete(params.id);
  if (!user) {
    return NextResponse.json({ message: 'User tidak ditemukan.' }, { status: 404 });
  }
  return NextResponse.json({ message: 'User berhasil dihapus.' });
} 