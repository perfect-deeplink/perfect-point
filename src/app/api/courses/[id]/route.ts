import { NextRequest, NextResponse } from 'next/server';
import { getInitializedDb } from '@/lib/db';
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

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const db = await getInitializedDb();
    const row = await db
      .prepare('SELECT * FROM courses WHERE id = ?')
      .bind(id)
      .first();

    if (!row) {
      return NextResponse.json(
        { success: false, error: 'Course not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: mapCourse(row as Record<string, unknown>) });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch course' },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    if (!(await isAuthenticated(req))) {
      return NextResponse.json(
        { success: false, error: 'Not authenticated' },
        { status: 401 }
      );
    }

    const { id } = await params;
    const db = await getInitializedDb();
    const body = await req.json();
    const now = new Date().toISOString();

    const result = await db
      .prepare(
        `UPDATE courses SET title=?, description=?, category=?, duration=?, price=?, features=?, icon=?, badge=?, level=?, featured=?, sort_order=?, active=?, updated_at=? WHERE id=?`
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
        id
      )
      .run();

    if (!result.meta.changes) {
      return NextResponse.json(
        { success: false, error: 'Course not found' },
        { status: 404 }
      );
    }

    const row = await db
      .prepare('SELECT * FROM courses WHERE id = ?')
      .bind(id)
      .first();

    return NextResponse.json({ success: true, data: mapCourse(row as Record<string, unknown>) });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Failed to update course' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    if (!(await isAuthenticated(req))) {
      return NextResponse.json(
        { success: false, error: 'Not authenticated' },
        { status: 401 }
      );
    }

    const { id } = await params;
    const db = await getInitializedDb();
    const result = await db
      .prepare('DELETE FROM courses WHERE id = ?')
      .bind(id)
      .run();

    if (!result.meta.changes) {
      return NextResponse.json(
        { success: false, error: 'Course not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: { message: 'Course deleted' } });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Failed to delete course' },
      { status: 500 }
    );
  }
}
