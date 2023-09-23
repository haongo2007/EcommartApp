import { getServerAuthSession } from "lib/servers/trpcAuthSession";
import { NextApiRequest, NextApiResponse } from "next";

export async function GET(req: NextApiRequest,res: NextApiResponse) {
  const session = await getServerAuthSession({ req, res });
  if (session && session.user) {
    res.status(200).end();
  } else {
    res.status(400).end();
  }
}