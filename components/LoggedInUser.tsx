"use client";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

export default function LoggedInUser() {
  const { data: session } = useSession();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // Avoid rendering until client hydration
  if (!mounted) return null;

  if (!session?.user) {
    return <div className="text-sm text-gray-500">Not logged in</div>;
  }

  return (
    <div className="flex items-center space-x-2">
      <img
        src={session.user.image ?? "/default-avatar.png"}
        alt="User Avatar"
        className="h-8 w-8 rounded-full"
      />
      <span>{session.user.name ?? "Anonymous"}</span>
    </div>
  );
}
