import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { Testimonial } from '@/lib/models';
import { isAuthenticated } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    const isAdmin = isAuthenticated(req);
    const filter = isAdmin ? {} : { approved: true };
    const testimonials = await Testimonial.find(filter).sort({ createdAt: -1 });

    return NextResponse.json({ success: true, data: testimonials });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch testimonials' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json();
    const testimonial = await Testimonial.create(body);

    return NextResponse.json(
      { success: true, data: testimonial },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { success: false, error: 'Failed to submit testimonial' },
      { status: 500 }
    );
  }
}
