import { addAnswer } from "@/lib/actions";

export function AnswerForm({ questionId }: { questionId: string }) {
  return (
    <form action={addAnswer} className="relative my-6">
      <input type="hidden" name="question_id" value={questionId} />
      <textarea
        name="answer"
        placeholder="Write your answer..."
        className="w-full rounded border p-2"
        required
      />
      <button
        type="submit"
        className="absolute right-2 top-2 rounded bg-secondary px-4 py-2 text-white"
      >
        Submit
      </button>
    </form>
  );
}
