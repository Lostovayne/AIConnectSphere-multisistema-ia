import arcjet, { detectBot, shield, tokenBucket } from "@arcjet/next";
import { NextRequest, NextResponse } from "next/server";
const aj = arcjet({
  key: process.env.ARCJET_KEY!,
  characteristics:["userId"],
  rules: [
    shield({
      mode: "LIVE",
    }),
    tokenBucket({
      mode: "LIVE",
      refillRate: 5,
      interval: 10,
      capacity: 10,
    }),

    detectBot({
      mode: "LIVE", // will block requests. Use "DRY_RUN" to log only
      // Block all bots except the following
      allow: [
        "CATEGORY:SEARCH_ENGINE", // Google, Bing, etc
      ],
    }),
  ],
});
export const config = {
  matcher: ["/dashboard"],
};

export default async function middleware(req: NextRequest) {
  // autenticate user fake
  const userId = "fakeUser123"
  const decision = await aj.protect(req, {userId, requested: 1 });
  console.log("Decision:", decision);

  if (decision.isDenied()) {
    return NextResponse.json(
      { error: "Error al procesar la request", reason: decision.reason },
      {
        status: 400,
      }
    );
  }

  return NextResponse.next();
}
