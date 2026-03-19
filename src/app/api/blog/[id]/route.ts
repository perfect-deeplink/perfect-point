import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { isAuthenticated } from '@/lib/auth';

export const runtime = 'edge';

function mapBlogPost(row: Record<string, unknown>) {
  return {
    id: row.id,
    title: row.title,
    content: row.content,
    excerpt: row.excerpt,
    category: row.category,
    tags: JSON.parse((row.tags as string) || '[]'),
    featuredImage: row.featured_image,
    published: !!row.published,
    featured: !!row.featured,
    views: row.views,
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
    const db = getDb();
    const row = await db
      .prepare('SELECT * FROM blog_posts WHERE id = ?')
      .bind(id)
      .first();

    if (!row) {
      return NextResponse.json(
        { success: false, error: 'Post not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: mapBlogPost(row as Record<string, unknown>) });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch post' },
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
    const db = getDb();
    const body = await req.json();
    const now = new Date().toISOString();

    const result = await db
      .prepare(
        `UPDATE blog_posts SET title=?, content=?, excerpt=?, category=?, tags=?, featured_image=?, published=?, featured=?, views=?, updated_at=? WHERE id=?`
      )
      .bind(
        body.title,
        body.content,
        body.excerpt || null,
        body.category || null,
        JSON.stringify(body.tags || []),
        body.featuredImage || null,
        body.published ? 1 : 0,
        body.featured ? 1 : 0,
        body.views || 0,
        now,
        id
      )
      .run();

    if (!result.meta.changes) {
      return NextResponse.json(
        { success: false, error: 'Post not found' },
        { status: 404 }
      );
    }

    const row = await db
      .prepare('SELECT * FROM blog_posts WHERE id = ?')
      .bind(id)
      .first();

    return NextResponse.json({ success: true, data: mapBlogPost(row as Record<string, unknown>) });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Failed to update post' },
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
    const db = getDb();
    const result = await db
      .prepare('DELETE FROM blog_posts WHERE id = ?')
      .bind(id)
      .run();

    if (!result.meta.changes) {
      return NextResponse.json(
        { success: false, error: 'Post not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: { message: 'Post deleted' } });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Failed to delete post' },
      { status: 500 }
    );
  }
}
