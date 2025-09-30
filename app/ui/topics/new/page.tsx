// app/ui/topics/new/page.tsx
import { revalidatePath } from "next/cache";
import { insertTopic } from "@/lib/data";

export default function NewTopicPage() {
  // Server action to create a new topic
  async function createTopic(data: FormData) {
    "use server"; // Required for server actions

    const title = data.get("title")?.toString();
    if (!title) return;

    // Insert topic into the database
    await insertTopic({ title });

    // Revalidate /ui page so the sidebar and list update immediately
    revalidatePath("/ui");
  }

  return (
    <form action={createTopic} className="space-y-4 p-4">
      <h1 className="text-2xl font-bold">Create a New Topic</h1>

      {/* Input field must match "title" since insertTopic expects { title } */}
      <input
        name="title"
        type="text"
        placeholder="Topic title"
        className="border p-2 rounded w-full"
      />

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Create
      </button>
    </form>
  );
}
