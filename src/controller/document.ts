import { Request, Response } from "express";
import { Document, Organization } from "../models";
import fs from "fs/promises";
import { IDocument } from "../types/document.types";

export const uploadDocument = async (req: Request, res: Response) => {
    try {
        const { organizationId } = req.params;
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "No file uploaded"
            });
        }
        const organisation = await Organization.findOne({ where: { id: Number(organizationId), owner_id: req.user!.id } });
        if (!organisation) {
            return res.status(404).json({
                success: false,
                message: "Organization not found"
            });
        }
        const document = await Document.create({
            organization_id: Number(organizationId),
            file_name: req.file.originalname,
            file_path: req.file.path,
            status: "UPLOADED",
        });
        return res.status(201).json({
            success: true,
            message: "Document uploaded successfully",
            document
        });

    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}


export const listDocuments = async (req: Request, res: Response) => {
    try {
        const limit = Math.min(Number(req.query.limit) || 10,
            100
        );

        const page = Math.max(Number(req.query.page) || 1, 1);
        const offset = (page - 1) * limit;
        const organisation = await Organization.findOne({
            where: {
                id: Number(req.params.organizationId),
                owner_id: req.user!.id
            }
        });

        if (!organisation) {
            return res.status(403).json({
                success: false,
                message: "Access denied"
            });
        }
        const documents = await Document.findAll({ where: { organization_id: req.params.organizationId }, limit, offset });
        return res.status(200).json({ success: true, message: "Documents fetched successfully", documents });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

export const deleteDocument = async (req: Request, res: Response) => {
    try {
        const { organizationId, documentId } = req.params
        const organisation = await Organization.findOne({ where: { id: organizationId, owner_id: req.user!.id } })
        if (!organisation) {
            return res.status(403).json({
                success: false,
                message: "Access denied"
            });
        }
        const document = await Document.findOne({ where: { id: documentId, organization_id: organizationId } })
        if (!document) {
            return res.status(404).json({
                success: false,
                message: "Document not found"
            });
        }
        const documentData = document?.get() as IDocument
        await fs.unlink(documentData.file_path)
        await document.destroy()
        return res.status(200).json({ success: true, message: "Document deleted successfully" });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}