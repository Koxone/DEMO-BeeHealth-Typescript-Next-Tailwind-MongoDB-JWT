import jwt from 'jsonwebtoken';
import User from '@/models/User';

export async function getAuthUser(req) {
  // Read cookies
  const cookieHeader = req.headers.get('cookie') || '';
  const refreshToken =
    cookieHeader
      .split('; ')
      .find((c) => c.startsWith('refreshToken='))
      ?.split('=')[1] || null;

  // Read authorization header
  const authHeader = req.headers.get('authorization');
  const bearerToken = authHeader?.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;

  // Resolve final token
  const token = bearerToken || refreshToken;
  if (!token) {
    return {
      ok: false,
      error: {
        code: 'AUTH_REQUIRED',
        message: 'Authentication required',
        reason: 'No token was provided through Authorization header or cookies',
      },
      status: 401,
    };
  }

  // Verify token
  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    return {
      ok: false,
      error: {
        code: 'AUTH_INVALID_TOKEN',
        message: 'Invalid or expired token',
        reason: 'The provided JWT is malformed, expired, or cannot be verified',
      },
      status: 401,
    };
  }

  // Fetch user
  const user = await User.findById(decoded.id);
  if (!user) {
    return {
      ok: false,
      error: {
        code: 'USER_NOT_FOUND',
        message: 'User not found',
        reason: 'The token is valid but the referenced user no longer exists in the database',
      },
      status: 404,
    };
  }

  return {
    ok: true,
    status: 200,
    user,
    userId: user._id,
    specialty: user.specialty || 'weight',
  };
}

// Auth
// const auth = await getAuthUser(req);
// if (auth.error) {
//   return NextResponse.json({ error: auth.error }, { status: auth.status });
// }

// const { userId, specialty } = auth;
