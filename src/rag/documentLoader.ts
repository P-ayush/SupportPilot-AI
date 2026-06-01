import path from "path";

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


        default:
            throw new Error(
                `Unsupported file type: ${extension}`
            );
    }
};

export default loadDocument;