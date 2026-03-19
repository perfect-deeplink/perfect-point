import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { getDb } from '@/lib/db';

export const runtime = 'edge';

export async function GET() {
  try {
    const db = getDb();

    // Delete all existing admins and create a fresh one
    await db.prepare('DELETE FROM admins').run();
    const hashedPassword = await bcrypt.hash('admin123', 10);
    await db.prepare('INSERT INTO admins (username, password) VALUES (?, ?)').bind('admin', hashedPassword).run();

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
