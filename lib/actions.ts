"use server";

import { revalidatePath } from "next/cache";
import { 
  insertAnswer, 
  markAcceptedAnswer 
} from "./data";

// Add a new answer
export async function addAnswer(formData: FormData) {
  const questionId = formData.get("question_id") as string;
  const answer = formData.get("answer") as string;

  if (!questionId || !answer) return;

  try {
    const newAnswer = await insertAnswer({ question_id: questionId, answer });
    revalidatePath(`/ui/questions/${questionId}`);
    return newAnswer; // Return inserted answer to client
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
