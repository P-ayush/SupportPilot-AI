import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import routes from './routes';
import sequelize from './config/database';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", routes);

app.listen(3000, async () => {
    await sequelize.authenticate()
    console.log('Database connected');
    await sequelize.sync({ force: false });
    console.log('Database synced');
    console.log('Server running on port 3000');
});