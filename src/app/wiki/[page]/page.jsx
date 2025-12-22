import WikiClient from "../WikiClient";

export function generateStaticParams() {
  return [];
}

export default async function WikiPage({ params }) {
  const { page } = await params;
  return <WikiClient page={parseInt(page)} />;
}
