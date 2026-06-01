import { DocumentChunk } from "../models";
import { embedQuery } from "./embeddings";
import { cosineSimilarity } from "./similarity";

export const retrieveChunks = async (question: string, documentId: number) => {
    const queryEmbedding = await embedQuery(question);

    const chunks = await DocumentChunk.findAll({ where: { document_id: documentId } });
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
