import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';

export const validate =
  (validator: () => Joi.ObjectSchema | null) =>
  (req: Request, res: Response, next: NextFunction) => {
    if (!validator) {
      return next();
    }

    const validation = validator()?.validate(req.body);

    if (!validation) {
      return next();
    }

    if (validation.error) {
      const errors = validation.error.details.map((detail) => ({
        key: detail?.context?.key,
        label: detail?.context?.label,
        message: detail?.message,
      }));

      return res.status(422).json({ error: true, data: errors });
    }

    next();
  };
