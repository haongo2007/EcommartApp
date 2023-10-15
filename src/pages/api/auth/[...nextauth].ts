import NextAuth from "next-auth";
import authOptions from "../../../lib/servers/authOptions";
import {NextApiRequest, NextApiResponse} from "next";
import {AuthAdapter} from "../../../lib/servers/authAdapter";
import prisma from "../../../lib/servers/prismadb";

export default async function handler(req: NextApiRequest,res: NextApiResponse) {
    let urlCallBack = '/';
    if (req.cookies.hasOwnProperty('next-auth.callback-url')){
        urlCallBack = req.cookies['next-auth.callback-url']?.replace(/^.*\/\/[^\/]+/, '')+'/#login';
    }
    const store_id = req.cookies.store_id
    if(authOptions.pages && urlCallBack){
        authOptions.pages.signIn = urlCallBack;
    }
    if(store_id){
        authOptions.adapter = AuthAdapter(prisma,parseInt(store_id));
    }
    return NextAuth(req,res,authOptions)
}
