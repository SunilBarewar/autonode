"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { useTRPC } from "@/trpc/client";
import LogoutButton from "./LogoutButton";
import { toast } from "sonner";

function Home() {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const { data: workflows } = useQuery(trpc.getWorkflows.queryOptions());

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

      <LogoutButton />
    </div>
  );
}

// export default withAuth(Home);
export default Home;
