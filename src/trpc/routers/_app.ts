import { email } from "zod";
import { inngest } from "@/inngest/client";
import prisma from "@/lib/prisma";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";

export const appRouter = createTRPCRouter({
  getUsers: protectedProcedure.query(async ({ ctx }) => {
    return await prisma.user.findMany({
      where: {
        email: ctx.auth.user.email,
      },
    });
  }),
  getWorkflows: protectedProcedure.query(async () => {
    return await prisma.workflow.findMany();
  }),
  createWorkflow: protectedProcedure.mutation(async () => {
    await inngest.send({
      name: "test/hello.world",
      data: {
        email: "sunil@gmail.com",
      },
    });

    return { success: true, message: "Job queued" };
  }),
});

// export type definition of API
export type AppRouter = typeof appRouter;
