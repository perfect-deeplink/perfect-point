import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { HomepageContent } from '@/lib/models';
import { isAuthenticated } from '@/lib/auth';

export async function GET() {
  try {
    await dbConnect();
    let content = await HomepageContent.findOne();
    if (!content) {
      content = await HomepageContent.create({});
    }
    return NextResponse.json({ success: true, data: content });
  } catch {
    return NextResponse.json({ success: false, error: 'Failed to fetch homepage content' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    if (!isAuthenticated(req)) {
      return NextResponse.json({ success: false, error: 'Not authenticated' }, { status: 401 });
    }
    await dbConnect();
    const body = await req.json();
    let content = await HomepageContent.findOne();
    if (content) {
      content = await HomepageContent.findByIdAndUpdate(content._id, body, { new: true });
    } else {
      content = await HomepageContent.create(body);
    }
    return NextResponse.json({ success: true, data: content });
  } catch {
    return NextResponse.json({ success: false, error: 'Failed to update homepage content' }, { status: 500 });
  }
}
