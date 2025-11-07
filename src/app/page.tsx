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
        if (data.source === 'memory' && data.warning) {
          console.warn(data.warning);
        }
      } else {
        if (data.error && data.error.includes('MongoDB')) {
          console.warn('MongoDB bağlantısı yok, uygulama sınırlı modda çalışıyor.');
        }
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
        if (data.source === 'memory' && data.warning) {
          console.info(data.warning);
        }
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

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) return 'Az önce';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} dakika önce`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} saat önce`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} gün önce`;
    return formatDate(dateString);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-7xl relative z-10">
        {/* Enhanced Header */}
        <header className="mb-12 text-center space-y-4 animate-fade-in">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-xl mb-4 transform hover:rotate-6 transition-transform duration-300">
            <span className="text-4xl">🧠</span>
          </div>
          <h1 className="text-6xl md:text-7xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Beyin Fırtınası
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Fikirlerinizi paylaşın, birlikte yaratın ve harika projeler ortaya çıkarın! 🚀
          </p>
          <div className="flex items-center justify-center gap-4 mt-6">
            <div className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-md">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-sm text-gray-600 font-medium">{topics.length} Aktif Konu</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-md">
              <span className="text-lg">💡</span>
              <span className="text-sm text-gray-600 font-medium">
                {topics.reduce((sum, topic) => sum + topic.ideas.length, 0)} Toplam Fikir
              </span>
            </div>
          </div>
        </header>

        {/* Enhanced Create Topic Button */}
        <div className="mb-10 flex justify-center animate-fade-in-up">
          <button
            onClick={() => setShowModal(true)}
            className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-2xl font-bold text-lg shadow-2xl hover:shadow-purple-500/50 transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-3">
              <span className="text-2xl group-hover:rotate-90 transition-transform duration-300">✨</span>
              <span>Yeni Konu Oluştur</span>
              <span className="text-2xl group-hover:scale-110 transition-transform duration-300">+</span>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </div>

        {/* Enhanced Topics List */}
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-flex flex-col items-center gap-4">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-purple-200 rounded-full"></div>
                <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
              </div>
              <p className="text-gray-600 text-lg font-medium animate-pulse">Konular yükleniyor...</p>
            </div>
          </div>
        ) : topics.length === 0 ? (
          <div className="text-center py-20 animate-fade-in">
            <div className="inline-flex flex-col items-center gap-6 bg-white/80 backdrop-blur-sm rounded-3xl p-12 shadow-xl max-w-md">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center">
                <span className="text-5xl">💭</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Henüz konu yok</h3>
                <p className="text-gray-600 mb-6">
                  İlk konuyu oluşturup beyin fırtınasına başlayın!
                </p>
                <button
                  onClick={() => setShowModal(true)}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                >
                  İlk Konuyu Oluştur
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in-up">
            {topics.map((topic, index) => (
              <Link
                key={topic._id}
                href={`/topics/${topic._id}`}
                className="group relative bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 border border-gray-100 hover:border-purple-300 transform hover:-translate-y-2 overflow-hidden"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Gradient Overlay on Hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/5 group-hover:to-purple-500/5 transition-all duration-300"></div>
                
                <div className="relative z-10">
                  {/* Topic Icon & Badge */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                      <span className="text-2xl">💡</span>
                    </div>
                    <div className="px-3 py-1 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full">
                      <span className="text-xs font-bold text-purple-700">{topic.ideas.length} fikir</span>
                    </div>
                  </div>

                  {/* Topic Title */}
                  <h2 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-purple-600 transition-colors duration-300">
                    {topic.title}
                  </h2>

                  {/* Topic Description */}
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
                    {topic.description}
                  </p>

                  {/* Topic Meta */}
                  <div className="space-y-2 pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <span className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center text-xs">👤</span>
                      <span className="font-medium">{topic.author}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <span>🕒</span>
                      <span>{getTimeAgo(topic.createdAt)}</span>
                    </div>
                  </div>

                  {/* Hover Arrow */}
                  <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                    <span className="text-purple-600 text-xl">→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Enhanced Create Topic Modal */}
        {showModal && (
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in"
            onClick={() => setShowModal(false)}
          >
            <div 
              className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full p-8 max-h-[90vh] overflow-y-auto animate-scale-in"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Yeni Konu Oluştur
                  </h2>
                  <p className="text-gray-500 text-sm mt-1">Fikirlerinizi paylaşmaya başlayın</p>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-800 transition-colors duration-200"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleCreateTopic} className="space-y-6">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2 text-sm uppercase tracking-wide">
                    Başlık
                  </label>
                  <input
                    type="text"
                    value={newTopic.title}
                    onChange={(e) =>
                      setNewTopic({ ...newTopic, title: e.target.value })
                    }
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-lg"
                    required
                    maxLength={200}
                    placeholder="Örn: Yeni bir uygulama fikri"
                  />
                  <p className="text-xs text-gray-400 mt-1">{newTopic.title.length}/200</p>
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2 text-sm uppercase tracking-wide">
                    Açıklama
                  </label>
                  <textarea
                    value={newTopic.description}
                    onChange={(e) =>
                      setNewTopic({ ...newTopic, description: e.target.value })
                    }
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 resize-none"
                    rows={5}
                    required
                    maxLength={1000}
                    placeholder="Konunuzu detaylı bir şekilde açıklayın..."
                  />
                  <p className="text-xs text-gray-400 mt-1">{newTopic.description.length}/1000</p>
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2 text-sm uppercase tracking-wide">
                    Adınız
                  </label>
                  <input
                    type="text"
                    value={newTopic.author}
                    onChange={(e) =>
                      setNewTopic({ ...newTopic, author: e.target.value })
                    }
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-lg"
                    required
                    placeholder="Adınızı girin"
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white px-6 py-4 rounded-xl font-bold text-lg hover:shadow-xl hover:scale-105 transform transition-all duration-200"
                  >
                    ✨ Konuyu Oluştur
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-6 py-4 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-200"
                  >
                    İptal
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
      
      {/* Enhanced Footer Messages */}
      <div className="fixed bottom-0 left-0 right-0 pointer-events-none z-40 pb-4">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex justify-between items-center bg-white/80 backdrop-blur-md rounded-2xl px-6 py-3 shadow-lg">
            <div className="text-sm text-gray-700 font-medium flex items-center gap-2">
              <span className="text-red-500">❤️</span>
              <span>canım anam Nermin</span>
            </div>
            <div className="text-sm text-gray-700 font-medium flex items-center gap-2">
              <span>sayın psikoloğumuz Kemal beye selamlar</span>
              <span className="text-blue-500">👋</span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scale-in {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out;
        }
        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
