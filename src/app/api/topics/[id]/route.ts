import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Topic from '@/models/Topic';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const topic = await Topic.findById(params.id);

    if (!topic) {
      return NextResponse.json(
        { success: false, error: 'Konu bulunamadı' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: topic }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

