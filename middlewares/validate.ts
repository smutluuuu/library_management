import { validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

export const validate = (req: Request, res: Response, next: NextFunction): void => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errorDetails = errors.array().map((err) => ({
      param: (err as any).param || (err as any).path || "unknown",
      message: err.msg || "Validation error",
    }));

    res.status(400).json({
      error: {
        message: "Validation Error",
        details: errorDetails,
      },
    });
    return;
  }

  next();
};
