import mongoose, { Schema, Document } from 'mongoose';

export interface IIdea {
  _id?: string;
  content: string;
  author: string;
  createdAt: Date;
}

export interface ITopic extends Document {
  title: string;
  description: string;
  author: string;
  ideas: IIdea[];
  createdAt: Date;
  updatedAt: Date;
}

const IdeaSchema = new Schema<IIdea>({
  content: {
    type: String,
    required: [true, 'Fikir içeriği gereklidir'],
    trim: true,
  },
  author: {
    type: String,
    required: [true, 'Yazar adı gereklidir'],
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const TopicSchema = new Schema<ITopic>(
  {
    title: {
      type: String,
      required: [true, 'Başlık gereklidir'],
      trim: true,
      maxlength: [200, 'Başlık en fazla 200 karakter olabilir'],
    },
    description: {
      type: String,
      required: [true, 'Açıklama gereklidir'],
      trim: true,
      maxlength: [1000, 'Açıklama en fazla 1000 karakter olabilir'],
    },
    author: {
      type: String,
      required: [true, 'Yazar adı gereklidir'],
      trim: true,
    },
    ideas: [IdeaSchema],
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Topic || mongoose.model<ITopic>('Topic', TopicSchema);

