import { auth } from "@/auth";
import { NextRequest } from "next/server";
import { URLS } from "@/lib/urls";

const protectedRoutes = [
    URLS.dashboard
];

const publicRoutes = [
    URLS.home,
    URLS.login,
    URLS.register,
    URLS.sendEmail,
    URLS.reset,
    URLS.verify,
    URLS.newUser
];

export async function middleware(request: NextRequest) {
    const { nextUrl } = request;
    const session = await auth();
    if (!session && protectedRoutes.includes(nextUrl.pathname)) {
        return Response.redirect(new URL(URLS.login, nextUrl));
    }
    if (!session && publicRoutes.includes(nextUrl.pathname)) {
        return null;
    }
    if (session && publicRoutes.includes(nextUrl.pathname)) {
        return Response.redirect(new URL(URLS.dashboard, nextUrl));
    }
    return null;
};

export const config = {
    matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)']
};
