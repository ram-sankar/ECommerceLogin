import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import bcrypt from "bcryptjs";

export const userRouter = createTRPCRouter({
  create: publicProcedure
    .input(z.object({ 
      name: z.string().min(3),
      email: z.string().email(),
      password: z.string().min(6)
    }))
    .mutation(async ({ ctx, input }) => {

      return await ctx.db.users.create({
        data: {
          name: input.name,
          email: input.email,
          password: input.password,
        }
      })
    }),
  login: publicProcedure
    .input(z.object({ 
      email: z.string().email(),
      password: z.string().min(6)
    }))
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.db.users.findFirst({
        where: {
          email: input.email,
        },
      });

      if (!user) {
        throw new Error("Invalid credentials");
      }

      const passwordMatch = await bcrypt.compare(input.password, user.password);

      if (!passwordMatch) {
        throw new Error("Invalid credentials");
      }

      return user;
    }),
  addCategory: publicProcedure
    .input(z.object({ 
      user_id: z.number(),
      category_id: z.number()
    }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.user_category_relation.create({
        data: {
          user_id: input.user_id,
          category_id: input.category_id,
        }
      })
    })
});
