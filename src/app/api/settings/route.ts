import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { isAuthenticated } from '@/lib/auth';

export const runtime = 'edge';

export async function GET() {
  try {
    const db = getDb();
    let row = await db.prepare('SELECT * FROM site_settings LIMIT 1').first();

    if (!row) {
      await db.prepare(
        `INSERT INTO site_settings (phone, whatsapp, email, address)
         VALUES (?, ?, ?, ?)`
      ).bind(
        '+91 9876543210',
        '+91 9876543210',
        'info@okacademykurawli.com',
        'Near Post Office, Kurawli, Mainpuri, UP - 205001'
      ).run();

      row = await db.prepare('SELECT * FROM site_settings LIMIT 1').first();
    }

    return NextResponse.json({ success: true, data: row });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch settings' },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    if (!(await isAuthenticated(req))) {
      return NextResponse.json(
        { success: false, error: 'Not authenticated' },
        { status: 401 }
      );
    }

    const db = getDb();
    const body = await req.json();
    const existing = await db.prepare('SELECT id FROM site_settings LIMIT 1').first<{ id: number }>();

    const phone = body.phone ?? null;
    const whatsapp = body.whatsapp ?? null;
    const email = body.email ?? null;
    const address = body.address ?? null;
    const facebook = body.facebook ?? null;
    const instagram = body.instagram ?? null;
    const youtube = body.youtube ?? null;
    const logo = body.logo ?? null;

    if (existing) {
      await db.prepare(
        `UPDATE site_settings SET phone = ?, whatsapp = ?, email = ?, address = ?, facebook = ?, instagram = ?, youtube = ?, logo = ? WHERE id = ?`
      ).bind(phone, whatsapp, email, address, facebook, instagram, youtube, logo, existing.id).run();
    } else {
      await db.prepare(
        `INSERT INTO site_settings (phone, whatsapp, email, address, facebook, instagram, youtube, logo)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
      ).bind(phone, whatsapp, email, address, facebook, instagram, youtube, logo).run();
    }

    const row = await db.prepare('SELECT * FROM site_settings LIMIT 1').first();
    return NextResponse.json({ success: true, data: row });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Failed to update settings' },
      { status: 500 }
    );
  }
}
