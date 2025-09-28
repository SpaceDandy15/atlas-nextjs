import Link from "next/link";

export default function UILayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <aside style={{ width: "220px", padding: "1rem", background: "#f0f0f0" }}>
        <h2>Dashboard</h2>
        <nav>
          <ul style={{ listStyle: "none", padding: 0 }}>
            <li style={{ marginBottom: "0.5rem" }}>
              <Link href="/ui">Home</Link>
            </li>
            <li style={{ marginBottom: "0.5rem" }}>
              <Link href="/ui/topics/new">New Topic</Link>
            </li>
            <li style={{ marginBottom: "0.5rem" }}>
              <Link href="/ui/topics/123">Sample Topic</Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main content */}
      <main style={{ flex: 1, padding: "1rem" }}>
        {children}
      </main>
    </div>
  );
}
