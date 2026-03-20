import { NextRequest, NextResponse } from 'next/server';
import { getInitializedDb } from '@/lib/db';
import { isAuthenticated } from '@/lib/auth';

export const runtime = 'edge';

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

    const { meta } = await db.prepare(
      'UPDATE students SET name = ?, achievement = ?, photo = ? WHERE id = ?'
    ).bind(body.name, body.achievement, body.photo, id).run();

    if (!meta.changes) {
      return NextResponse.json(
        { success: false, error: 'Student not found' },
        { status: 404 }
      );
    }

    const row = await db.prepare('SELECT * FROM students WHERE id = ?').bind(id).first();
    const rowObj = row as Record<string, unknown>;
    return NextResponse.json({ success: true, data: { ...rowObj, createdAt: rowObj.created_at } });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Failed to update student' },
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
    const { meta } = await db.prepare('DELETE FROM students WHERE id = ?').bind(id).run();

    if (!meta.changes) {
      return NextResponse.json(
        { success: false, error: 'Student not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: { message: 'Student deleted' },
    });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Failed to delete student' },
      { status: 500 }
    );
  }
}
