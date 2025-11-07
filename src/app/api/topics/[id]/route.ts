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

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const useMongoDB = await tryMongoDB();

  if (useMongoDB) {
    try {
      const topic = await Topic.findById(id);
      if (!topic) {
        // MongoDB'de yoksa in-memory'de ara
        const memTopic = await inMemoryDB.getTopicById(id);
        if (!memTopic) {
          return NextResponse.json(
            { success: false, error: 'Konu bulunamadı' },
            { status: 404 }
          );
        }
        return NextResponse.json({ success: true, data: memTopic, source: 'memory' }, { status: 200 });
      }
      return NextResponse.json({ success: true, data: topic, source: 'mongodb' }, { status: 200 });
    } catch (error: any) {
      // MongoDB hatası varsa in-memory'ye geç
      const topic = await inMemoryDB.getTopicById(id);
      if (!topic) {
        return NextResponse.json(
          { success: false, error: 'Konu bulunamadı' },
          { status: 404 }
        );
      }
      return NextResponse.json({ success: true, data: topic, source: 'memory' }, { status: 200 });
    }
  } else {
    // MongoDB yoksa in-memory kullan
    const topic = await inMemoryDB.getTopicById(id);
    if (!topic) {
      return NextResponse.json(
        { success: false, error: 'Konu bulunamadı' },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, data: topic, source: 'memory' }, { status: 200 });
  }
}

