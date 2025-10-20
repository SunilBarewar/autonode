import { withAuth } from "@/hocs/with-auth";

const Page = () => {
  return <div>Executions page</div>;
};

export default withAuth(Page);
