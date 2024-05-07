import chatModel from '../models/chatModel';
import { Request, Response } from 'express';

const createChat = async (req: Request, res: Response) => {
    const {firstId, secondId} = req.body;

    try {
        // check if chat room already exists
        const chat = await chatModel.findOne({
            members: { $all: [firstId, secondId]},
        });

        if (chat) return res.status(200).json(chat);

        const newChat = new chatModel({
            members: [firstId, secondId]
        })

        const response = await newChat.save();

        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};

// const findUserChats = async (req: Request, res: Response) => {
//     const userId = req.params.userId;

//     try {
//         const chats = await chatModel.find({
//             members: { $in: [userId] }
//         });

//         res.status(200).json(chats);
//     } catch (error) {
//         console.log(error);
//         res.status(500).json(error);
//     }
// };

const findChat = async (req: Request, res: Response) => {
    const { chatId } = req.params;

    try {
        const chat = await chatModel.find({
            // members: { $all: [firstId, secondId]},
            _id: chatId
        });

        res.status(200).json(chat);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};

export {createChat, findChat};