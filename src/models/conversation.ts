import sequelize from "../config/database";
import { DataTypes } from "sequelize";

const Conversation = sequelize.define(
    "Conversation",
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

        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        title: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        tableName: "conversations",
        timestamps: true,
        underscored: true,
    }
);

export default Conversation;