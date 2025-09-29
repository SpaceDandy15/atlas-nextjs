import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// Define the props type for Next.js App Router
type Props = {
  params: { id: string };
};

// Server action to add a new question
async function addQuestion(data: FormData, topicId: number) {
  "use server";
  const text = data.get("text")?.toString();
  if (!text) return;

  await prisma.question.create({
    data: {
      text,
      topicId,
      votes: 0,
    },
  });

  revalidatePath(`/ui/topics/${topicId}`);
}

// Server action to vote up a question
async function voteQuestion(questionId: number, topicId: number) {
  "use server";
  const question = await prisma.question.findUnique({ where: { id: questionId } });
  if (!question) return;

  await prisma.question.update({
    where: { id: questionId },
    data: { votes: question.votes + 1 },
  });

  revalidatePath(`/ui/topics/${topicId}`);
}

// Main page component
export default async function TopicPage({ params }: Props) {
  const topicId = parseInt(params.id);

  // Fetch the topic and its questions from DB
  const topic = await prisma.topic.findUnique({
    where: { id: topicId },
    include: { questions: true },
  });

  if (!topic) return <p>Topic not found</p>;

  return (
    <div>
      <h1>{topic.name}</h1>

      {/* Form to add a new question */}
      <form action={async (formData: FormData) => await addQuestion(formData, topicId)}>
        <input name="text" type="text" placeholder="Ask a question" />
        <button type="submit">Ask</button>
      </form>

      <ul>
        {topic.questions.map((q) => (
          <li key={q.id} style={{ marginBottom: "0.5rem" }}>
            {q.text} – {q.votes} 👍
            <form
              style={{ display: "inline", marginLeft: "0.5rem" }}
              action={async () => await voteQuestion(q.id, topicId)}
            >
              <button type="submit">👍</button>
            </form>
          </li>
        ))}
      </ul>
    </div>
  );
}
