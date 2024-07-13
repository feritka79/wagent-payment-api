import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

import { validateEmail, validatePassword } from '../utils/validators';

const loginSchema = z.object({
    email: z.string().refine(validateEmail, 'Enter a valid email'),
    password: z.string().refine(validatePassword, 'Password must be at least 8 characters long'),
});

const loginValidationMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const result = loginSchema.safeParse(req.body);

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

export default loginValidationMiddleware;
