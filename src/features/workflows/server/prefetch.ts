import type { inferInput } from "@trpc/tanstack-react-query";
import { prefetch, trpc } from "@/trpc/server";

type TGetManyInput = inferInput<typeof trpc.workflows.getMany>;

/**
 * Prefetch all workflows
 */
export const prefetchWorkflows = (params: TGetManyInput) => {
  return prefetch(trpc.workflows.getMany.queryOptions(params));
};
