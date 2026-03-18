import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { HeroImage } from '@/lib/models';
import { isAuthenticated } from '@/lib/auth';

export async function GET() {
  try {
    await dbConnect();
    const images = await HeroImage.find().sort({ createdAt: -1 });

    return NextResponse.json({ success: true, data: images });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch hero images' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    if (!isAuthenticated(req)) {
      return NextResponse.json(
        { success: false, error: 'Not authenticated' },
        { status: 401 }
      );
    }

    await dbConnect();
    const body = await req.json();
    const image = await HeroImage.create(body);

    return NextResponse.json(
      { success: true, data: image },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { success: false, error: 'Failed to add hero image' },
      { status: 500 }
    );
  }
}
