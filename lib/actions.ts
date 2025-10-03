"use server";

import { revalidatePath } from "next/cache";
import {
  insertQuestion,
  incrementVotes,
  insertAnswer,
  markAcceptedAnswer,
} from "./data";

// ---------------- Questions ----------------

// Add a new question
export async function addQuestion(formData: FormData) {
  const title = formData.get("title") as string;
  const topic_id = formData.get("topic_id") as string;

  if (!title || !topic_id) return;

  try {
    await insertQuestion({ title, topic_id, votes: 0 });
    revalidatePath(`/ui/topics/${topic_id}`);
  } catch (err) {
    console.error("Failed to add question:", err);
  }
}

// Vote on a question
export async function addVote(formData: FormData) {
  const id = formData.get("id") as string;
  const topic_id = formData.get("topic_id") as string;

  if (!id || !topic_id) return;

  try {
    await incrementVotes(id);
    revalidatePath(`/ui/topics/${topic_id}`);
  } catch (err) {
    console.error("Failed to add vote:", err);
  }
}

// ---------------- Answers ----------------

// Add a new answer
export async function addAnswer(questionId: string, text: string) {
  if (!text || !questionId) return;

  try {
    await insertAnswer({ question_id: questionId,  answer: text });
    revalidatePath(`/ui/questions/${questionId}`);
  } catch (err) {
    console.error("Failed to add answer:", err);
  }
}

// Mark an answer as accepted
export async function acceptAnswer(answerId: string, questionId: string) {
  if (!answerId || !questionId) return;

  try {
    await markAcceptedAnswer(answerId, questionId);
    revalidatePath(`/ui/questions/${questionId}`);
  } catch (err) {
    console.error("Failed to accept answer:", err);
  }
}
