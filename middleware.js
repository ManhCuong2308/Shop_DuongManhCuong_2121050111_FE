import { NextResponse } from 'next/server';

export async function middleware(request) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname;

  // Check if the path starts with /admin
  if (path.startsWith('/admin')) {
    // Get the user data from localStorage
    const user = request.cookies.get('user')?.value;
    
    if (!user) {
      // If no user data, redirect to login
      return NextResponse.redirect(new URL('/login', request.url));
    }

    try {
      const userData = JSON.parse(user);
      
      // Check if user is admin
      if (!userData.isAdmin) {
        // If not admin, redirect to home
        return NextResponse.redirect(new URL('/', request.url));
      }
    } catch (error) {
      // If there's an error parsing user data, redirect to login
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

// Configure which routes to run middleware on
export const config = {
  matcher: ['/admin/:path*'],
}; 