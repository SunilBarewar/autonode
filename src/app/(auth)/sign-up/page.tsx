import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { SignupForm } from "@/features/auth/components/signup-form";
import { auth } from "@/lib/auth";
import { PATH_NAMES } from "@/shared/constants";

export default async function SignupPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (session) {
    redirect(PATH_NAMES.MAIN);
  }

  return <SignupForm />;
}
