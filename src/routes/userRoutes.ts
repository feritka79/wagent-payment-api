import express from "express";
import { registerUser, loginUser } from '../controllers/authController';
import { validateUser } from '../middlewares/validationMiddleware';

const router = express.Router();

router.post('/auth',validateUser,registerUser);

export default router;