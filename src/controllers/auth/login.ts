import {Request, Response} from "express";

import {generateToken} from '../../utils/generateToken';
import { User } from '../../models/User';


export const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user || !(await user.matchPassword(password))) {
            return res.status(400).json({ error: { message: 'Invalid credentials', code: 400 } });
        }
        const token = generateToken(user.id);

        res.json({
            result: {
                id: user.id,
                email: user.email,
                storeName: user.storeName,
                storeImage: user.storeImage,
                token,
            },
        });
    } catch (err) {
        res.status(500).json({ error: { message: 'Error Occurred!', code: 500 } });
    }
};