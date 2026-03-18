import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { Teacher } from '@/lib/models';
import { isAuthenticated } from '@/lib/auth';

export async function GET() {
  try {
    await dbConnect();
    const teachers = await Teacher.find().sort({ createdAt: -1 });

    return NextResponse.json({ success: true, data: teachers });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch teachers' },
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
    const teacher = await Teacher.create(body);

    return NextResponse.json(
      { success: true, data: teacher },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { success: false, error: 'Failed to add teacher' },
      { status: 500 }
    );
  }
}
