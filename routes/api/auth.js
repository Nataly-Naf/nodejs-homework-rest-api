import express from "express";
import validateBody from '../../decorators/validateBody.js';
import { loginSchema, registerSchema, updateSubscription } from "../../models/users.js";
import authController from "../../controllers/auth-controllers.js";

import isEmptyBody from "../../middlewares/isEmptyBody.js";
import authenticate from "../../middlewares/authenticate.js";

const router = express.Router();
router.post('/signup', isEmptyBody, validateBody(registerSchema), authController.signup)
router.post('/signin', isEmptyBody, validateBody(loginSchema), authController.signin)
router.get('/current', authenticate, authController.getCurrent)
router.post('/logout', authenticate, authController.logout)
router.patch('/', isEmptyBody, authenticate,validateBody(updateSubscription), authController.updateSubscription)

export default router;

 