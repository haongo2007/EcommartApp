// import { NextRequest, NextResponse } from "next/server";
// import acceptLanguage from 'accept-language';
// import { fallbackLng, languages } from './i18n/settings';

// acceptLanguage.languages(languages)

// const cookieName = 'i18next'

// export default async function middleware(req: NextRequest) {
//   const response = NextResponse.next();
//   const baseUrl = req.nextUrl.origin;
//   let path = req.nextUrl.pathname;
//   const matchAuthUri = [
//     "account",
//     "checkout",
//     "orders",
//   ];
//   const headers = {
//     cookie: req.headers.get("cookie") || "",
//   };
//   let lng;
//   // băm path kiểm tra phần tử đầu tiên có phải là lng không
//   const regexCheckLng = /\/([^/]+)/;
//   const matchLng = path.match(regexCheckLng);
//   if(matchLng && languages.includes(matchLng[1])){ /// nếu match với [vi,en]
//     lng = matchLng[1];
//   }else{ /// ngược lại ko match lấy nn mặc định
//     if (req.cookies.has(cookieName)){
//       lng = acceptLanguage.get(req.cookies.get(cookieName)?.value)
//     }
//     if (!lng){
//       lng = fallbackLng
//     }
//     if (!lng){
//       lng = acceptLanguage.get(req.headers.get('Accept-Language'))
//     }
//   }
//   if(lng){  
//     response.cookies.set(cookieName, lng);
//   }
//   if(path === '/'){
//     return NextResponse.redirect(new URL(`/${lng}`, req.url));
//   }
//   // băm path kiểm tra phần tử thứ 2 có phải là tên một store không
//   const regexCheckStore = /\/[^/]+\/([a-zA-Z0-9]+)/;
//   const matchStore = path.match(regexCheckStore);
//   if (matchStore !== null && matchStore.length > 1) {
//     const result = matchStore[1];
//     // kiểm tra xem store này có tồn tại hay không
//     const shopCheck = await fetch(`${baseUrl}/api/shop-check/${result}`,{
//       headers,
//     });
//     const store_id = shopCheck.headers.get('store_id');
//     if(shopCheck.status !== 200 && !store_id){
//       return NextResponse.redirect(new URL(`/${lng}/not-found`, req.url), req);
//     }else{
//       response.cookies.set('store_id', String(store_id));
//     }
//   }
//   // băm path kiểm tra phần tử thứ 3 có nằm trong auth hay không
//   const regexCheckAuth = /(?<=\/[^/]+\/[^/]+\/)([^/]+)/;
//   const matchAuth = path.match(regexCheckAuth);
//   if (matchAuth !== null && matchAuthUri.includes(matchAuth[1])) {
//     const accountCheck = await fetch(`${baseUrl}/api/auth-check`, {
//       headers,
//     });
//     if(accountCheck.status !== 200){
//       return NextResponse.redirect(new URL(`/${lng}/not-found`, req.url), req);
//     }
//   }
//   return response;
// }

// export const config = {
//   matcher: [
//     '/((?!api|_next|.*\\..*).*)'
//   ],
// };

import createIntlMiddleware from 'next-intl/middleware';
import {NextRequest,NextResponse} from 'next/server';

export default async function middleware(request: NextRequest) {
  const baseUrl = request.nextUrl.origin;
  let path = request.nextUrl.pathname;

  // Step 1: Use the incoming request
  const defaultLocale = request.headers.get('x-default-locale') || 'en';
 
  // Step 2: Create and call the next-intl middleware
  const handleI18nRouting = createIntlMiddleware({
    locales: ['en', 'vi'],
    defaultLocale
  });
  const response = handleI18nRouting(request);
 
  // Step 3: Alter the response
  response.headers.set('x-default-locale', defaultLocale);
  // băm path kiểm tra phần tử thứ 2 có phải là tên một store không
  const regexCheckStore = /\/[^/]+\/([a-zA-Z0-9]+)/;
  const matchStore = path.match(regexCheckStore);
  if (matchStore !== null && matchStore.length > 1) {
    const result = matchStore[1];
    // kiểm tra xem store này có tồn tại hay không
    const shopCheck = await fetch(`${baseUrl}/api/shop-check/${result}`);
    const store_id = shopCheck.headers.get('store_id');
    if(shopCheck.status !== 200 && !store_id){
      return NextResponse.redirect(new URL(`/${defaultLocale}/not-found`, request.url), request);
    }else{
      response.cookies.set('store_id', String(store_id));
    }
  }
  return response;
}

export const config = {
  // Skip all paths that should not be internationalized. This example skips
  // certain folders and all pathnames with a dot (e.g. favicon.ico)
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};