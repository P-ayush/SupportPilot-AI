import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import dotenv from 'dotenv';

dotenv.config();
const embeddings = new GoogleGenerativeAIEmbeddings({
    model: "gemini-embedding-001"
});

export const embedQuery = async (
    text: string
): Promise<number[]> => {
    return await embeddings.embedQuery(text);
};


export const embedDocuments = async (
    text: string[]
): Promise<number[][]> => {
    return await embeddings.embedDocuments(text);
};

export default embeddings;