import { sql } from "@vercel/postgres";
import { Question, Topic, User, Answer } from "./definitions";

// ---------------- Users ----------------
export async function fetchUser(email: string): Promise<User | undefined> {
  try {
    const user = await sql<User>`SELECT * FROM users WHERE email=${email}`;
    return user.rows[0];
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user.");
  }
}

// ---------------- Topics ----------------
export async function fetchTopics() {
  try {
    const data = await sql<Topic>`SELECT * FROM topics`;
    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch topics.");
  }
}

export async function fetchTopic(id: string) {
  try {
    const data = await sql<Topic>`SELECT * FROM topics WHERE id = ${id}`;
    return data.rows.length > 0 ? data.rows[0] : null;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch topics.");
  }
}

export async function insertTopic(topic: Pick<Topic, "title">) {
  try {
    const data = await sql<Topic>`INSERT INTO topics (title) VALUES (${topic.title}) RETURNING id;`;
    return data.rows[0];
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to add topic.");
  }
}

// ---------------- Questions ----------------
export async function fetchQuestions(topicId: string) {
  try {
    const data = await sql<Question>`
      SELECT * FROM questions WHERE topic_id = ${topicId} ORDER BY votes DESC
    `;
    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch questions.");
  }
}

export async function fetchQuestion(id: string): Promise<Question | null> {
  try {
    const data = await sql<Question>`SELECT * FROM questions WHERE id = ${id}`;
    return data.rows.length > 0 ? data.rows[0] : null;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch question.");
  }
}

export async function insertQuestion(
  question: Pick<Question, "title" | "topic_id" | "votes">
) {
  try {
    const data = await sql<Question>`
      INSERT INTO questions (title, topic_id, votes)
      VALUES (${question.title}, ${question.topic_id}, ${question.votes})
    `;
    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to add question.");
  }
}

export async function incrementVotes(id: string) {
  try {
    const data = await sql<Question>`
      UPDATE questions SET votes = votes + 1 WHERE id = ${id}
    `;
    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to increment votes.");
  }
}

// ---------------- Answers ----------------
export async function fetchAnswers(questionId: string): Promise<Answer[]> {
  try {
    const data = await sql<Answer>`
      SELECT * FROM answers WHERE question_id = ${questionId} ORDER BY accepted DESC
    `;
    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch answers.");
  }
}

export async function insertAnswer(answer: Pick<Answer, "answer" | "question_id">) {
  try {
    const data = await sql<Answer>`
      INSERT INTO answers (answer, question_id, accepted)
      VALUES (${answer.answer}, ${answer.question_id}, false)
      RETURNING *
    `;
    return data.rows[0];
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to add answer.");
  }
}

export async function markAcceptedAnswer(answerId: string, questionId: string) {
  try {
    await sql`UPDATE answers SET accepted = false WHERE question_id = ${questionId}`;
    const data = await sql<Answer>`
      UPDATE answers SET accepted = true WHERE id = ${answerId} RETURNING *
    `;
    return data.rows[0];
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to mark accepted answer.");
  }
}

// ---------------- Votes ----------------
// ✅ NEW HELPER for addVote in actions.ts
export async function insertVote({ question_id }: { question_id: string }) {
  try {
    await sql`
      UPDATE questions
      SET votes = votes + 1
      WHERE id = ${question_id}
    `;
    return true;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to add vote.");
  }
}
