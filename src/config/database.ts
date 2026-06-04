import dotenv from "dotenv";
import { Sequelize } from "sequelize";

dotenv.config();

// const sequelize = new Sequelize({
//     database: process.env.DB_NAME,
//     username: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     host: process.env.DB_HOST,
//     port: 5432,
//     dialect: "postgres",
//     logging: false,
// });
const sequelize = new Sequelize(process.env.DB_URL as string, {
    dialect: "postgres",
    protocol: "postgres",
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false,
        },
    },
});


export default sequelize;