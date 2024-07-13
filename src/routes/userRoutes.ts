import express from "express";

import {registerUser} from '../controllers/auth/register';
import {loginUser} from '../controllers/auth/login';
import {registerValidation} from '../middlewares/registerValidationMiddleware';
import {loginValidation} from '../middlewares/loginValidationMiddleware';

const router = express.Router();

router.post('/auth', registerValidation, registerUser);
router.post('/auth/login', loginValidation, loginUser);

export default router;