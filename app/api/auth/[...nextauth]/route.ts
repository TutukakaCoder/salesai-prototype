import NextAuth from "next-auth";
import { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "./authOptions";

const handler = NextAuth(authOptions);

async function handleRequest(req: NextApiRequest, res: NextApiResponse) {
  return handler(req, res);
}

export const GET = handleRequest;
export const POST = handleRequest;