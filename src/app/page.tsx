'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
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

export default function Home() {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [newTopic, setNewTopic] = useState({
    title: '',
    description: '',
    author: '',
  });
  const router = useRouter();

  useEffect(() => {
    fetchTopics();
  }, []);

  const fetchTopics = async () => {
    try {
      const response = await fetch('/api/topics');
      const data = await response.json();
      if (data.success) {
        setTopics(data.data);
      }
    } catch (error) {
      console.error('Konular yüklenirken hata:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTopic = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/topics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTopic),
      });

      const data = await response.json();
      if (data.success) {
        setTopics([data.data, ...topics]);
        setNewTopic({ title: '', description: '', author: '' });
        setShowModal(false);
      } else {
        alert('Hata: ' + data.error);
      }
    } catch (error) {
      console.error('Konu oluşturulurken hata:', error);
      alert('Konu oluşturulurken bir hata oluştu');
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <header className="mb-8 text-center">
          <h1 className="text-5xl font-bold text-gray-800 mb-2">
            🧠 Beyin Fırtınası
          </h1>
          <p className="text-gray-600 text-lg">
            Fikirlerinizi paylaşın, birlikte yaratın!
          </p>
        </header>

        {/* Create Topic Button */}
        <div className="mb-6 flex justify-center">
          <button
            onClick={() => setShowModal(true)}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
          >
            + Yeni Konu Oluştur
          </button>
        </div>

        {/* Topics List */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600">Yükleniyor...</p>
          </div>
        ) : topics.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-md">
            <p className="text-gray-500 text-lg">
              Henüz konu oluşturulmamış. İlk konuyu siz oluşturun!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topics.map((topic) => (
              <Link
                key={topic._id}
                href={`/topics/${topic._id}`}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-200 p-6 border border-gray-200 hover:border-blue-300 transform hover:-translate-y-1"
              >
                <h2 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">
                  {topic.title}
                </h2>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {topic.description}
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                  <span>👤 {topic.author}</span>
                  <span>💡 {topic.ideas.length} fikir</span>
                </div>
                <div className="text-xs text-gray-400">
                  {formatDate(topic.createdAt)}
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Create Topic Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Yeni Konu Oluştur
              </h2>
              <form onSubmit={handleCreateTopic}>
                <div className="mb-4">
                  <label className="block text-gray-700 font-semibold mb-2">
                    Başlık
                  </label>
                  <input
                    type="text"
                    value={newTopic.title}
                    onChange={(e) =>
                      setNewTopic({ ...newTopic, title: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                    maxLength={200}
                    placeholder="Örn: Yeni bir uygulama fikri"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-semibold mb-2">
                    Açıklama
                  </label>
                  <textarea
                    value={newTopic.description}
                    onChange={(e) =>
                      setNewTopic({ ...newTopic, description: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={4}
                    required
                    maxLength={1000}
                    placeholder="Konunuzu detaylı bir şekilde açıklayın..."
                  />
                </div>
                <div className="mb-6">
                  <label className="block text-gray-700 font-semibold mb-2">
                    Adınız
                  </label>
                  <input
                    type="text"
                    value={newTopic.author}
                    onChange={(e) =>
                      setNewTopic({ ...newTopic, author: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                    placeholder="Adınızı girin"
                  />
                </div>
                <div className="flex gap-3">
                  <button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-200"
                  >
                    Oluştur
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-all duration-200"
                  >
                    İptal
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
