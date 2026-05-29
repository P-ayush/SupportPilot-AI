import sequelize from "../config/database";
import { DataTypes } from "sequelize";

const Document = sequelize.define(
    "Document",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },

        organization_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        file_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        file_path: {
            type: DataTypes.TEXT,
            allowNull: false,
        },

        status: {
            type: DataTypes.ENUM(
                "processing",
                "completed",
                "failed"
            ),
            defaultValue: "processing",
        },

        total_chunks: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
    },
    {
        tableName: "documents",
        timestamps: true,
        underscored: true,
    }
);

export default Document;