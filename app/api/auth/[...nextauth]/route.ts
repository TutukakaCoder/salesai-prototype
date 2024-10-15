import NextAuth from "next-auth";
import { authOptions } from "./authOptions";

const handler = NextAuth(authOptions);

async function handleRequest(request: Request) {
  try {
    return await handler(request);
  } catch (error) {
    console.error("NextAuth Error:", error);
    return new Response(JSON.stringify({ error: "Authentication error" }), {
      status: 500,
    });
  }
}

export const GET = handleRequest;
export const POST = handleRequest;