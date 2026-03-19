import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { isAuthenticated } from '@/lib/auth';

export const runtime = 'edge';

export async function GET() {
  try {
    const db = getDb();
    let row = await db.prepare('SELECT * FROM footer_settings LIMIT 1').first();

    if (!row) {
      await db.prepare(
        `INSERT INTO footer_settings (description, quick_links, popular_courses, social_links, timing, copyright_text)
         VALUES (?, ?, ?, ?, ?, ?)`
      ).bind(
        'Empowering students with cutting-edge computer education and professional skills for a brighter future.',
        '[]',
        '[]',
        '[]',
        'Mon - Sat: 8:00 AM - 8:00 PM',
        '© 2024 OK ACADEMY. All rights reserved. | Made with ❤ by MAYALOK VENTURES'
      ).run();

      row = await db.prepare('SELECT * FROM footer_settings LIMIT 1').first();
    }

    const r = row as Record<string, unknown>;
    const data = {
      ...r,
      quickLinks: JSON.parse(r.quick_links as string || '[]'),
      popularCourses: JSON.parse(r.popular_courses as string || '[]'),
      socialLinks: JSON.parse(r.social_links as string || '[]'),
      copyrightText: r.copyright_text,
    };

    return NextResponse.json({ success: true, data });
  } catch {
    return NextResponse.json({ success: false, error: 'Failed to fetch footer settings' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    if (!(await isAuthenticated(req))) {
      return NextResponse.json({ success: false, error: 'Not authenticated' }, { status: 401 });
    }

    const db = getDb();
    const body = await req.json();
    const existing = await db.prepare('SELECT id FROM footer_settings LIMIT 1').first<{ id: number }>();

    const description = body.description ?? null;
    const quickLinks = body.quickLinks ? JSON.stringify(body.quickLinks) : null;
    const popularCourses = body.popularCourses ? JSON.stringify(body.popularCourses) : null;
    const socialLinks = body.socialLinks ? JSON.stringify(body.socialLinks) : null;
    const address = body.address ?? null;
    const phone = body.phone ?? null;
    const email = body.email ?? null;
    const timing = body.timing ?? null;
    const copyrightText = body.copyrightText ?? null;

    if (existing) {
      await db.prepare(
        `UPDATE footer_settings SET description = ?, quick_links = ?, popular_courses = ?, social_links = ?, address = ?, phone = ?, email = ?, timing = ?, copyright_text = ? WHERE id = ?`
      ).bind(description, quickLinks, popularCourses, socialLinks, address, phone, email, timing, copyrightText, existing.id).run();
    } else {
      await db.prepare(
        `INSERT INTO footer_settings (description, quick_links, popular_courses, social_links, address, phone, email, timing, copyright_text)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
      ).bind(description, quickLinks, popularCourses, socialLinks, address, phone, email, timing, copyrightText).run();
    }

    const updatedRow = await db.prepare('SELECT * FROM footer_settings LIMIT 1').first() as Record<string, unknown>;
    const data = {
      ...updatedRow,
      quickLinks: JSON.parse(updatedRow.quick_links as string || '[]'),
      popularCourses: JSON.parse(updatedRow.popular_courses as string || '[]'),
      socialLinks: JSON.parse(updatedRow.social_links as string || '[]'),
      copyrightText: updatedRow.copyright_text,
    };

    return NextResponse.json({ success: true, data });
  } catch {
    return NextResponse.json({ success: false, error: 'Failed to update footer settings' }, { status: 500 });
  }
}
