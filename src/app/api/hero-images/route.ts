import { NextRequest, NextResponse } from 'next/server';
import { getInitializedDb } from '@/lib/db';
import { isAuthenticated } from '@/lib/auth';

export const runtime = 'edge';

export async function GET() {
  try {
    const db = await getInitializedDb();
    const { results } = await db.prepare('SELECT * FROM hero_images ORDER BY created_at DESC').all<Record<string, unknown>>();

    const data = results.map((row: Record<string, unknown>) => ({
      ...row,
      createdAt: row.created_at,
    }));

    return NextResponse.json({ success: true, data });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch hero images' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    if (!(await isAuthenticated(req))) {
      return NextResponse.json(
        { success: false, error: 'Not authenticated' },
        { status: 401 }
      );
    }

    const db = await getInitializedDb();
    const body = await req.json();
    const now = new Date().toISOString();

    const result = await db.prepare(
      'INSERT INTO hero_images (url, title, created_at) VALUES (?, ?, ?)'
    ).bind(body.url, body.title, now).run();

    const row = await db.prepare('SELECT * FROM hero_images WHERE id = ?').bind(result.meta.last_row_id).first();

    const rowObj = row as Record<string, unknown>;
    return NextResponse.json(
      { success: true, data: { ...rowObj, createdAt: rowObj.created_at } },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { success: false, error: 'Failed to add hero image' },
      { status: 500 }
    );
  }
}
