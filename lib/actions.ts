"use server";

import { revalidatePath } from "next/cache";
import { insertQuestion, insertAnswer, markAcceptedAnswer } from "./data";
import { insertVote } from "./data";

// Add a new question
export async function addQuestion(formData: FormData): Promise<void> {
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

// Add a new answer
export async function addAnswer(formData: FormData) {
  const questionId = formData.get("question_id") as string;
  const answer = formData.get("answer") as string;

  if (!questionId || !answer) return;

  try {
    const newAnswer = await insertAnswer({ question_id: questionId, answer });
    revalidatePath(`/ui/questions/${questionId}`);
    return newAnswer;
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

// Add a vote
export async function addVote(formData: FormData) {
  const id = formData.get("id") as string;
  const topic_id = formData.get("topic_id") as string;

  if (!id || !topic_id) return;

  try {
    if (typeof insertVote === "function") {
      await insertVote({ question_id: id, topic_id });
    } else {
      console.log(`Vote added for question ${id} in topic ${topic_id}`);
    }

    revalidatePath(`/ui/topics/${topic_id}`);
  } catch (err) {
    console.error("Failed to add vote:", err);
  }
}
