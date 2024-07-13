import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

import {validateEmail, validatePassword} from "../utils/validators";

const userSchema = z.object({
    storeName: z.string().min(1, 'Store name is required'),
    email: z.string().refine(validateEmail,'Enter a valid email'),
    password: z.string().refine(validatePassword, 'Password must be at least 8 characters long'),
    storeImage: z.string().min(1, 'Store image is required'),
});

export const registerValidationMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const result = userSchema.safeParse(req.body);

    if (!result.success) {
        const errors = result.error.errors.map(err => ({
            message: err.message,
            path: err.path.join('.'),
        }));
        return res.status(400).json({ error: { message: errors[0].message, code: 400 } });
    }

    req.body = result.data;
    next();
};