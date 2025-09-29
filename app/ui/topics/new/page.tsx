import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export default function NewTopicPage() {
  // Server action to create a new topic
  async function createTopic(data: FormData) {
    "use server"; // Required for server actions
    const name = data.get("name")?.toString();
    if (!name) return;

    // Create topic in the database
    await prisma.topic.create({ data: { name } });

    // Revalidate /ui page so the sidebar updates immediately
    revalidatePath("/ui");
  }

  return (
    <form action={createTopic}>
      <h1>Create a New Topic</h1>

      {/* Make sure the input has a name so FormData captures it */}
      <input name="name" type="text" placeholder="Topic name" />

      <button type="submit">Create</button>
    </form>
  );
}
