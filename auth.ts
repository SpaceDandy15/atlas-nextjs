import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

// TODO: replace with your own DB call
async function fetchUser(email: string) {
  if (email === "user@atlasmail.com") {
    return {
      id: "1",
      email: "user@atlasmail.com",
      password: await bcrypt.hash("123456", 10), // hashed password
    };
  }
  return null;
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  theme: {
    brandColor: "#1ED2AF",
    logo: "/logo.png",
    buttonText: "#ffffff",
  },
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (
        credentials: { email: string; password: string } | undefined
      ) => {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await fetchUser(credentials.email);
        if (!user) return null;

        const passwordsMatch = await bcrypt.compare(
          credentials.password,
          user.password
        );

        return passwordsMatch ? user : null;
      },
    }),
  ],
  callbacks: {
    authorized: async ({ auth }) => {
      return !!auth;
    },
  },
});
