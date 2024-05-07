import mongoose from 'mongoose';
import {Message} from '../../types/DBTypes';

const messageSchema = new mongoose.Schema({
    chatId: String,
    senderId: String,
    text: String,
},
{
    timestamps: true
},
);

export default mongoose.model<Message>('Message', messageSchema);