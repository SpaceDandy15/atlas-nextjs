import { HandThumbUpIcon } from "@heroicons/react/24/outline";
import { addVote } from "@/lib/actions";

export default function VoteButton({ id, topic_id }: { id: string; topic_id: string }) {
  return (
    <form action={addVote}>
      <input type="hidden" name="id" value={id} />
      <input type="hidden" name="topic_id" value={topic_id} />
      <button
        type="submit"
        className="h-8 w-8 min-w-[2rem] rounded-full ring-gray-200 hover:text-atlas-teal active:bg-primary active:text-white active:outline-hidden active:ring-2 active:ring-primary"
      >
        <HandThumbUpIcon />
      </button>
    </form>
  );
}
