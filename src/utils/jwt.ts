import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from "express";


const secretKey = process.env.MONGO_URI || 'your_secret_key';
const accessTokenExpiresIn = '2m';
const refreshTokenExpiresIn = '5m';


interface JwtPayload {
  username: string;
}

export function generateTokens(payload: JwtPayload): { accessToken: string; refreshToken: string } {
  const accessToken = jwt.sign(payload, secretKey, { expiresIn: accessTokenExpiresIn });
  const refreshToken = jwt.sign(payload, secretKey, { expiresIn: refreshTokenExpiresIn });
  return { accessToken, refreshToken };
}

export function getTokenFromHeader(req: Request): string | null {
  const authHeader = req.headers.authorization as string;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7);
  }

  return null;
}

export function verifyAccessToken(token: string): JwtPayload | null {
  try {
    const decoded = jwt.verify(token, secretKey) as JwtPayload;
    return decoded;
  } catch (error) {
    return null;
  }
}

export function authenticateToken(req: Request, res: Response, next: NextFunction) {
  const token = getTokenFromHeader(req);

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, secretKey) as JwtPayload;
    (req as any).user = decoded; // 將解碼的 payload 附加到 req.user
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid AccessToken' });
  }
}