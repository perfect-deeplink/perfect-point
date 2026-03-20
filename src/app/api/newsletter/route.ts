import { NextRequest, NextResponse } from 'next/server';
import { getInitializedDb } from '@/lib/db';

export const runtime = 'edge';

export async function POST(req: NextRequest) {
  try {
    const db = await getInitializedDb();
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { success: false, error: 'Email is required' },
        { status: 400 }
      );
    }

    const existing = await db.prepare('SELECT id FROM newsletters WHERE email = ?').bind(email).first();
    if (existing) {
      return NextResponse.json(
        { success: false, error: 'Email already subscribed' },
        { status: 409 }
      );
    }

    const now = new Date().toISOString();

    const result = await db.prepare(
      'INSERT INTO newsletters (email, created_at) VALUES (?, ?)'
    ).bind(email, now).run();

    const row = await db.prepare('SELECT * FROM newsletters WHERE id = ?').bind(result.meta.last_row_id).first();

    return NextResponse.json(
      { success: true, data: row },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { success: false, error: 'Failed to subscribe' },
      { status: 500 }
    );
  }
}
