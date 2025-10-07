"use client";

import { Answer } from "./AnswerForm";

interface AnswerItemProps {
  answer: Answer;
  questionId: string;
  onAccept: () => void;
}

export default function AnswerItem({ answer, onAccept }: AnswerItemProps) {
  return (
    <li className="border rounded p-3 flex justify-between items-start">
      <p className="flex-1">{answer.answer}</p>

      {/* Accepted checkmark */}
      {answer.accepted ? (
        <span className="ml-4 text-green-500 font-bold">✔</span>
      ) : (
        <button
          onClick={onAccept}
          className="ml-4 px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
        >
          Mark as Answer
        </button>
      )}
    </li>
  );
}
