import Link from "next/link";
import { fetchTopics } from "@/lib/data";
import SignOutButton from "@/components/SignOutButton";

export default async function UILayout({ children }: { children: React.ReactNode }) {
  const topics = await fetchTopics(); // fetch topics from DB

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <aside style={{ width: "220px", padding: "1rem", background: "#f0f0f0", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <div>
          <h2>Dashboard</h2>
          <nav>
            <ul style={{ listStyle: "none", padding: 0 }}>
              <li style={{ marginBottom: "0.5rem" }}>
                <Link href="/ui">Home</Link>
              </li>
              <li style={{ marginBottom: "0.5rem" }}>
                <Link href="/ui/topics/new">New Topic</Link>
              </li>

              {/* Render topics from DB */}
              {topics.map((topic) => (
                <li key={topic.id} style={{ marginBottom: "0.5rem" }}>
                  <Link href={`/ui/topics/${topic.id}`}>{topic.title}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* 👇 Sign Out button stays at the bottom */}
        <SignOutButton />
      </aside>

      {/* Main content */}
      <main style={{ flex: 1, padding: "1rem" }}>{children}</main>
    </div>
  );
}
