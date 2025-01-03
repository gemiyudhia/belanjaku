import { getToken } from "next-auth/jwt";
import {
  NextFetchEvent,
  NextMiddleware,
  NextRequest,
  NextResponse,
} from "next/server";

// Halaman yang tidak memerlukan autentikasi
const authPage = ["/login", "/register"];

export default function withAuth(
  middlerware: NextMiddleware,
  requireAuth: string[] = ["/profile"] // halaman yang perlu autentikasi
) {
  return async (req: NextRequest, next: NextFetchEvent) => {
    const pathname = req.nextUrl.pathname;

    const token = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });

    // jika halaman termasuk kedalam authPage
    if (authPage.includes(pathname)) {
      // jika token ditemukan arahkan ke halaman utama
      if (token) {
        return NextResponse.redirect(new URL("/", req.url));
      }
      return NextResponse.next(); // izikan akses ke login/register
    }

    // jika halaman memerlukan autentikasi
    if (requireAuth.includes(pathname)) {
      // jika token tidak ditemukan , arahkan ke halaman login
      if (!token) {
        const url = new URL("/login", req.url);
        url.searchParams.set("callbackUrl", encodeURI(req.url));
        return NextResponse.redirect(url);
      }
    }

    // lanjutkan ke middleware selanjutnya
    return middlerware(req, next);
  };
}
