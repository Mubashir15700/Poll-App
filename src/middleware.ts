import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = ["/home", "/my-polls", "new-poll"];

export default function middleware(req: NextRequest) {
    const { cookies } = req;

    const jwtToken = cookies.get("jwt");

    if (!jwtToken && protectedRoutes.includes(req.nextUrl.pathname)) {
        const absoluteURL = new URL("/", req.nextUrl.origin);
        return NextResponse.redirect(absoluteURL.toString());
    }
    if (jwtToken && req.nextUrl.pathname === "/") {
        const absoluteURL = new URL("/home", req.nextUrl.origin);
        return NextResponse.redirect(absoluteURL.toString());
    }
}
