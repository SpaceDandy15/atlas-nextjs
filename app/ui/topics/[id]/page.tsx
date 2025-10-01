import { AskQuestion } from "@/components/AskQuestion";
import { Question } from "@/components/Question";
import { fetchTopic, fetchQuestions } from "@/lib/data";

type PageProps = {
  params: { id: string };
};

export default async function TopicPage({ params }: PageProps) {
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
        <Question
          key={q.id}
          id={q.id}
          text={q.title}
          votes={q.votes}
          topic_id={topic.id}
        />
      ))}
    </div>
  );
}
