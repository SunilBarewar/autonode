import { createAnthropic } from "@ai-sdk/anthropic";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { createOpenAI } from "@ai-sdk/openai";
import { generateText } from "ai";
import { inngest } from "./client";

const google = createGoogleGenerativeAI();
const openai = createOpenAI();
const antropic = createAnthropic();

export const generateTextWithGoogle = inngest.createFunction(
  { id: "generate-text" },
  { event: "generate/text" },
  async ({ event, step }) => {
    const { steps: geminiSteps } = await step.ai.wrap(
      "gemini-generate-text",
      generateText,
      {
        model: google("gemini-2.5-flash"),
        prompt: "What is the Diwali?",
        system: "you are a helpful assistant",
        maxRetries: 2,
      },
    );

    const { steps: openaiSteps } = await step.ai.wrap(
      "openai-generate-text",
      generateText,
      {
        model: openai("gpt-3.5-turbo"),
        prompt: "What is the Diwali?",
        system: "you are a helpful assistant",
        maxRetries: 2,
      },
    );

    const { steps: anthropicSteps } = await step.ai.wrap(
      "anthropic-generate-text",
      generateText,
      {
        model: antropic("claude-3-5-haiku-latest"),
        prompt: "What is the Diwali?",
        system: "you are a helpful assistant",
        maxRetries: 2,
      },
    );
    return {
      geminiSteps,
      openaiSteps,
      anthropicSteps,
    };
  },
);
