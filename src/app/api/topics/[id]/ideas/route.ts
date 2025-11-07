import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Topic from '@/models/Topic';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const body = await request.json();
    const { content, author } = body;

    if (!content || !author) {
      return NextResponse.json(
        { success: false, error: 'Fikir içeriği ve yazar adı gereklidir' },
        { status: 400 }
      );
    }

    const topic = await Topic.findById(params.id);

    if (!topic) {
      return NextResponse.json(
        { success: false, error: 'Konu bulunamadı' },
        { status: 404 }
      );
    }

    topic.ideas.push({
      content,
      author,
      createdAt: new Date(),
    });

    await topic.save();

    return NextResponse.json(
      { success: true, data: topic },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

