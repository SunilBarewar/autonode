import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { PATH_NAMES } from "@/shared/constants";
import { auth } from "./auth";

export const requireAuth = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    redirect(PATH_NAMES.SIGN_IN);
  }
};

export const requireNoAuth = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (session) {
    redirect(PATH_NAMES.MAIN);
  }
};
