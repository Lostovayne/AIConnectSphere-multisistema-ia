import { groq } from "@/lib/grok";
import { generateText, tool } from "ai";
import * as mathjs from "mathjs";
import z from "zod";

const model = groq("meta-llama/llama-4-scout-17b-16e-instruct", {
  parallelToolCalls: true,
});

async function main() {
  const prompt =
    "Resuelve la siguiente expresión matemática y explica el procedimiento paso a paso: 3.5 * (8 + 2.1)";

  const { text: answer } = await generateText({
    model,
    prompt,
    system: "Eres un experto matemático.",
    tools: {
      calculate: tool({
        description:
          "A tool for evaluating mathematical expressions. Example expressions: " +
          "'1.2 * (2 + 4.5)', '12.7 cm to inch', 'sin(45 deg) ^ 2'.",
        parameters: z.object({ expression: z.string() }),
        execute: async ({ expression }) => mathjs.evaluate(expression),
      }),
    },
    maxSteps: 10,
    onStepFinish({ text, toolCalls, toolResults, finishReason, usage }) {
      console.log({ text, toolCalls, toolResults, finishReason, usage });
    },
  });
  console.log(`ANSWER: ${answer}`);
}

main();
