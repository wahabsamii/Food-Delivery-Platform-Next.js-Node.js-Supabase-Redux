import express from 'express';
import { authenticate } from '../middleware/auth.js';
import { GetAllUsers, Login, Register, UpateProfile } from '../controllers/authControllers.js';

const router = express.Router();


// REGISTER USER
router.post('/register', Register);

// LOGIN USER
router.post('/login', Login);

router.get('/', GetAllUsers);

// UPDATE USER PROFILE (NO PASSWORD)
router.put('/profile', authenticate, UpateProfile);


export default router;
