import auth from "@config/auth";
import Error from "@shared/core/Error";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export function ensureAuthenticated(
  request: Request,
  _: Response,
  next: NextFunction
) {
  const { authorization } = request.headers;

  if (!authorization) {
    throw new Error({
      message: "Token is missing",
      statusCode: 401,
    });
  }

  const [, token] = authorization?.split(" ");

  if (!token) {
    throw new Error({
      message: "Token is missing",
      statusCode: 401,
    });
  }

  try {
    const decoded = verify(token, auth.jwt.secret);

    const { sub } = decoded as TokenPayload;

    request.userId = sub;

    return next();
  } catch {
    throw new Error({ message: "Token is invalid.", statusCode: 401 });
  }
}
