// app/ui/page.tsx
import { fetchTopics } from "@/lib/data";
import { Topic } from "@/components/Topic";

export default async function UiPage() {
  const topics = await fetchTopics();

  return (
    <main className="flex flex-col items-stretch justify-stretch p-4">
      <h1 className="mb-4 text-xl md:text-2xl">Topics</h1>
      {topics.map((topic) => (
        <Topic key={topic.id} id={topic.id} text={topic.title} />
      ))}
    </main>
  );
}
