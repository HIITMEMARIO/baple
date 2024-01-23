import { NextResponse } from 'next/server';

import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const { pathname } = url;
  console.log('pathname', pathname);
  if (pathname.startsWith(`/api/`)) {
    if (
      !req.headers
        .get('referer')
        ?.includes(process.env.NEXT_PUBLIC_KAKAO_MAP_KEY as string)
    ) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
  }

  return NextResponse.next();
}

// export const config = {
//   matcher: ['/((?!fonts|examples|svg|[\\w-]+\\.\\w+).*)'],
// };
