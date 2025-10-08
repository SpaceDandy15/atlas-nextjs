// QuestionPageClient.tsx
"use client";

import { useState } from "react";
import AnswerList from "./AnswerList";
import { AnswerForm, Answer } from "./AnswerForm";
import { addAnswer as addAnswerServer, acceptAnswer as acceptAnswerServer } from "@/lib/actions";

interface QuestionPageClientProps {
  questionId: string;
  questionTitle: string;
  initialAnswers: Answer[];
}

export default function QuestionPageClient({
  questionId,
  questionTitle,
  initialAnswers,
}: QuestionPageClientProps) {
  const [answers, setAnswers] = useState<Answer[]>(initialAnswers);

  async function handleAddAnswer(answerText: string) {
    const formData = new FormData();
    formData.append("answer", answerText);
    formData.append("question_id", questionId);

    const newAnswer = await addAnswerServer(formData); // call server action
    if (newAnswer) setAnswers((prev) => [...prev, newAnswer]);
  }

  async function handleAccept(answerId: string) {
    await acceptAnswerServer(answerId, questionId); // call server action
    setAnswers((prev) =>
      prev.map((a) => ({ ...a, accepted: a.id === answerId }))
    );
  }

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-2">Answers</h2>
      <AnswerForm questionId={questionId} onSubmit={handleAddAnswer} />
      <AnswerList
        questionId={questionId}
        answers={answers}
        onAccept={handleAccept}
      />
    </div>
  );
}
