interface TopicPageProps {
  params: { id: string };
}

export default function TopicPage({ params }: TopicPageProps) {
  return <h1>Topic ID: {params.id}</h1>;
}
