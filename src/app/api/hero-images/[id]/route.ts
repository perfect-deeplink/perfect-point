import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { isAuthenticated } from '@/lib/auth';

export const runtime = 'edge';

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
    const db = getDb();
    const { meta } = await db.prepare('DELETE FROM hero_images WHERE id = ?').bind(id).run();

    if (!meta.changes) {
      return NextResponse.json(
        { success: false, error: 'Hero image not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: { message: 'Hero image deleted' },
    });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Failed to delete hero image' },
      { status: 500 }
    );
  }
}
