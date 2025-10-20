import { withAuth } from "@/hocs/with-auth";

const Page = () => {
  return <div>Credentials page</div>;
};

export default withAuth(Page);
