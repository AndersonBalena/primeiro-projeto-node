import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '../config/auth';
import AppError from '../errors/AppError';

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
    throw new AppError('JWT token is missing', 401);
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
    throw new AppError('Invalid JWT token', 401);
  }
}
