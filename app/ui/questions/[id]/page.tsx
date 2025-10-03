import AnswerForm from "@/components/AnswerForm";
import AnswerList, { Answer } from "@/components/AnswerList";
import { fetchQuestion, fetchAnswers } from "@/lib/data";

export default async function QuestionPage({
  params,
}: {
  params: { id: string }; // server component params
}) {
  const { id: questionId } = params;

  const question = await fetchQuestion(questionId);
  const answersData = await fetchAnswers(questionId);

  if (!question) {
    return <div className="p-6">Question not found</div>;
  }

  // Map answers to include `accepted` property
  const initialAnswers: Answer[] = answersData.map((ans) => ({
    id: ans.id,
    answer: ans.answer,
    accepted: ans.accepted, // assumes your DB has the boolean column
  }));

  return (
    <div className="p-6">
      {/* Question Heading */}
      <h1 className="text-2xl font-bold mb-4">{question.title}</h1>

      {/* Answer Form */}
      <AnswerForm questionId={questionId} />

      {/* Answers List */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Answers</h2>
        <AnswerList questionId={questionId} initialAnswers={initialAnswers} />
      </div>
    </div>
  );
}
