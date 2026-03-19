import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { isAuthenticated } from '@/lib/auth';

export const runtime = 'edge';

function mapCourse(row: Record<string, unknown>) {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    category: row.category,
    duration: row.duration,
    price: row.price,
    features: JSON.parse((row.features as string) || '[]'),
    icon: row.icon,
    badge: row.badge,
    level: row.level,
    featured: !!row.featured,
    sortOrder: row.sort_order,
    active: !!row.active,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export async function GET() {
  try {
    const db = getDb();
    const { results } = await db
      .prepare('SELECT * FROM courses WHERE active = 1 ORDER BY sort_order ASC, created_at DESC')
      .all<Record<string, unknown>>();

    const courses = results.map(mapCourse);

    return NextResponse.json({ success: true, data: courses });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch courses' },
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

    const result = await db
      .prepare(
        `INSERT INTO courses (title, description, category, duration, price, features, icon, badge, level, featured, sort_order, active, created_at, updated_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
      )
      .bind(
        body.title,
        body.description || null,
        body.category || null,
        body.duration || null,
        body.price || 0,
        JSON.stringify(body.features || []),
        body.icon || null,
        body.badge || null,
        body.level || null,
        body.featured ? 1 : 0,
        body.sortOrder || 0,
        body.active !== false ? 1 : 0,
        now,
        now
      )
      .run();

    const row = await db
      .prepare('SELECT * FROM courses WHERE id = ?')
      .bind(result.meta.last_row_id)
      .first();

    return NextResponse.json(
      { success: true, data: mapCourse(row as Record<string, unknown>) },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { success: false, error: 'Failed to create course' },
      { status: 500 }
    );
  }
}
