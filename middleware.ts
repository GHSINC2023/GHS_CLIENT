import { NextRequest, NextResponse } from 'next/server'




export default async function middleware(request: NextRequest) {

    const cookies = request.cookies.get("ghs_access_token");

    const urlRequest = request.url.includes("/dashboard");

    if (urlRequest && !cookies) {
        return NextResponse.redirect(new URL('/', request.url))
    }
}

export const config = {
    matcher: [
        "/dashboard/:path*" ]
}