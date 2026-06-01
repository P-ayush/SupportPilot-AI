import loadDocument from "./documentLoader";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { Document, DocumentChunk } from "../models";
import { IDocument } from "../types/document.types";
import { embedDocuments } from "./embeddings"
export const processDocument = async (
    documentId: number,
) => {
    const document = await Document.findByPk(documentId)
    if (!document) {
        throw new Error("Document not found");
    }
    try {
        const documentData = document?.get() as IDocument
        const docs =
            await loadDocument(documentData.file_path);

        const splitter =
            new RecursiveCharacterTextSplitter({
                chunkSize: 1000,
                chunkOverlap: 200,
            });

        const chunks =
            await splitter.splitDocuments(
                docs
            );
        const vectors = await embedDocuments(chunks.map(chunk => chunk.pageContent));
        let data = []
        for (let i = 0; i < chunks.length; i++) {
            data.push({
                document_id: documentId,
                chunk_text: chunks[i].pageContent,
                chunk_index: i,
                embedding: vectors[i]
            })
        }
        await DocumentChunk.bulkCreate(data);
        await document.update({
            status: "completed",
            total_chunks: chunks.length
        });
        return chunks
    }
    catch (error) {
        await document.update({
            status: "failed"
        });

        throw error;
    }
};