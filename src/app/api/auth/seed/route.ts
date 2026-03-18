import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/mongodb';
import { Admin } from '@/lib/models';

export async function GET() {
  try {
    await dbConnect();

    // Delete all existing admins and create a fresh one
    await Admin.deleteMany({});
    const hashedPassword = await bcrypt.hash('admin123', 10);
    await Admin.create({ username: 'admin', password: hashedPassword });

    return NextResponse.json({
      success: true,
      message: 'Admin account reset. Username: admin, Password: admin123',
    });
  } catch (error) {
    const msg = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { success: false, error: 'Failed to seed admin: ' + msg },
      { status: 500 }
    );
  }
}
