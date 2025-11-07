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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative inline-block mb-4">
            <div className="w-16 h-16 border-4 border-purple-200 rounded-full"></div>
            <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
          </div>
          <p className="text-gray-600 text-lg font-medium">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (!topic) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-5xl relative z-10">
        {/* Enhanced Back Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-800 mb-8 font-semibold group transition-colors duration-200"
        >
          <span className="transform group-hover:-translate-x-1 transition-transform duration-200">←</span>
          <span>Ana Sayfaya Dön</span>
        </Link>

        {/* Enhanced Topic Header */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 mb-8 border border-gray-100 animate-fade-in">
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full mb-4">
                <span className="text-lg">💡</span>
                <span className="text-sm font-bold text-purple-700">{topic.ideas.length} Fikir</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
                {topic.title}
              </h1>
              <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-wrap">
                {topic.description}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-6 border-t border-gray-200">
            <div className="flex items-center gap-3 px-4 py-2 bg-gray-50 rounded-xl">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold">
                {topic.author.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="text-xs text-gray-500">Oluşturan</p>
                <p className="text-sm font-semibold text-gray-800">{topic.author}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-xl">
              <span className="text-lg">📅</span>
              <div>
                <p className="text-xs text-gray-500">Oluşturulma</p>
                <p className="text-sm font-semibold text-gray-800">{formatDate(topic.createdAt)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Add Idea Form */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-8 mb-8 border border-gray-100 animate-fade-in-up">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-md">
              <span className="text-2xl">✨</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Fikrinizi Paylaşın</h2>
              <p className="text-gray-500 text-sm">Düşüncelerinizi bizimle paylaşın</p>
            </div>
          </div>

          <form onSubmit={handleAddIdea} className="space-y-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-2 text-sm uppercase tracking-wide">
                Fikriniz
              </label>
              <textarea
                value={newIdea.content}
                onChange={(e) =>
                  setNewIdea({ ...newIdea, content: e.target.value })
                }
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 resize-none text-lg"
                rows={5}
                required
                placeholder="Fikrinizi detaylı bir şekilde buraya yazın..."
              />
              <p className="text-xs text-gray-400 mt-1">{newIdea.content.length} karakter</p>
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2 text-sm uppercase tracking-wide">
                Adınız
              </label>
              <input
                type="text"
                value={newIdea.author}
                onChange={(e) =>
                  setNewIdea({ ...newIdea, author: e.target.value })
                }
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-lg"
                required
                placeholder="Adınızı girin"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white px-6 py-4 rounded-xl font-bold text-lg hover:shadow-xl hover:scale-105 transform transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
            >
              {submitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Ekleniyor...</span>
                </>
              ) : (
                <>
                  <span>🚀</span>
                  <span>Fikri Paylaş</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Enhanced Ideas List */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-gray-100 animate-fade-in-up">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center shadow-md">
                <span className="text-2xl">💬</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Paylaşılan Fikirler</h2>
                <p className="text-gray-500 text-sm">{topic.ideas.length} fikir paylaşıldı</p>
              </div>
            </div>
          </div>

          {topic.ideas.length === 0 ? (
            <div className="text-center py-16">
              <div className="inline-flex flex-col items-center gap-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-12">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center">
                  <span className="text-4xl">💭</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Henüz fikir yok</h3>
                  <p className="text-gray-600">
                    İlk fikri siz paylaşın ve tartışmayı başlatın! 🚀
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {topic.ideas.map((idea, index) => (
                <div
                  key={idea._id || index}
                  className="group bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-transparent hover:border-purple-200 hover:shadow-lg transition-all duration-300 animate-fade-in-up"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold flex-shrink-0 shadow-md">
                      {idea.author.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-gray-800 text-lg leading-relaxed whitespace-pre-wrap mb-4">
                        {idea.content}
                      </p>
                      <div className="flex items-center justify-between pt-4 border-t border-purple-200">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-gray-700">👤 {idea.author}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <span>🕒</span>
                          <span>{getTimeAgo(idea.createdAt)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      {/* Enhanced Footer Messages */}
      <div className="fixed bottom-0 left-0 right-0 pointer-events-none z-40 pb-4">
        <div className="container mx-auto px-4 max-w-5xl">
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
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out;
        }
      `}</style>
    </div>
  );
}
