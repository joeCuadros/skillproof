export type FeedbackType =
  | "positive"
  | "negative"
  | "neutral"
  | "report";

export type FeedbackStatus =
  | "pending"
  | "approved"
  | "disputed"
  | "rejected";

export interface Feedback {
  id: string;

  from: "student" | "company";
  to: "student" | "company";

  authorName: string;
  targetName: string;

  challenge?: string;

  type: FeedbackType;

  message: string;

  rating: number; // 1-5

  skills?: string[];

  attachments?: string[];

  status: FeedbackStatus;

  createdAt: string;
}