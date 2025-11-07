// Geçici in-memory veritabanı (MongoDB yoksa kullanılır)
// NOT: Bu sadece demo amaçlıdır, veriler server restart'ta kaybolur

interface Idea {
  _id: string;
  content: string;
  author: string;
  createdAt: Date;
}

interface Topic {
  _id: string;
  title: string;
  description: string;
  author: string;
  ideas: Idea[];
  createdAt: Date;
  updatedAt: Date;
}

let topics: Topic[] = [];
let idCounter = 1;

export const inMemoryDB = {
  async getAllTopics(): Promise<Topic[]> {
    return topics.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  },

  async getTopicById(id: string): Promise<Topic | null> {
    return topics.find(t => t._id === id) || null;
  },

  async createTopic(data: { title: string; description: string; author: string }): Promise<Topic> {
    const topic: Topic = {
      _id: `topic-${idCounter++}`,
      title: data.title,
      description: data.description,
      author: data.author,
      ideas: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    topics.push(topic);
    return topic;
  },

  async addIdea(topicId: string, data: { content: string; author: string }): Promise<Topic | null> {
    const topic = topics.find(t => t._id === topicId);
    if (!topic) return null;

    const idea: Idea = {
      _id: `idea-${idCounter++}`,
      content: data.content,
      author: data.author,
      createdAt: new Date(),
    };

    topic.ideas.push(idea);
    topic.updatedAt = new Date();
    return topic;
  },
};

