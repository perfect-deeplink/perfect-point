import { NextRequest, NextResponse } from 'next/server';
import { getInitializedDb } from '@/lib/db';
import { isAuthenticated } from '@/lib/auth';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  try {
    const db = await getInitializedDb();
    const isAdmin = await isAuthenticated(req);

    const query = isAdmin
      ? 'SELECT * FROM testimonials ORDER BY created_at DESC'
      : 'SELECT * FROM testimonials WHERE approved = 1 ORDER BY created_at DESC';

    const { results } = await db.prepare(query).all<Record<string, unknown>>();

    const data = results.map((row: Record<string, unknown>) => ({
      ...row,
      current: row.current_position,
      createdAt: row.created_at,
    }));

    return NextResponse.json({ success: true, data });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch testimonials' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const db = await getInitializedDb();
    const body = await req.json();
    const now = new Date().toISOString();

    const result = await db.prepare(
      'INSERT INTO testimonials (name, course, rating, feedback, photo, current_position, category, approved, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)'
    ).bind(
      body.name,
      body.course,
      body.rating,
      body.feedback,
      body.photo ?? null,
      body.current ?? null,
      body.category ?? null,
      body.approved ? 1 : 0,
      now
    ).run();

    const row = await db.prepare('SELECT * FROM testimonials WHERE id = ?').bind(result.meta.last_row_id).first();

    const rowObj = row as Record<string, unknown>;
    return NextResponse.json(
      { success: true, data: { ...rowObj, current: rowObj.current_position, createdAt: rowObj.created_at } },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { success: false, error: 'Failed to submit testimonial' },
      { status: 500 }
    );
  }
}
