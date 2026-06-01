import sequelize from "../config/database";
import { DataTypes } from "sequelize";

const DocumentChunk = sequelize.define(
    "DocumentChunk",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },

        document_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        chunk_text: {
            type: DataTypes.TEXT,
            allowNull: false,
        },

        chunk_index: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        embedding: {
            type: DataTypes.JSON,
            allowNull: true,
        }
    },
    {
        tableName: "document_chunks",
        timestamps: true,
        underscored: true,
    }
);

export default DocumentChunk;