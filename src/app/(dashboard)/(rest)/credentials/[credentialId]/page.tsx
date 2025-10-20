import { withAuth } from "@/hocs/with-auth";

interface PageProps {
  params: Promise<{ credentialId: string }>;
}

const Page = async ({ params }: PageProps) => {
  const { credentialId } = await params;
  return <div>Credential Id : {credentialId}</div>;
};

export default withAuth(Page);
