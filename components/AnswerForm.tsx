"use client";

import { useState } from "react";
import { addAnswer } from "@/lib/actions"; // server action we’ll create
import { useRouter } from "next/navigation";

export default function AnswerForm({ questionId }: { questionId: string }) {
  const [text, setText] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text) return;

    try {
      // Call the server action to insert answer
      await addAnswer(questionId, text);

      // Clear the input
      setText("");

      // Refresh the page to show the new answer
      router.refresh();
    } catch (err) {
      console.error("Failed to submit answer:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write your answer..."
        className="border p-2 rounded w-full"
        rows={3}
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Submit Answer
      </button>
    </form>
  );
}
