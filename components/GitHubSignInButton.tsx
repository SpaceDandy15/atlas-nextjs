"use client";
import { signIn } from "next-auth/react";

export function GitHubSignInButton() {
  return (
    <button
      onClick={() => signIn("github", { callbackUrl: "/ui" })}
      className="inline-flex h-10 items-center justify-center rounded-md bg-black px-8 text-sm font-medium text-white shadow"
    >
      Sign in with GitHub
    </button>
  );
}
