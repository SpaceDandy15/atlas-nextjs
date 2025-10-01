// app/page.tsx
import { SignInButton } from "@/components/SignInButton";

export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-6">Welcome to Atlas</h1>
      <p className="mb-4 text-gray-600">Please sign in to access your topics.</p>

      <SignInButton />
    </main>
  );
}
