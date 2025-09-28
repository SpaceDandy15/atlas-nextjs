import "@/app/global.css";
import { inter } from "@/app/fonts";
import { Metadata } from "next";
import Link from "next/link"; // import Link for navigation

export const metadata: Metadata = {
  title: "Full Stack Next.js | Atlas School",
};

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased text-secondary`}>
        {/* Simple Navbar */}
        <nav style={{ padding: "1rem", background: "#eee" }}>
          <Link href="/" style={{ marginRight: "1rem" }}>Home</Link>
          <Link href="/about" style={{ marginRight: "1rem" }}>About</Link>
          <Link href="/ui" style={{ marginRight: "1rem" }}>Dashboard</Link>
          <Link href="/ui/topics/new">New Topic</Link>
        </nav>

        {/* Page content */}
        <main>{children}</main>
      </body>
    </html>
  );
}
