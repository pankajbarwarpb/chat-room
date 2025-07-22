import { Request, Response, NextFunction } from "express";

import { ZodObject } from "zod";

export const validateRequest =
  (schema: ZodObject) => (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({ body: req.body });
      next();
    } catch (error) {
      return res.status(400).json({ message: "Validation Error", error });
    }
  };
