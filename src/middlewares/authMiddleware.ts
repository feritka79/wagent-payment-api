import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = (req.header('Authorization') as string)?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ error: { message: 'No token, authorization denied', code: 401 } });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as any;
        req.user = decoded.id;  // Assign decoded id to req.user
        next();
    } catch (err) {
        res.status(401).json({ error: { message: 'Token is not valid', code: 401 } });
    }
};
export default authMiddleware;
