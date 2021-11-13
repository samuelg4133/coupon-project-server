import { NextFunction, Request, Response } from "express";
import { decode } from "jsonwebtoken";

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export function authUser(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({
      error: true,
      code: "token.invalid",
      message: "Token not present.",
    });
  }

  const [, token] = authorization?.split(" ");

  if (!token) {
    return res.status(401).json({
      error: true,
      code: "token.invalid",
      message: "Token not present.",
    });
  }

  try {
    const { sub } = decode(token as string) as TokenPayload;

    req.userId = sub;

    return next();
  } catch {
    return res
      .status(401)
      .json({
        error: true,
        code: "token.invalid",
        message: "Invalid token format.",
      });
  }
}
