import { Request, Response } from 'express'
import { Conversation, Message, Document, Organization } from '../models'
import { askQuestion } from '../rag/chat'
import { IConversation } from '../types/conversation.types'
import { AuthRequest } from "../types/authRequest";

export const createChat = async (req: AuthRequest, res: Response) => {
    try {
        const { organizationId } = req.params;
        let organization = await Organization.findOne({ where: { id: organizationId, owner_id: req.user!.id } });
        if (!organization) {
            return res.status(404).json({ success: false, message: "Organization not found" });
        }
        let conversation = await Conversation.findOne({ where: { user_id: req.user!.id, organization_id: Number(organizationId) } });
        if (!conversation) {
            conversation = await Conversation.create({ user_id: req.user!.id, organization_id: Number(organizationId) });
        }
        let conversationData = conversation.get() as IConversation;
        await Message.create({ role: "user", content: req.body.question, conversation_id: conversationData.id });
        const answer = await askQuestion(req.body.question, Number(organizationId));
        await Message.create({ role: "assistant", content: answer, conversation_id: conversationData.id });
        return res.status(200).json({ success: true, answer: answer });
    } catch (error) {
    console.error(error);

    return res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error: error instanceof Error
            ? error.message
            : error
    });
}
}

export const chatHistory = async (req: AuthRequest, res: Response) => {
    try {
        const { organizationId } = req.params;
        let organization = await Organization.findOne({ where: { id: organizationId, owner_id: req.user!.id } });
        if (!organization) {
            return res.status(404).json({ success: false, message: "Organization not found" });
        }
        let conversation = await Conversation.findOne({ where: { user_id: req.user!.id, organization_id: Number(organizationId) } });
        if (!conversation) {
            return res.status(404).json({ success: false, message: "Conversation not found" });
        }
        let conversationData = conversation.get() as IConversation;
        const messages = await Message.findAll({
            where: {
                conversation_id: conversationData.id
            },
            order: [["createdAt", "ASC"]]
        });
        return res.status(200).json({ success: true, messages: messages });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}