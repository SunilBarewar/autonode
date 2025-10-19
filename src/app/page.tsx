import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { withAuth } from "@/hocs/with-auth";
import { caller, HydrateClient } from "@/trpc/server";
import Client from "./client";
import LogoutButton from "./LogoutButton";

async function Home() {
  const users = await caller.getUsers();

  return (
    <div className="grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-sans sm:p-20">
      <p>{JSON.stringify(users, null, 2)}</p>

      <LogoutButton />
    </div>
  );
}

export default withAuth(Home);
