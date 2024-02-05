export interface User {
  id: string;
  createdAt: string;
  updatedAt: string;
  clerkId: string;
  email: string;
}

export interface JournalEntry {
  id: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  content: string;
  analysis?: Analysis;
}

export interface Analysis {
  id: string;
  createdAt: string;
  updatedAt: string;
  entryId: string;
  userId: string;
  mood: string;
  summary: string;
  color: string;
  negative: boolean;
  subject: string;
  sentimentScore: number;
}
