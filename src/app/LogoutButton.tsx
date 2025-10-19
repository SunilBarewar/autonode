"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { PATH_NAMES } from "@/shared/constants";

const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = () => {
    authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push(PATH_NAMES.SIGN_IN);
        },
      },
    });
  };
  return <Button onClick={handleLogout}>Logout</Button>;
};

export default LogoutButton;
