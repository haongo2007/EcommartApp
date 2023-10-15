import authOptions from "lib/servers/authOptions";
import { getServerSession } from "next-auth";
import { NextResponse } from 'next/server';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (session && session.user) {
    return NextResponse.json({ status:true })
  } else {
    return NextResponse.json({ status:false })
  }
}