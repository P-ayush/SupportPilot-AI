import sequelize from "../config/database";
import { DataTypes } from "sequelize";

const Organization = sequelize.define(
  "Organization",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    owner_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "organizations",
    timestamps: true,
    underscored: true,
  }
);

export default Organization;