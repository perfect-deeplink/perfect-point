import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { HeroImage } from '@/lib/models';
import { isAuthenticated } from '@/lib/auth';

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    if (!isAuthenticated(req)) {
      return NextResponse.json(
        { success: false, error: 'Not authenticated' },
        { status: 401 }
      );
    }

    await dbConnect();
    const image = await HeroImage.findByIdAndDelete(params.id);

    if (!image) {
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
