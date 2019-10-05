import express from 'express';
import userRoute from './api/user';

const router = express.Router();

router.use('/users', userRoute);

export default router;
