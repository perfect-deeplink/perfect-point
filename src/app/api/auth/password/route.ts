import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { getInitializedDb } from '@/lib/db';
import { isAuthenticated, getTokenFromRequest, verifyToken } from '@/lib/auth';

export const runtime = 'edge';

export async function PUT(req: NextRequest) {
  try {
    if (!(await isAuthenticated(req))) {
      return NextResponse.json(
        { success: false, error: 'Not authenticated' },
        { status: 401 }
      );
    }

    const db = await getInitializedDb();
    const { currentPassword, newPassword } = await req.json();

    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        { success: false, error: 'Current and new password are required' },
        { status: 400 }
      );
    }

    const token = getTokenFromRequest(req);
    const decoded = await verifyToken(token!) as { id: string; username: string };
    const admin = await db.prepare('SELECT * FROM admins WHERE id = ?').bind(decoded.id).first<{ id: number; username: string; password: string }>();

    if (!admin) {
      return NextResponse.json(
        { success: false, error: 'Admin not found' },
        { status: 404 }
      );
    }

    const isMatch = await bcrypt.compare(currentPassword, admin.password);
    if (!isMatch) {
      return NextResponse.json(
        { success: false, error: 'Current password is incorrect' },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await db.prepare('UPDATE admins SET password = ? WHERE id = ?').bind(hashedPassword, decoded.id).run();

    return NextResponse.json({
      success: true,
      data: { message: 'Password updated successfully' },
    });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Server error' },
      { status: 500 }
    );
  }
}
