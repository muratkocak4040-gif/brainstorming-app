import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Topic from '@/models/Topic';
import { inMemoryDB } from '@/lib/in-memory-db';

async function tryMongoDB() {
  try {
    await connectDB();
    return true;
  } catch (error) {
    return false;
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();
  const { content, author } = body;

  if (!content || !author) {
    return NextResponse.json(
      { success: false, error: 'Fikir içeriği ve yazar adı gereklidir' },
      { status: 400 }
    );
  }

  const useMongoDB = await tryMongoDB();

  if (useMongoDB) {
    try {
      const topic = await Topic.findById(id);
      if (!topic) {
        // MongoDB'de yoksa in-memory'de ara
        const updatedTopic = await inMemoryDB.addIdea(id, { content, author });
        if (!updatedTopic) {
          return NextResponse.json(
            { success: false, error: 'Konu bulunamadı' },
            { status: 404 }
          );
        }
        return NextResponse.json(
          { success: true, data: updatedTopic, source: 'memory' },
          { status: 200 }
        );
      }

      topic.ideas.push({
        content,
        author,
        createdAt: new Date(),
      } as any);

      await topic.save();

      return NextResponse.json(
        { success: true, data: topic, source: 'mongodb' },
        { status: 200 }
      );
    } catch (error: any) {
      // MongoDB hatası varsa in-memory'ye geç
      const updatedTopic = await inMemoryDB.addIdea(id, { content, author });
      if (!updatedTopic) {
        return NextResponse.json(
          { success: false, error: 'Konu bulunamadı' },
          { status: 404 }
        );
      }
      return NextResponse.json(
        { success: true, data: updatedTopic, source: 'memory' },
        { status: 200 }
      );
    }
  } else {
    // MongoDB yoksa in-memory kullan
    const updatedTopic = await inMemoryDB.addIdea(id, { content, author });
    if (!updatedTopic) {
      return NextResponse.json(
        { success: false, error: 'Konu bulunamadı' },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { success: true, data: updatedTopic, source: 'memory' },
      { status: 200 }
    );
  }
}

