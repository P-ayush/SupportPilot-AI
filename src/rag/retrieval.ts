import { DocumentChunk, Document } from "../models";
import { embedQuery } from "./embeddings";
import { cosineSimilarity } from "./similarity";
import { IDocument } from "../types/document.types";
import { Op } from "sequelize";

export const retrieveChunks = async (question: string, organizationId: number) => {
    const queryEmbedding = await embedQuery(question);
    const document = await Document.findAll({ where: { organization_id: organizationId } })
    const documentIds = document.map(
        doc => (doc.get() as IDocument).id
    );
    if (!documentIds.length) {
        return [];
    }
    const chunks = await DocumentChunk.findAll({
        where: {
            document_id: {
                [Op.in]: documentIds
            }
        }
    });
    const scoredChunks = chunks.map(chunk => {
        const data = chunk.get() as any;
        return {
            ...data,
            score: cosineSimilarity(
                queryEmbedding,
                data.embedding
            )
        };
    });

    return scoredChunks
        .sort((a, b) => b.score - a.score)
        .slice(0, 5);
};
