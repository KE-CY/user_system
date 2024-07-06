import { Request, Response, NextFunction } from 'express';
import { getTokenFromHeader, verifyAccessToken } from "../utils/jwt";

export function authenticateToken(req: Request, res: Response, next: NextFunction) {
  const token = getTokenFromHeader(req);

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const payload = verifyAccessToken(token);

  if (!payload) {
    return res.status(401).json({ error: 'Invalid AccessToken' });
  }

  (req as any).payload = payload;
  next();
}