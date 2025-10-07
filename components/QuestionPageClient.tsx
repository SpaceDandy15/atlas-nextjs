"use client";

import { useState } from "react";
import AnswerList, { Answer } from "./AnswerList";
import { AnswerForm } from "./AnswerForm";
import { addAnswer, acceptAnswer } from "@/lib/actions";

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

  // Add a new answer
  async function handleAddAnswer(answerText: string) {
    try {
      const formData = new FormData();
      formData.append("answer", answerText);
      formData.append("question_id", questionId);

      const newAnswer = await addAnswer(formData);
      if (newAnswer) setAnswers((prev) => [...prev, newAnswer]);
    } catch (error) {
      console.error("Failed to add answer:", error);
    }
  }

  // Mark answer as accepted
  async function handleAccept(answerId: string) {
    try {
      await acceptAnswer(answerId, questionId);
      setAnswers((prev) =>
        prev.map((a) => ({ ...a, accepted: a.id === answerId }))
      );
    } catch (error) {
      console.error("Failed to accept answer:", error);
    }
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
