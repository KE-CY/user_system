import jwt from 'jsonwebtoken';
import { Request } from "express";

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
