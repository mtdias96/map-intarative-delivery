import type { Request, Response } from "express";
import type { IController } from "../interfaces/IController";

export function routeAdapter(controller: IController){
  return async (req: Request, res: Response): Promise<void> => {
    try {
      const { statusCode, body } = await controller.handle({
        body: req.body,
        params: req.params,
        user: req.user
      });

      res.status(statusCode).json(body);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
}
