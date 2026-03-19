import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { isAuthenticated } from '@/lib/auth';

export const runtime = 'edge';

export async function GET() {
  try {
    const db = getDb();
    const { results } = await db.prepare('SELECT * FROM students ORDER BY created_at DESC').all<Record<string, unknown>>();

    const data = results.map((row: Record<string, unknown>) => ({
      ...row,
      createdAt: row.created_at,
    }));

    return NextResponse.json({ success: true, data });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch students' },
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

    const db = getDb();
    const body = await req.json();
    const now = new Date().toISOString();

    const result = await db.prepare(
      'INSERT INTO students (name, achievement, photo, created_at) VALUES (?, ?, ?, ?)'
    ).bind(body.name, body.achievement, body.photo, now).run();

    const row = await db.prepare('SELECT * FROM students WHERE id = ?').bind(result.meta.last_row_id).first();

    const rowObj = row as Record<string, unknown>;
    return NextResponse.json(
      { success: true, data: { ...rowObj, createdAt: rowObj.created_at } },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { success: false, error: 'Failed to add student' },
      { status: 500 }
    );
  }
}
