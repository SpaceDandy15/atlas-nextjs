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
  return (
    <ul className="space-y-2">
      {answers
        .sort((a, b) => (b.accepted ? 1 : 0) - (a.accepted ? 1 : 0)) // accepted first
        .map((answer) => (
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
