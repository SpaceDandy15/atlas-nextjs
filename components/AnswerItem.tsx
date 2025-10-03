"use client";

import { CheckIcon } from "@heroicons/react/24/solid";
import { acceptAnswer } from "@/lib/actions";

export default function AnswerItem({
  answer,
  questionId,
  onAccept,
}: {
  answer: { id: string; answer: string; accepted: boolean };
  questionId: string;
  onAccept: (id: string) => void;
}) {
  const handleAccept = async () => {
    try {
      await acceptAnswer(answer.id, questionId);
      onAccept(answer.id); // update parent state
    } catch (err) {
      console.error("Failed to mark answer as accepted:", err);
    }
  };

  return (
    <li
      className={`p-3 border rounded flex items-center justify-between ${
        answer.accepted ? "bg-green-50 border-green-400" : "bg-white"
      }`}
    >
      <span>{answer.answer}</span>
      <button
        onClick={handleAccept}
        className={`ml-4 w-8 h-8 flex items-center justify-center rounded-full border transition-colors ${
          answer.accepted
            ? "bg-green-500 border-green-500 text-white"
            : "border-gray-300 text-gray-500 hover:bg-green-100 hover:text-green-700"
        }`}
      >
        <CheckIcon className="w-5 h-5" />
      </button>
    </li>
  );
}
