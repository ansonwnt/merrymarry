import InviteClient from "./InviteClient";

export function generateStaticParams() {
  return [{ coupleId: "demo" }];
}

export default async function InvitePage({ params }: { params: Promise<{ coupleId: string }> }) {
  const { coupleId } = await params;
  return <InviteClient coupleId={coupleId} />;
}
