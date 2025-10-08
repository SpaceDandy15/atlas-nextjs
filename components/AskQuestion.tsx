import { addQuestion } from "@/lib/actions";

export function AskQuestion({ topic }: { topic: string }) {
  return (
    <form
      action={async (formData: FormData) => {
        await addQuestion(formData); // wrap in async to ensure void return
      }}
      className="relative my-8"
    >
      <input type="hidden" name="topic_id" value={topic} />
      <input
        type="text"
        name="title"
        placeholder="Ask a question"
        className="w-full rounded border p-2"
      />
      <button
        type="submit"
        className="absolute right-2 top-2 rounded bg-secondary px-4 py-2 text-white"
      >
        Ask
      </button>
    </form>
  );
}
