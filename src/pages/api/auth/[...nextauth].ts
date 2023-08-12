import NextAuth from "next-auth";
import authOptions from "../../../lib/servers/authOptions";
import {NextApiRequest, NextApiResponse} from "next";
import {getCookies} from "cookies-next";
import {decompressFromBase64} from "lz-string";
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
    authOptions.adapter = AuthAdapter(prisma,store_id);
    return NextAuth(req,res,authOptions)
}
