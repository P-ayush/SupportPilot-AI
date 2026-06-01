import dotenv from "dotenv";
import { ChatGoogleGenerativeAI }
    from "@langchain/google-genai";

dotenv.config();

const model = new ChatGoogleGenerativeAI({
    model: "gemini-2.5-flash",
    temperature: 0,
});

export const llm = async (prompt: string) => {
    const response = await model.invoke(prompt);
    return response.content;
};

export default llm;