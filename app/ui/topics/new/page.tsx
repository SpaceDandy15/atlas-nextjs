// app/ui/topics/new/page.tsx
import { revalidatePath } from "next/cache";
import { insertTopic } from "@/lib/data";

export default function NewTopicPage() {
  async function createTopic(data: FormData) {
    "use server";
    const title = data.get("title")?.toString();
    if (!title) return;

    await insertTopic({ title });

    // Revalidate /ui page to show new topic
    revalidatePath("/ui");
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Create a New Topic</h1>
      <form action={createTopic} className="flex flex-col gap-2 max-w-md">
        <input
          name="title"
          type="text"
          placeholder="Topic title"
          className="border px-2 py-1"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
        >
          Create
        </button>
      </form>
    </div>
  );
}
