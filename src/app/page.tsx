"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useTRPC } from "@/trpc/client";
import LogoutButton from "./LogoutButton";

function Home() {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const { data: workflows } = useQuery(trpc.getWorkflows.queryOptions());

  const testAi = useMutation(
    trpc.testAi.mutationOptions({
      onSuccess: () => {
        toast.success("Job queued");
      },
    }),
  );

  const createWorkflow = useMutation(
    trpc.createWorkflow.mutationOptions({
      onSuccess: () => {
        toast.success("Job queued");
      },
    }),
  );

  return (
    <div className="grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-sans sm:p-20">
      <p>{JSON.stringify(workflows, null, 2)}</p>

      <Button
        disabled={createWorkflow.isPending}
        onClick={() => createWorkflow.mutate()}
      >
        Create Workflow
      </Button>

      <Button disabled={testAi.isPending} onClick={() => testAi.mutate()}>
        Call AI
      </Button>

      <LogoutButton />
    </div>
  );
}

// export default withAuth(Home);
export default Home;
