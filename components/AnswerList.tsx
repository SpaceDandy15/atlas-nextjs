"use client";

import AnswerItem from "./AnswerItem";
import { Answer } from "./AnswerForm";

export default function AnswerList({
  questionId,
  answers,
  onAccept,
}: {
  questionId: string;
  answers: Answer[];
  onAccept: (answerId: string) => void;
}) {
  // Sort so accepted answers always appear first
  const sortedAnswers = [...answers].sort((a, b) => {
    if (a.accepted && !b.accepted) return -1;
    if (!a.accepted && b.accepted) return 1;
    return 0;
  });

  return (
    <ul className="space-y-2">
      {sortedAnswers.map((answer) => (
        <AnswerItem
          key={answer.id}
          answer={answer}
          questionId={questionId}
          onAccept={() => onAccept(answer.id)}
        />
      ))}
    </ul>
  );
}
