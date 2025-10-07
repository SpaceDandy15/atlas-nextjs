"use client";

import { useState } from "react";

interface AnswerFormProps {
  questionId: string;
  onSubmit: (answerText: string) => void;
}

export function AnswerForm({ questionId, onSubmit }: AnswerFormProps) {
  const [answer, setAnswer] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!answer.trim()) return;
    onSubmit(answer);
    setAnswer(""); // clear textarea
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <textarea
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        className="w-full border rounded p-2"
        placeholder="Write your answer..."
      />
      <button
        type="submit"
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Submit Answer
      </button>
    </form>
  );
}
