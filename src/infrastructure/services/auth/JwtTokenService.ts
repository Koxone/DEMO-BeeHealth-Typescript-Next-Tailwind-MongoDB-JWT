import jwt from 'jsonwebtoken';
import { JwtPayload } from 'jsonwebtoken';

export class JwtTokenService {
  private readonly secret = process.env.JWT_SECRET as string;

  signAccess(payload: JwtPayload): string {
    return jwt.sign(payload, this.secret, { expiresIn: '15m' });
  }

  signRefresh(payload: JwtPayload): string {
    return jwt.sign(payload, this.secret, { expiresIn: '7d' });
  }

  verify(token: string): JwtPayload | null {
    try {
      return jwt.verify(token, this.secret) as JwtPayload;
    } catch {
      return null;
    }
  }
}
