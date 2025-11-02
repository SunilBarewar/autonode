import { z } from "zod";

// Define schema for all environment variables
const envSchema = z.object({
  DATABASE_URL: z.url("DATABASE_URL must be a valid URL"),

  // Better Auth
  BETTER_AUTH_SECRET: z.string().min(1, "BETTER_AUTH_SECRET is required"),
  BETTER_AUTH_URL: z.url("BETTER_AUTH_URL must be a valid URL"),

  // Gemini
  GOOGLE_GENERATIVE_AI_API_KEY: z
    .string()
    .min(1, "GOOGLE_GENERATIVE_AI_API_KEY is required"),

  // Anthropic
  ANTHROPIC_API_KEY: z.string().optional(),

  // OpenAI
  OPENAI_API_KEY: z.string().optional(),

  // Polar
  POLAR_ACCESS_TOKEN: z.string().min(1, "POLAR_ACCESS_TOKEN is required"),
  POLAR_SUCCESS_URL: z.url("POLAR_SUCCESS_URL must be a valid URL"),
  POLAR_SERVER: z.enum(["sandbox", "production"]).default("sandbox"),
});

// Parse and validate environment variables
const env = envSchema.safeParse(process.env);

if (!env.success) {
  console.error(
    "❌ Invalid or missing environment variables:\n",
    env.error.format(),
  );
  process.exit(1);
}

// Export validated environment
export const ENV = env.data;
