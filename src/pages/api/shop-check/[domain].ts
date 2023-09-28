import { NextApiRequest, NextApiResponse } from "next";
import db from "../../../lib/servers/prismadb";

const checkShop = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") {
    res.status(404).end();
  }
  const {domain} = req.query;
  const shop = await db.shops.findFirst({
    where: {
        domain
    }
  });
  if(shop){
    res.setHeader('store_id', String(shop.id));
    return res.status(200).json({status:true});
  }
  return res.status(400).json({status:false});
};

export default checkShop;
