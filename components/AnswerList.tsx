"use client";

import { useState } from "react";
import AnswerItem from "./AnswerItem";

export type Answer = {
  id: string;
  answer: string;
  accepted: boolean;
};

export default function AnswerList({
  initialAnswers,
  questionId,
}: {
  initialAnswers: Answer[];
  questionId: string;
}) {
  const [answers, setAnswers] = useState<Answer[]>(initialAnswers);

  const handleAccept = (id: string) => {
    // Update state to mark only this answer as accepted
    setAnswers((prev) =>
      prev.map((a) => ({ ...a, accepted: a.id === id }))
    );
    // Optional: sort so accepted answer moves to top
    setAnswers((prev) =>
      [...prev].sort((a, b) => (b.accepted ? 1 : 0) - (a.accepted ? 1 : 0))
    );
  };

  return (
    <ul className="space-y-2">
      {answers.map((answer) => (
        <AnswerItem
          key={answer.id}
          answer={answer}
          questionId={questionId}
          onAccept={handleAccept}
        />
      ))}
    </ul>
  );
}
