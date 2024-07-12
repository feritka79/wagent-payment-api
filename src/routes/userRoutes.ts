import express from "express";
import { registerUser, loginUser } from '../controllers/authController';
import { validateUser } from '../middlewares/validationMiddleware';

const router = express.Router();

router.post('/users/auth',validateUser,registerUser);
router.post('/users/auth/login',validateUser,loginUser);

export default router;