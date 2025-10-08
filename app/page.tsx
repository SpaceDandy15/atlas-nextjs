// app/page.tsx
import { SignInButton } from "@/components/SignInButton";
import { GitHubSignInButton } from "@/components/GitHubSignInButton";

export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-6">Welcome to Atlas</h1>
      <p className="mb-4 text-gray-600">Please sign in to access your topics.</p>

      <div className="flex flex-col gap-3">
        <SignInButton />       {/* regular login */}
        <GitHubSignInButton /> {/* GitHub login */}
      </div>
    </main>
  );
}
