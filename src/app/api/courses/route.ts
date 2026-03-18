import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { Course } from '@/lib/models';
import { isAuthenticated } from '@/lib/auth';

export async function GET() {
  try {
    await dbConnect();
    const courses = await Course.find({ active: true }).sort({ order: 1, createdAt: -1 });
    return NextResponse.json({ success: true, data: courses });
  } catch {
    return NextResponse.json({ success: false, error: 'Failed to fetch courses' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    if (!isAuthenticated(req)) {
      return NextResponse.json({ success: false, error: 'Not authenticated' }, { status: 401 });
    }
    await dbConnect();
    const body = await req.json();
    const course = await Course.create(body);
    return NextResponse.json({ success: true, data: course }, { status: 201 });
  } catch {
    return NextResponse.json({ success: false, error: 'Failed to create course' }, { status: 500 });
  }
}
