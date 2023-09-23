import type { GetServerSidePropsContext } from "next";
import { getServerSession } from "next-auth/next";
import { AuthAdapter } from "./authAdapter";
import authOptions from "./authOptions";
import db from "./prismadb";

export const getServerAuthSession = async (ctx: {
    req: GetServerSidePropsContext["req"];
    res: GetServerSidePropsContext["res"];
  }) => {
    let urlCallBack = '/';
    if (ctx.req.cookies.hasOwnProperty('next-auth.callback-url')){
        urlCallBack = ctx.req.cookies['next-auth.callback-url']?.replace(/^.*\/\/[^\/]+/, '')+'/#login';
    }
    const store_id = ctx.req.cookies.store_id
    if(authOptions.pages && urlCallBack){
        authOptions.pages.signIn = urlCallBack;
    }
    authOptions.adapter = AuthAdapter(db,store_id);
    return await getServerSession(ctx.req,ctx.res,authOptions);
  };
  