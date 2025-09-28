import Link from "next/link";

export default function Navbar() {
  return (
    <nav style={{ padding: "1rem", background: "#eee" }}>
      <Link href="/" style={{ marginRight: "1rem" }}>Home</Link>
      <Link href="/about" style={{ marginRight: "1rem" }}>About</Link>
      <Link href="/ui" style={{ marginRight: "1rem" }}>Dashboard</Link>
      <Link href="/ui/topics/new">New Topic</Link>
    </nav>
  );
}
