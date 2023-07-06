import { NextRequest, NextResponse } from "next/server";
import acceptLanguage from 'accept-language';
import { fallbackLng, languages } from './app/i18n/settings';

acceptLanguage.languages(languages)

const cookieName = 'i18next'

export default async function middleware(req: NextRequest) {
  const baseUrl = req.nextUrl.origin;
  const path = req.nextUrl.pathname;
  const headers = {
    cookie: req.headers.get("cookie") || "",
  };
  let lng;
  let pass = false;
  if (path.startsWith("/admin")) {
    const adminCheck = await fetch(`${baseUrl}/api/admin-check`, {
      headers,
    });
    pass = adminCheck.status === 200;
  } else {
    const authCheck = await fetch(`${baseUrl}/api/auth-check`, {
      headers,
    });
    pass = authCheck.status === 400;
  }

  if (!pass) {
    return NextResponse.redirect(new URL("/not-found", req.url), req);
  }
  if (req.cookies.has(cookieName)){
    lng = acceptLanguage.get(req.cookies.get(cookieName)?.value)
  }
  if (!lng){
    lng = acceptLanguage.get(req.headers.get('Accept-Language'))
  }
  if (!lng){
    lng = fallbackLng
  }
  if (path === '/') {
    return NextResponse.redirect(new URL(`/${lng}`, req.url))
  }

  if (req.headers.has('referer')) {
    const refererUrl = new URL(req.headers.get('referer') || "")
    const lngInReferer = languages.find((l) => refererUrl.pathname.startsWith(`/${l}`))
    const response = NextResponse.next()
    if (lngInReferer){
      response.cookies.set(cookieName, lngInReferer)
    }
    return response
  }
  return;
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js).*)",
    "/user/:path*",
    "/checkout/:path*",
    "/orders/:path*",
    "/admin/:path*"
  ],
};
