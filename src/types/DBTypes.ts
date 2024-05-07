import mongoose, {Document} from 'mongoose';

type User = Partial<Document> & {
    id: mongoose.Types.ObjectId;
    user_name: string;
    email: string;
    password: string;
    role: 'user' | 'admin';
};

type Chat = {
    members: User[];
    timestamp: Date;
}

type Message = {
    chatId: string;
    senderId: string;
    text: string;
    timestamp: Date;
}

export {User, Chat, Message};