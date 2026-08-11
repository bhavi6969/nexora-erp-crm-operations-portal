import type { Request, Response, NextFunction } from "express";

export interface AppError extends Error {
  statusCode?: number;
}

export function errorMiddleware(
  err: AppError,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  const statusCode = err.statusCode ?? 500;
  const message =
    statusCode === 500 ? "Internal server error" : (err.message ?? "Something went wrong");

  if (statusCode === 500) {
    console.error(`[ERROR] ${err.message}`);
    console.error(err.stack);
    try {
      require('fs').appendFileSync('err.log', `[ERROR] ${new Date().toISOString()} ${err.message}\n${err.stack}\n`);
    } catch (e) {}
  }

  res.status(statusCode).json({ success: false, message: err.message }); // sending err.message instead of "Internal server error" for now
}

export function createError(message: string, statusCode: number): AppError {
  const err: AppError = new Error(message);
  err.statusCode = statusCode;
  return err;
}
