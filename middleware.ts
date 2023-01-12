import { NextRequest, NextResponse } from 'next/server'




export default async function middleware(request: NextRequest) {

    const cookies = request.cookies.get("ghs_access_token");

    const appCookies = request.cookies.get("ghs_access_applicant")

    const urlRequest = request.url.includes("/dashboard");

    const applicantRequest = request.url.includes("/applicants")

    if (urlRequest && !cookies) {
        return NextResponse.redirect(new URL('/', request.url))
    }


    if(applicantRequest && !appCookies){
        return NextResponse.redirect(new URL('/', request.url))
    }
}

export const config = {
    matcher: [
        "/dashboard/:path*", "/applicants/:path*" ]

}