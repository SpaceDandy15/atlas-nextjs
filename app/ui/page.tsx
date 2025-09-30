// app/ui/page.tsx
import Link from "next/link";
import { fetchTopics } from "@/lib/data";

export default async function UiPage() {
  const topics = await fetchTopics();

  return (
    <main className="flex flex-col items-stretch justify-stretch p-4">
      <h1 className="mb-4 text-xl md:text-2xl">Topics</h1>
      {topics.map((topic) => (
        <Link
          key={topic.id}
          href={`/ui/topics/${topic.id}`} // Use UUID directly
          className="block p-2 mb-2 border rounded hover:bg-gray-100"
        >
          {topic.title}
        </Link>
      ))}
    </main>
  );
}
