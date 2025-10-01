import Link from "next/link";
import Image from "next/image";
import { fetchTopics } from "@/lib/data";
import SignOutButton from "@/components/SignOutButton";
import NewTopicButton from "@/components/NewTopicButton";

export default async function UILayout({ children }: { children: React.ReactNode }) {
  const topics = await fetchTopics(); // fetch topics from DB

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <aside
        style={{
          width: "220px",
          padding: "1rem",
          background: "#f0f0f0",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div>
          {/* Logo instead of Dashboard title */}
          <div style={{ marginBottom: "1rem", textAlign: "center" }}>
            <Image src="/logo.png" alt="Atlas School" width={180} height={60} />
          </div>

          <nav>
            <ul style={{ listStyle: "none", padding: 0 }}>
              <li style={{ marginBottom: "0.5rem" }}>
                <Link href="/ui">Home</Link>
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

        {/* 👇 New Topic above Sign Out */}
        <div style={{ marginTop: "1rem" }}>
          <NewTopicButton />
          <div style={{ marginTop: "0.5rem" }}>
            <SignOutButton />
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main style={{ flex: 1, padding: "1rem" }}>{children}</main>
    </div>
  );
}
