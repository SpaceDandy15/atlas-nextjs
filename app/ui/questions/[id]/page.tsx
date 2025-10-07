import QuestionPageClient from "@/components/QuestionPageClient";
import { fetchQuestion, fetchAnswers } from "@/lib/data";
import { Answer } from "@/components/AnswerList";

interface QuestionPageProps {
  params: Promise<{ id: string }>;
}

export default async function QuestionPage({ params }: QuestionPageProps) {
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

      <QuestionPageClient
        questionId={questionId}
        questionTitle={question.title}
        initialAnswers={initialAnswers}
      />
    </div>
  );
}
