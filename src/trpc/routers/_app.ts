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
});

// export type definition of API
export type AppRouter = typeof appRouter;
