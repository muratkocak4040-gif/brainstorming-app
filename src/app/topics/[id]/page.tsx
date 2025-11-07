'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';

interface Idea {
  _id?: string;
  content: string;
  author: string;
  createdAt: string;
}

interface Topic {
  _id: string;
  title: string;
  description: string;
  author: string;
  ideas: Idea[];
  createdAt: string;
  updatedAt: string;
}

export default function TopicDetail() {
  const params = useParams();
  const router = useRouter();
  const [topic, setTopic] = useState<Topic | null>(null);
  const [loading, setLoading] = useState(true);
  const [newIdea, setNewIdea] = useState({
    content: '',
    author: '',
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (params.id) {
      fetchTopic();
    }
  }, [params.id]);

  const fetchTopic = async () => {
    try {
      const response = await fetch(`/api/topics/${params.id}`);
      const data = await response.json();
      if (data.success) {
        setTopic(data.data);
      } else {
        alert('Konu bulunamadı');
        router.push('/');
      }
    } catch (error) {
      console.error('Konu yüklenirken hata:', error);
      alert('Konu yüklenirken bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  const handleAddIdea = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newIdea.content || !newIdea.author) {
      alert('Lütfen fikir içeriği ve adınızı girin');
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch(`/api/topics/${params.id}/ideas`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newIdea),
      });

      const data = await response.json();
      if (data.success) {
        setTopic(data.data);
        setNewIdea({ content: '', author: '' });
      } else {
        alert('Hata: ' + data.error);
      }
    } catch (error) {
      console.error('Fikir eklenirken hata:', error);
      alert('Fikir eklenirken bir hata oluştu');
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (!topic) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6 font-semibold"
        >
          ← Ana Sayfaya Dön
        </Link>

        {/* Topic Header */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-6 border border-gray-200">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            {topic.title}
          </h1>
          <p className="text-gray-600 text-lg mb-4 whitespace-pre-wrap">
            {topic.description}
          </p>
          <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-gray-200">
            <span>👤 Oluşturan: {topic.author}</span>
            <span>📅 {formatDate(topic.createdAt)}</span>
          </div>
          <div className="mt-2 text-sm text-gray-500">
            💡 {topic.ideas.length} fikir paylaşıldı
          </div>
        </div>

        {/* Add Idea Form */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Fikrinizi Paylaşın
          </h2>
          <form onSubmit={handleAddIdea}>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                Fikriniz
              </label>
              <textarea
                value={newIdea.content}
                onChange={(e) =>
                  setNewIdea({ ...newIdea, content: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={4}
                required
                placeholder="Fikrinizi buraya yazın..."
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                Adınız
              </label>
              <input
                type="text"
                value={newIdea.author}
                onChange={(e) =>
                  setNewIdea({ ...newIdea, author: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
                placeholder="Adınızı girin"
              />
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? 'Ekleniyor...' : 'Fikri Paylaş'}
            </button>
          </form>
        </div>

        {/* Ideas List */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Paylaşılan Fikirler ({topic.ideas.length})
          </h2>
          {topic.ideas.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <p className="text-lg">
                Henüz fikir paylaşılmamış. İlk fikri siz paylaşın! 🚀
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {topic.ideas.map((idea, index) => (
                <div
                  key={idea._id || index}
                  className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-5 border border-blue-100 hover:shadow-md transition-all duration-200"
                >
                  <p className="text-gray-800 mb-3 whitespace-pre-wrap">
                    {idea.content}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-600 pt-3 border-t border-blue-200">
                    <span className="font-semibold">👤 {idea.author}</span>
                    <span>{formatDate(idea.createdAt)}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

