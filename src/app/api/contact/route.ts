import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { isAuthenticated } from '@/lib/auth';

export const runtime = 'edge';

function mapContact(row: Record<string, unknown>) {
  return {
    id: row.id,
    name: row.name,
    fatherName: row.father_name,
    phone: row.phone,
    email: row.email,
    address: row.address,
    courses: JSON.parse((row.courses as string) || '[]'),
    education: row.education,
    preferredTime: row.preferred_time,
    preferredMode: row.preferred_mode,
    message: row.message,
    newsletter: !!row.newsletter,
    createdAt: row.created_at,
  };
}

export async function POST(req: NextRequest) {
  try {
    const db = getDb();
    const body = await req.json();
    const now = new Date().toISOString();

    const result = await db
      .prepare(
        `INSERT INTO contacts (name, father_name, phone, email, address, courses, education, preferred_time, preferred_mode, message, newsletter, created_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
      )
      .bind(
        body.name,
        body.fatherName || null,
        body.phone || null,
        body.email || null,
        body.address || null,
        JSON.stringify(body.courses || []),
        body.education || null,
        body.preferredTime || null,
        body.preferredMode || null,
        body.message || null,
        body.newsletter ? 1 : 0,
        now
      )
      .run();

    const row = await db
      .prepare('SELECT * FROM contacts WHERE id = ?')
      .bind(result.meta.last_row_id)
      .first();

    return NextResponse.json(
      { success: true, data: mapContact(row as Record<string, unknown>) },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { success: false, error: 'Failed to submit contact form' },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    if (!(await isAuthenticated(req))) {
      return NextResponse.json(
        { success: false, error: 'Not authenticated' },
        { status: 401 }
      );
    }

    const db = getDb();
    const { results } = await db
      .prepare('SELECT * FROM contacts ORDER BY created_at DESC')
      .all<Record<string, unknown>>();

    const contacts = results.map(mapContact);

    return NextResponse.json({ success: true, data: contacts });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch contacts' },
      { status: 500 }
    );
  }
}
