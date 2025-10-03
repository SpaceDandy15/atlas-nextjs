import AnswerForm from "@/components/AnswerForm";
import AnswerItem from "@/components/AnswerItem";
import { fetchQuestion, fetchAnswers } from "@/lib/data";

export default async function QuestionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // ✅ Await params first
  const { id: questionId } = await params;

  const question = await fetchQuestion(questionId);
  const answers = await fetchAnswers(questionId);

  if (!question) {
    return <div className="p-6">Question not found</div>;
  }

  return (
    <div className="p-6">
      {/* Question Heading */}
      <h1 className="text-2xl font-bold mb-4">{question.title}</h1>

      {/* Answer Form */}
      <AnswerForm questionId={questionId} />

      {/* Answers List */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Answers</h2>
        <ul className="space-y-2">
          {answers
            .sort((a, b) => (a.id === question.accepted_answer_id ? -1 : 1)) // accepted first
            .map((answer) => (
              <AnswerItem
                key={answer.id}
                answer={{
                  ...answer,
                  accepted: answer.id === question.accepted_answer_id,
                }}
              />
            ))}
        </ul>
      </div>
    </div>
  );
}
