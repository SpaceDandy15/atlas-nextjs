// lib/placeholder-data.ts
export const users = [
  {
    id: "1b93d8dc-6e43-49e3-b59f-b67531247612",
    name: "Atlas User",
    email: "user@atlasmail.com",
    password: "123456", // will be hashed during seeding
  },
];

export const topics = [
  { id: "2b93d8dc-6e43-49e3-b59f-b67531247612", title: "Next.js Basics" },
  { id: "3b93d8dc-6e43-49e3-b59f-b67531247612", title: "Server Actions" },
];

export const questions = [
  {
    id: "4b93d8dc-6e43-49e3-b59f-b67531247612",
    title: "What is Next.js?",
    topic: "2b93d8dc-6e43-49e3-b59f-b67531247612",
    votes: 0,
  },
  {
    id: "5b93d8dc-6e43-49e3-b59f-b67531247612",
    title: "How do server actions work?",
    topic: "3b93d8dc-6e43-49e3-b59f-b67531247612",
    votes: 0,
  },
];
