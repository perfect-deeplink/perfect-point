import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { getInitializedDb } from '@/lib/db';
import { signToken, isAuthenticated } from '@/lib/auth';

export const runtime = 'edge';

export async function POST(req: NextRequest) {
  try {
    const db = await getInitializedDb();
    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json(
        { success: false, error: 'Username and password are required' },
        { status: 400 }
      );
    }

    // Auto-create default admin if none exists
    const { count } = await db.prepare('SELECT COUNT(*) as count FROM admins').first<{ count: number }>() ?? { count: 0 };
    if (count === 0) {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      await db.prepare('INSERT INTO admins (username, password) VALUES (?, ?)').bind('admin', hashedPassword).run();
    }

    const admin = await db.prepare('SELECT * FROM admins WHERE username = ?').bind(username).first<{ id: number; username: string; password: string }>();

    if (!admin) {
      return NextResponse.json(
        { success: false, error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return NextResponse.json(
        { success: false, error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    const token = await signToken({ id: String(admin.id), username: admin.username });

    return NextResponse.json({
      success: true,
      token,
      username: admin.username,
    });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Server error' },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    await getInitializedDb();
    if (!(await isAuthenticated(req))) {
      return NextResponse.json(
        { success: false, error: 'Not authenticated' },
        { status: 401 }
      );
    }

    return NextResponse.json({ success: true, data: { valid: true } });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Server error' },
      { status: 500 }
    );
  }
}
