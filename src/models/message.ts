import sequelize from "../config/database";
import { DataTypes } from "sequelize";

const Message = sequelize.define(
    "Message",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },

        conversation_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        role: {
            type: DataTypes.ENUM(
                "user",
                "assistant"
            ),
            allowNull: false,
        },

        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    },
    {
        tableName: "messages",
        timestamps: true,
        underscored: true,
    }
);

export default Message;