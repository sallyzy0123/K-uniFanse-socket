import mongoose from 'mongoose';
import {Chat} from '../../types/DBTypes';

const chatSchema = new mongoose.Schema(
    {
        members: Array,
    },
    {
        timestamps: true,
    }
);

export default mongoose.model<Chat>('Chat', chatSchema);