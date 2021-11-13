import { NextFunction, Request, Response } from "express";

import Error from "@shared/core/Error";

export const error = (
  err: Error,
  req: Request,
  res: Response,
  _: NextFunction
) => {
  if (err instanceof SyntaxError) {
    return res.status(400).json({
      status: err.statusCode,
      message: "Error in the syntax of the request.",
      instance: req.url,
    });
  }
  if (err instanceof Error) {
    return res.status(err.statusCode).json({
      status: err.statusCode,
      message: err.message,
      instance: req.url,
    });
  }

  console.error(err);

  return res.status(500).json({
    status: res.statusCode,
    message: "Internal server error.",
    instance: req.url,
  });
};
