import type { NextFunction, Request, Response } from "express";
import type { IMiddleware } from "../interfaces/IMiddleware";

export function middlewareAdapter(middleware: IMiddleware) {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await middleware.handle({
        headers: req.headers as Record<string, string>,
      });

      if ('statusCode' in result) {
        res.status(result.statusCode).json(result.body);
        return;
      }

      req.user = result.data;
      next();
    } catch {
      res.status(500).json({ message: 'Internal server error' });
    }
  };
}

