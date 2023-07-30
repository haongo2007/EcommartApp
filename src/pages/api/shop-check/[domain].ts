import { NextApiRequest, NextApiResponse } from "next";
import db from "../../../lib/servers/prismadb";

const checkShop = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") {
    res.status(404).end();
  }
  const {domain} = req.query;
  const shop = await db.shops.findFirst({
    where: {
        domain: domain
    }
  });
  res.status(200).json({data:shop});
};

export default checkShop;
