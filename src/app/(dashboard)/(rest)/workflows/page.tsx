import React from "react";
import { withAuth } from "@/hocs/with-auth";

const Page = () => {
  return <div>Workflow page</div>;
};

export default withAuth(Page);
