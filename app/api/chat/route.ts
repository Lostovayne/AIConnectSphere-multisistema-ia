import { groq } from "@ai-sdk/groq";
import { CoreMessage, Message, streamText } from "ai";

export const maxDuration = 30;

export async function POST(request: Request) {
  const { messages }: { messages: CoreMessage[] | Omit<Message, "id">[] | undefined } =
    await request.json();
  console.log(messages);

  // Parsear los datos de la solicitud
  // Todo: Revisar los datos usando ArkType!!

  // Revisar Authentication

  // La respuesta
  const result = streamText({
    model: groq("gemma2-9b-it"),
    messages,
  });

  return  result.toDataStreamResponse();
}
