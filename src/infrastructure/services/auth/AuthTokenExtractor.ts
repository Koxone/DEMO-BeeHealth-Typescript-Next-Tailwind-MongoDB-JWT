export class AuthTokenExtractor {
  extract(req: Request): string | null {
    // 1. Cookie first
    const cookieHeader = req.headers.get('cookie') || '';
    const refreshToken =
      cookieHeader
        .split('; ')
        .find((c) => c.startsWith('refreshToken='))
        ?.split('=')[1] || null;

    if (refreshToken) {
      return refreshToken;
    }

    // 2. Authorization header fallback
    const authHeader = req.headers.get('authorization');
    const bearerToken = authHeader?.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;

    return bearerToken;
  }
}
