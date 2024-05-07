import express from 'express';
import { createChat, findChat } from '../controllers/chatControllers';

const router = express.Router();

router.post('/', createChat);
router.get('/find/:chatId', findChat);

export default router;