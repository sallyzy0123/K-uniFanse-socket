import express from 'express';

import chatRouter from './routes/chatRoute';
import messageRouter from './routes/messageRoute';
import MessageResponse from '../interfaces/MessageResponse';

const router = express.Router();

router.get<{}, MessageResponse>('/', (req, res) => {
    res.json({
      message: 'routes: chats, messages',
    });
});

router.use('/chats', chatRouter);
router.use('/messages', messageRouter);

export default router;