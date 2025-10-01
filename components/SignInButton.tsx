// components/auth/SignInButton.tsx
import { signIn } from "@/auth";

export function SignInButton() {
  return (
    <form
      action={async (formData: FormData) => {
        "use server";
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        await signIn("credentials", {
          redirectTo: "/ui",
          email,
          password,
        });
      }}
    >
      <input
        type="email"
        name="email"
        placeholder="Email"
        required
        className="mb-2 block w-full rounded-md border p-2"
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        required
        className="mb-2 block w-full rounded-md border p-2"
      />
      <button
        type="submit"
        className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-white shadow"
      >
        Sign In
      </button>
    </form>
  );
}
