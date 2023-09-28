import { getServerAuthSession } from "lib/servers/trpcAuthSession";
import { NextApiRequest, NextApiResponse } from "next";

export async function GET(req: NextApiRequest,res: NextApiResponse) {
  const session = await getServerAuthSession({ req, res });
  if (session && session.user) {
    return res.status(200).json({status:true});
  } else {
    return res.status(400).json({status:false});
  }
}