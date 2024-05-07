import messageModel from '../models/messageModel';
import { Request, Response } from 'express';

// create Message

const createMessage = async (req: Request, res: Response) => {
    const { chatId, senderId, text } = req.body;

    const message = new messageModel({
        chatId,
        senderId,
        text
    });
    
    try {
        const response = await message.save();
        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};

// get all messages
const getMessages = async (req: Request, res: Response) => {
    const {chatId} = req.params;
    try {
        const messages = await messageModel.find({chatId});
        res.status(200).json(messages);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};


export {createMessage, getMessages};