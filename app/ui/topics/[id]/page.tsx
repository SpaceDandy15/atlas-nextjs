import { AskQuestion } from "@/components/AskQuestion";
import { Question } from "@/components/Question";
import { fetchTopic, fetchQuestions } from "@/lib/data";
import Link from "next/link";

export default async function TopicPage({ params }: { params: Promise<{ id: string }> }) {
  // Await params if Next.js expects it as a Promise
  const { id: topicId } = await params;

  const topic = await fetchTopic(topicId);
  const questions = await fetchQuestions(topicId);

  if (!topic) return <div>Topic not found</div>;

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">{topic.title}</h1>

      {/* Form to add a new question */}
      <AskQuestion topic={topic.id} />

      {/* List of questions with vote buttons */}
      {questions.map((q) => (
        // Wrap each Question in a Link to /ui/questions/:id
        <Link key={q.id} href={`/ui/questions/${q.id}`}>
          <Question
            id={q.id}
            text={q.title}
            votes={q.votes}
            topic_id={topic.id}
          />
        </Link>
      ))}
    </div>
  );
}
