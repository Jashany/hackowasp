import express from 'express';
import { authUser,registerUser,logoutUser } from '../controllers/auth.js';
import verify from '../middleware/verify.js';

const router = express.Router();

router.post('/login', authUser);
router.post('/', registerUser);
router.post('/logout', verify,logoutUser);

export default router;