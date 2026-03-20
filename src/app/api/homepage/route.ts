import { NextRequest, NextResponse } from 'next/server';
import { getInitializedDb } from '@/lib/db';
import { isAuthenticated } from '@/lib/auth';

export const runtime = 'edge';

export async function GET() {
  try {
    const db = await getInitializedDb();
    let row = await db.prepare('SELECT * FROM homepage_content LIMIT 1').first();

    if (!row) {
      await db.prepare(
        `INSERT INTO homepage_content (features_heading, features_subheading, cta_heading, cta_description, cta_phone, hero_slides, features, sections_enabled)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
      ).bind(
        'Why Choose OK ACADEMY?',
        'What makes us the best choice for your computer education',
        'Ready to Start Your Career in IT?',
        'Join OK ACADEMY today and transform your future with quality computer education',
        '+919876543210',
        '[]',
        '[]',
        '{"hero":true,"topStudents":true,"features":true,"courses":true,"testimonials":true,"blog":true,"cta":true}'
      ).run();

      row = await db.prepare('SELECT * FROM homepage_content LIMIT 1').first();
    }

    const r = row as Record<string, unknown>;
    const data = {
      ...r,
      heroSlides: JSON.parse(r.hero_slides as string || '[]'),
      featuresHeading: r.features_heading,
      featuresSubheading: r.features_subheading,
      features: JSON.parse(r.features as string || '[]'),
      ctaHeading: r.cta_heading,
      ctaDescription: r.cta_description,
      ctaPhone: r.cta_phone,
      sectionsEnabled: JSON.parse(r.sections_enabled as string || '{}'),
    };

    return NextResponse.json({ success: true, data });
  } catch {
    return NextResponse.json({ success: false, error: 'Failed to fetch homepage content' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    if (!(await isAuthenticated(req))) {
      return NextResponse.json({ success: false, error: 'Not authenticated' }, { status: 401 });
    }

    const db = await getInitializedDb();
    const body = await req.json();
    const existing = await db.prepare('SELECT id FROM homepage_content LIMIT 1').first<{ id: number }>();

    const heroSlides = body.heroSlides ? JSON.stringify(body.heroSlides) : null;
    const featuresHeading = body.featuresHeading ?? null;
    const featuresSubheading = body.featuresSubheading ?? null;
    const features = body.features ? JSON.stringify(body.features) : null;
    const ctaHeading = body.ctaHeading ?? null;
    const ctaDescription = body.ctaDescription ?? null;
    const ctaPhone = body.ctaPhone ?? null;
    const sectionsEnabled = body.sectionsEnabled ? JSON.stringify(body.sectionsEnabled) : null;

    if (existing) {
      await db.prepare(
        `UPDATE homepage_content SET hero_slides = ?, features_heading = ?, features_subheading = ?, features = ?, cta_heading = ?, cta_description = ?, cta_phone = ?, sections_enabled = ? WHERE id = ?`
      ).bind(heroSlides, featuresHeading, featuresSubheading, features, ctaHeading, ctaDescription, ctaPhone, sectionsEnabled, existing.id).run();
    } else {
      await db.prepare(
        `INSERT INTO homepage_content (hero_slides, features_heading, features_subheading, features, cta_heading, cta_description, cta_phone, sections_enabled)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
      ).bind(heroSlides, featuresHeading, featuresSubheading, features, ctaHeading, ctaDescription, ctaPhone, sectionsEnabled).run();
    }

    const r = await db.prepare('SELECT * FROM homepage_content LIMIT 1').first() as Record<string, unknown>;
    const data = {
      ...r,
      heroSlides: JSON.parse(r.hero_slides as string || '[]'),
      featuresHeading: r.features_heading,
      featuresSubheading: r.features_subheading,
      features: JSON.parse(r.features as string || '[]'),
      ctaHeading: r.cta_heading,
      ctaDescription: r.cta_description,
      ctaPhone: r.cta_phone,
      sectionsEnabled: JSON.parse(r.sections_enabled as string || '{}'),
    };

    return NextResponse.json({ success: true, data });
  } catch {
    return NextResponse.json({ success: false, error: 'Failed to update homepage content' }, { status: 500 });
  }
}
