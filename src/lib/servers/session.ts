import { getServerSession } from "next-auth/next";
import { AuthAdapter } from "./authAdapter";
import authOptions from "./authOptions";
import prisma from "./prismadb";
import { cookies } from 'next/headers'

export const getSession = async () => {
  const store_id = cookies().get('store_id')?.value;
  const urlCallBack = cookies().get('next-auth.callback-url')?.value;
  authOptions.adapter = AuthAdapter(prisma,store_id);
  if(urlCallBack && authOptions.pages){
    authOptions.pages.signIn = urlCallBack
  }
  return await getServerSession(authOptions);
};