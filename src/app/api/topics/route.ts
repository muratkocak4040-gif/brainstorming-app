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

export async function GET() {
  const useMongoDB = await tryMongoDB();
  
  if (useMongoDB) {
    try {
      const topics = await Topic.find({}).sort({ createdAt: -1 });
      return NextResponse.json({ success: true, data: topics, source: 'mongodb' }, { status: 200 });
    } catch (error: any) {
      // MongoDB hatası varsa in-memory'ye geç
      const topics = await inMemoryDB.getAllTopics();
      return NextResponse.json({ 
        success: true, 
        data: topics, 
        source: 'memory',
        warning: 'MongoDB bağlantısı yok, geçici bellek kullanılıyor. Veriler kalıcı değildir.'
      }, { status: 200 });
    }
  } else {
    // MongoDB yoksa in-memory kullan
    const topics = await inMemoryDB.getAllTopics();
    return NextResponse.json({ 
      success: true, 
      data: topics, 
      source: 'memory',
      warning: 'MongoDB bağlantısı yok, geçici bellek kullanılıyor. Veriler kalıcı değildir. MongoDB kurulumu için: https://www.mongodb.com/cloud/atlas'
    }, { status: 200 });
  }
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { title, description, author } = body;

  if (!title || !description || !author) {
    return NextResponse.json(
      { success: false, error: 'Başlık, açıklama ve yazar adı gereklidir' },
      { status: 400 }
    );
  }

  const useMongoDB = await tryMongoDB();

  if (useMongoDB) {
    try {
      const topic = await Topic.create({
        title,
        description,
        author,
        ideas: [],
      });
      return NextResponse.json(
        { success: true, data: topic, source: 'mongodb' },
        { status: 201 }
      );
    } catch (error: any) {
      // MongoDB hatası varsa in-memory'ye geç
      const topic = await inMemoryDB.createTopic({ title, description, author });
      return NextResponse.json(
        { 
          success: true, 
          data: topic, 
          source: 'memory',
          warning: 'MongoDB bağlantısı yok, geçici bellek kullanılıyor.'
        },
        { status: 201 }
      );
    }
  } else {
    // MongoDB yoksa in-memory kullan
    const topic = await inMemoryDB.createTopic({ title, description, author });
    return NextResponse.json(
      { 
        success: true, 
        data: topic, 
        source: 'memory',
        warning: 'MongoDB bağlantısı yok, geçici bellek kullanılıyor. Veriler kalıcı değildir.'
      },
      { status: 201 }
    );
  }
}

