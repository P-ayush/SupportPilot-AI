import sequelize from "../config/database";
import { DataTypes } from "sequelize";

const OrganizationMember = sequelize.define(
    "OrganizationMember",
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

        role: {
            type: DataTypes.ENUM("admin", "member"),
            defaultValue: "member",
        },
    },
    {
        tableName: "organization_members",
        timestamps: true,
        underscored: true,
    }
);

export default OrganizationMember;