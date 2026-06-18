import { type NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  // Pass through — auth middleware can be added here when needed
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
