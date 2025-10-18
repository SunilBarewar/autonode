# Fetch data in server component using trpc

[TRPC Setup Guide Documentation](https://trpc.io/docs/client/tanstack-react-query/server-components)

Create a caller in `server.tsx`

then use it in a server component

```typescript
import { caller } from "@/trpc/server";

export default async function Home() {
  const users = await caller.getUsers();
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      {JSON.stringify(users, null, 2)}
    </div>
  );
}

```

# Client component 

Using trpc with React-query `useQuery()` hook.

```typescript

"use client";
import { useQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";

export default function Home() {
  const trpc = useTRPC();
  const { data: users } = useQuery(trpc.getUsers.queryOptions());

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      {JSON.stringify(users, null, 2)}
    </div>
  );
}


```

# 3. Using HydrationBoundary and useQuery hook

server component : `page.tsx`

```typescript

import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient, trpc } from "@/trpc/server";
import Client from "./client";

export default function Home() {
  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(trpc.getUsers.queryOptions());

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Client />
      </HydrationBoundary>
    </div>
  );
}


```

then inside a client component we use useQuery hook the same way

```typescript

"use client";

import { useQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";

const Client = () => {
  const trpc = useTRPC();
  const { data: users, isPending } = useQuery(trpc.getUsers.queryOptions());

  if (isPending) return <div>Loading...</div>;

  return <div className="text-lg italic">{JSON.stringify(users, null, 2)}</div>;
};

export default Client;


```


# 4. With useSuspenseQuery


server component `page.tsx'

```typescript

import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { HydrateClient, prefetch, trpc } from "@/trpc/server";
import Client from "./client";

export default function Home() {
  prefetch(trpc.getUsers.queryOptions());

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <HydrateClient>
        <ErrorBoundary fallback={<div>Something went wrong</div>}>
          <Suspense fallback={<div>Loading...</div>}>
            <Client />
          </Suspense>
        </ErrorBoundary>
      </HydrateClient>
    </div>
  );
}

```

client component `client.tsx`

```typescript
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


```
