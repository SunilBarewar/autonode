import { SigninForm } from "@/features/auth/components/signin-form";
import { withoutAuth } from "@/hocs/without-auth";

function SigninPage() {
  return <SigninForm />;
}

export default withoutAuth(SigninPage);
