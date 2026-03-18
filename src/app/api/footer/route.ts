import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { FooterSettings } from '@/lib/models';
import { isAuthenticated } from '@/lib/auth';

export async function GET() {
  try {
    await dbConnect();
    let footer = await FooterSettings.findOne();
    if (!footer) {
      footer = await FooterSettings.create({});
    }
    return NextResponse.json({ success: true, data: footer });
  } catch {
    return NextResponse.json({ success: false, error: 'Failed to fetch footer settings' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    if (!isAuthenticated(req)) {
      return NextResponse.json({ success: false, error: 'Not authenticated' }, { status: 401 });
    }
    await dbConnect();
    const body = await req.json();
    let footer = await FooterSettings.findOne();
    if (footer) {
      footer = await FooterSettings.findByIdAndUpdate(footer._id, body, { new: true });
    } else {
      footer = await FooterSettings.create(body);
    }
    return NextResponse.json({ success: true, data: footer });
  } catch {
    return NextResponse.json({ success: false, error: 'Failed to update footer settings' }, { status: 500 });
  }
}
