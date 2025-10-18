"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";

const Client = () => {
  const trpc = useTRPC();
  const { data: users, isPending } = useSuspenseQuery(
    trpc.getUsers.queryOptions(),
  );

  if (isPending) return <div>Loading...</div>;

  return <div className="text-lg italic">{JSON.stringify(users, null, 2)}</div>;
};

export default Client;
