import { withAuth } from "@/hocs/with-auth";

interface PageProps {
  params: Promise<{ workflowId: string }>;
}

const Page = async ({ params }: PageProps) => {
  const { workflowId } = await params;
  return <div>Workflow Id : {workflowId}</div>;
};

export default withAuth(Page);
