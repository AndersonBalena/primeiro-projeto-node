import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '../config/auth';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const authToken = req.headers.authorization;
  if (!authToken) {
    throw new Error('JWT token is missing');
  }

  const [, token] = authToken.split(' ');

  try {
    const verifiedToken = verify(token, authConfig.jwt.secret);

    const { sub } = verifiedToken as TokenPayload;

    req.user = {
      id: sub,
    };

    return next();
  } catch {
    throw new Error('Invalid JWT token');
  }
}
