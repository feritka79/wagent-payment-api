import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authorization = (req.header('Authorization') as string);
    const token = authorization.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ error: { message: 'No token, authorization denied', code: 401 } });
    }

    try {
        const secret = process.env.JWT_SECRET as string;
        const decodedToken = jwt.verify(token, secret);
        const decoded = decodedToken as any;
        req.user = decoded.id;
        next();
    } catch (err) {
        res.status(401).json({ error: { message: 'Token is not valid', code: 401 } });
    }
};
export default authMiddleware;
