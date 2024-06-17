import express, {Request, Response, NextFunction} from "express";
import {validationResult, body} from "express-validator";

export const validateUser = [
    body('email').isEmail().withMessage('Enter a valid email'),
    body('password').isLength({min: 8}).withMessage('Password must be at least 8 characters long'),
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({error: {message: errors.array()[0].msg, code: 400}});
        }
        next();
    },
];
