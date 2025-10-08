import { auth } from "../auth";

export default async function UserAvatar() {
  const session = await auth();

  if (!session?.user) return null;

  // Ensure image is a string (not null) — fallback if missing
  const imageSrc = session.user.image ?? "/default-avatar.png";

  return (
    <div>
      <img
        src={imageSrc}
        alt="User Avatar"
        className="w-8 h-8 rounded-full object-cover"
      />
    </div>
  );
}
