import { Request, Response } from "express";
import { Organization } from "../models";
import { AuthRequest } from "../types/authRequest";

export const createOrganization = async (req: AuthRequest, res: Response) => {
    try {
        const { name } = req.body;
        const ownerId = req.user!.id;
        const organization = await Organization.create({ name, owner_id: ownerId });
        return res.status(201).json({ success: true, message: "Organization created successfully", organization });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

export const listOrganizations = async (req: AuthRequest, res: Response) => {
    try {

        const limit = Math.min(Number(req.query.limit) || 10,
            100
        );

        const page = Math.max(Number(req.query.page) || 1, 1);
        const offset = (page - 1) * limit;

        const organizations = await Organization.findAll({ where: { owner_id: req.user!.id }, limit, offset });
        return res.status(200).json({ success: true, message: "Organizations fetched successfully", organizations });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}