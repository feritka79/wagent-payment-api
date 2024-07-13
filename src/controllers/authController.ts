import { Request, Response } from 'express';
import { User } from '../models/User';
import { sendRegistrationEmail } from '../utils/emailService';
import { validateUser } from '../middlewares/validationMiddleware';
import {generateToken} from '../utils/generateToken'


export const registerUser = [
    validateUser,
    async (req: Request, res: Response) => {
        const { storeName, email, password } = req.body;

        try {
            let user = await User.findOne({ email });

            if (user) {
                return res.status(400).json({ message: 'User Already Exist!' });
            }

            user = new User({ storeName, email, password });
            await user.save();

            sendRegistrationEmail(email);

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
    },
];

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
                token,
            },
        });
    } catch (err) {
        res.status(500).json({ error: { message: 'Error Occurred!', code: 500 } });
    }
};