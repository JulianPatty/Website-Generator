import { openai, createAgent } from "@inngest/agent-kit";
import { inngest } from "@/inngest/client";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event }) => {
 // Create a new agent with a system prompt (you can add optional tools, too)
 const codeAgent = createAgent({
  name: "code-agent",
  system: "You are an expert next.js developer.  You write readdable, maintainable code. You write simple Next.js & react snippets and react components.",
  model: openai({ model: "gpt-4o-mini"}),
});

const { output } = await codeAgent.run(
  `Write the following: ${event.data.value}`,
);

    return { output };
  },
); 