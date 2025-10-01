"use server";

import { revalidatePath } from "next/cache";
import { insertQuestion, incrementVotes } from "./data";

// Server action to add a new question
export async function addQuestion(formData: FormData) {
  const title = formData.get("title") as string;
  const topic_id = formData.get("topic_id") as string;

  if (!title || !topic_id) return;

  try {
    await insertQuestion({ title, topic_id, votes: 0 });

    // Revalidate the topic page to show new question
    revalidatePath(`/ui/topics/${topic_id}`);
  } catch (err) {
    console.error("Failed to add question:", err);
  }
}

// Server action to vote on a question
export async function addVote(formData: FormData) {
  const id = formData.get("id") as string;
  const topic_id = formData.get("topic_id") as string;

  if (!id || !topic_id) return;

  try {
    const updated = await incrementVotes(id);

    // For debugging, log what came back
    console.log("Vote updated:", updated);

    // Revalidate the topic page to show updated votes
    revalidatePath(`/ui/topics/${topic_id}`);
  } catch (err) {
    console.error("Failed to add vote:", err);
  }
}
