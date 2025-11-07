import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Topic from '@/models/Topic';

export async function GET() {
  try {
    await connectDB();
    const topics = await Topic.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: topics }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    const { title, description, author } = body;

    if (!title || !description || !author) {
      return NextResponse.json(
        { success: false, error: 'Başlık, açıklama ve yazar adı gereklidir' },
        { status: 400 }
      );
    }

    const topic = await Topic.create({
      title,
      description,
      author,
      ideas: [],
    });

    return NextResponse.json(
      { success: true, data: topic },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

