import { inngest } from "./client";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    await step.sleep("Extracting text", "5s");

    await step.sleep("Generating context", "5s");

    await step.sleep("Generating response", "2s");

    return { message: `Hello ${event.data.email}!` };
  },
);
