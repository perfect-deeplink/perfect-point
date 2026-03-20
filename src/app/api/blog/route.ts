import { NextRequest, NextResponse } from 'next/server';
import { getInitializedDb } from '@/lib/db';
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

export async function GET(req: NextRequest) {
  try {
    const db = await getInitializedDb();
    const isAdmin = await isAuthenticated(req);

    const query = isAdmin
      ? 'SELECT * FROM blog_posts ORDER BY created_at DESC'
      : 'SELECT * FROM blog_posts WHERE published = 1 ORDER BY created_at DESC';

    const { results } = await db.prepare(query).all<Record<string, unknown>>();
    const posts = results.map(mapBlogPost);

    return NextResponse.json({ success: true, data: posts });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch blog posts' },
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

    const result = await db
      .prepare(
        `INSERT INTO blog_posts (title, content, excerpt, category, tags, featured_image, published, featured, views, created_at, updated_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
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
        now
      )
      .run();

    const row = await db
      .prepare('SELECT * FROM blog_posts WHERE id = ?')
      .bind(result.meta.last_row_id)
      .first();

    return NextResponse.json(
      { success: true, data: mapBlogPost(row as Record<string, unknown>) },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { success: false, error: 'Failed to create blog post' },
      { status: 500 }
    );
  }
}
