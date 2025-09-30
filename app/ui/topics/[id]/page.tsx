// app/ui/topics/[id]/page.tsx
import { AskQuestion } from "@/components/AskQuestion";
import { Question } from "@/components/Question";
import { fetchTopic, fetchQuestions } from "@/lib/data";

type PageProps = {
  params: { id: string }; // UUID string
};

export default async function TopicPage({ params }: PageProps) {
  const { id } = params; // This is the UUID
  const topic = await fetchTopic(id);
  const questions = await fetchQuestions(id);

  if (!topic) return <div>Topic not found</div>;

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">{topic.title}</h1>

      {/* Form to add new questions */}
      <AskQuestion topic={topic.id} />

      {/* List questions */}
      {questions.map((q) => (
        <Question
          key={q.id}
          id={q.id}
          text={q.title}
          votes={q.votes}
        />
      ))}
    </div>
  );
}
