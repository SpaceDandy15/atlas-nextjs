import { AnswerForm } from "@/components/AnswerForm";
import AnswerList, { Answer } from "@/components/AnswerList";
import { fetchQuestion, fetchAnswers } from "@/lib/data";

export default async function QuestionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: questionId } = await params;

  const question = await fetchQuestion(questionId);
  const answersData = await fetchAnswers(questionId);

  if (!question) {
    return <div className="p-6">Question not found</div>;
  }

  const initialAnswers: Answer[] = answersData.map((ans) => ({
    id: ans.id,
    answer: ans.answer,
    accepted: ans.accepted,
  }));

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{question.title}</h1>

      {/* Form for adding a new answer */}
      <AnswerForm questionId={questionId} />

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Answers</h2>
        <AnswerList questionId={questionId} answers={initialAnswers} />
      </div>
    </div>
  );
}
