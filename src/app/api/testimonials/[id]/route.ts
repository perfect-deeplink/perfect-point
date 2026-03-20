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
      'UPDATE testimonials SET name = ?, course = ?, rating = ?, feedback = ?, photo = ?, current_position = ?, category = ?, approved = ? WHERE id = ?'
    ).bind(
      body.name,
      body.course,
      body.rating,
      body.feedback,
      body.photo ?? null,
      body.current ?? null,
      body.category ?? null,
      body.approved ? 1 : 0,
      id
    ).run();

    if (!meta.changes) {
      return NextResponse.json(
        { success: false, error: 'Testimonial not found' },
        { status: 404 }
      );
    }

    const row = await db.prepare('SELECT * FROM testimonials WHERE id = ?').bind(id).first();
    const rowObj = row as Record<string, unknown>;
    return NextResponse.json({ success: true, data: { ...rowObj, current: rowObj.current_position, createdAt: rowObj.created_at } });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Failed to update testimonial' },
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
    const { meta } = await db.prepare('DELETE FROM testimonials WHERE id = ?').bind(id).run();

    if (!meta.changes) {
      return NextResponse.json(
        { success: false, error: 'Testimonial not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: { message: 'Testimonial deleted' },
    });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Failed to delete testimonial' },
      { status: 500 }
    );
  }
}
