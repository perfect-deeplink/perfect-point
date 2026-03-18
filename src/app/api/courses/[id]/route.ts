import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { Course } from '@/lib/models';
import { isAuthenticated } from '@/lib/auth';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    const course = await Course.findById(params.id);
    if (!course) {
      return NextResponse.json({ success: false, error: 'Course not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: course });
  } catch {
    return NextResponse.json({ success: false, error: 'Failed to fetch course' }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    if (!isAuthenticated(req)) {
      return NextResponse.json({ success: false, error: 'Not authenticated' }, { status: 401 });
    }
    await dbConnect();
    const body = await req.json();
    body.updatedAt = new Date();
    const course = await Course.findByIdAndUpdate(params.id, body, { new: true });
    if (!course) {
      return NextResponse.json({ success: false, error: 'Course not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: course });
  } catch {
    return NextResponse.json({ success: false, error: 'Failed to update course' }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    if (!isAuthenticated(req)) {
      return NextResponse.json({ success: false, error: 'Not authenticated' }, { status: 401 });
    }
    await dbConnect();
    const course = await Course.findByIdAndDelete(params.id);
    if (!course) {
      return NextResponse.json({ success: false, error: 'Course not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: { message: 'Course deleted' } });
  } catch {
    return NextResponse.json({ success: false, error: 'Failed to delete course' }, { status: 500 });
  }
}
