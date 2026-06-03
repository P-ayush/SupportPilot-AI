import llm from "./llm";
import { retrieveChunks } from "./retrieval";

export const askQuestion = async (question: string, organizationId: number) => {

    const chunks =
        await retrieveChunks(
            question,
            organizationId
        );

    const context =
        chunks
            .map(chunk => chunk.chunk_text)
            .join("\n\n");

    const prompt = `
                You are a helpful support assistant.

                Answer ONLY using the context below.

                If the answer is not present in the context,
                say "I could not find that information in the uploaded documents."

                Context:
                ${context}

                Question:
                ${question}
                `;

    return await llm(prompt);
};