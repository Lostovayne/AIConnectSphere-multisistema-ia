import { groq } from "@/lib/grok";
import { streamText } from "ai";

const model = groq("meta-llama/llama-4-scout-17b-16e-instruct", {
  parallelToolCalls: true,
});

async function main() {
  const prompt = "Podrias decirme las caracteristicas que tiene Nextjs 15 ?";
  const { textStream } = streamText({
    model,
    prompt,
    system: "Eres un experto en programacion web",
    // tools: {
    //   calculate: tool({
    //     description:
    //       "A tool for evaluating mathematical expressions. Example expressions: " +
    //       "'1.2 * (2 + 4.5)', '12.7 cm to inch', 'sin(45 deg) ^ 2'.",
    //     parameters: z.object({ expression: z.string() }),
    //     execute: async ({ expression }) => mathjs.evaluate(expression),
    //   }),
    // },
    // tools: (await getMCPTools()).tools,
    maxSteps: 10,
    toolChoice: "auto",
    onStepFinish({ text, toolCalls, toolResults, finishReason, usage }) {
      console.log({ text, toolCalls, toolResults, finishReason, usage });
    },
  });

  for await (const text of textStream) {
    console.log(text); // partial text generatio
  }
}

main();
