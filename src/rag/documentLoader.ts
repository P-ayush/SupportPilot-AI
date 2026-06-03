import path from "path";
import fs from "fs";
import { PDFParse } from "pdf-parse";
import { Document } from "@langchain/core/documents"
import {
    JSONLoader,
    JSONLinesLoader,
} from "@langchain/classic/document_loaders/fs/json";

import { TextLoader }
    from "@langchain/classic/document_loaders/fs/text";

const loadDocument = async (
    filePath: string
) => {

    const extension =
        path.extname(filePath)
            .toLowerCase();

    switch (extension) {

        case ".txt":
            return await new TextLoader(
                filePath
            ).load();

        case ".json":
            return await new JSONLoader(
                filePath
            ).load();

        case ".pdf": {


            const buffer = fs.readFileSync(filePath);

            const parser = new PDFParse({
                data: buffer
            });

            const result = await parser.getText();

            return [
                new Document({
                    pageContent: result.text,
                    metadata: {
                        source: filePath
                    }
                })
            ];
        }
        default:
            throw new Error(
                `Unsupported file type: ${extension}`
            );
    }
};

export default loadDocument;